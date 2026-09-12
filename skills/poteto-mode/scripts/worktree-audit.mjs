#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { realpathSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

function command(name, args, cwd) {
  const result = spawnSync(name, args, { cwd, encoding: "utf8" });
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

function canonical(path) {
  const absolute = resolve(path);
  try {
    return realpathSync(absolute);
  } catch {
    return absolute;
  }
}

export function parseArgs(argv) {
  const options = {
    repo: process.cwd(),
    base: "origin/main",
    format: "json",
    active: new Set(),
    inactive: new Set(),
  };
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (["--repo", "--base", "--format", "--active-path", "--inactive-path"].includes(flag) && !value) {
      throw new Error(`${flag} requires a value`);
    }
    if (flag === "--repo") options.repo = value;
    else if (flag === "--base") options.base = value;
    else if (flag === "--format") options.format = value;
    else if (flag === "--active-path") options.active.add(canonical(value));
    else if (flag === "--inactive-path") options.inactive.add(canonical(value));
    else throw new Error(`unknown argument ${flag}`);
    index += 1;
  }
  if (!["json", "tsv"].includes(options.format)) {
    throw new Error("--format must be json or tsv");
  }
  options.repo = canonical(options.repo);
  return options;
}

export function parseWorktrees(source) {
  const records = [];
  let current = null;
  for (const token of source.split("\0")) {
    if (!token) continue;
    const separator = token.indexOf(" ");
    const key = separator === -1 ? token : token.slice(0, separator);
    const value = separator === -1 ? true : token.slice(separator + 1);
    if (key === "worktree") {
      current = { path: value, head: null, branch: null, locked: false };
      records.push(current);
    } else if (current && key === "HEAD") current.head = value;
    else if (current && key === "branch") current.branch = value.replace(/^refs\/heads\//, "");
    else if (current && key === "locked") current.locked = true;
    else if (current && key === "detached") current.branch = null;
  }
  return records;
}

export function parseStatus(source) {
  const changes = { tracked: 0, untracked: 0, ignored: 0 };
  for (const record of source.split("\0")) {
    if (!record) continue;
    if (record.startsWith("?? ")) changes.untracked += 1;
    else if (record.startsWith("!! ")) changes.ignored += 1;
    else changes.tracked += 1;
  }
  return changes;
}

function pullRequestState(repo, branch) {
  if (!branch) return { kind: "none", prs: [] };
  const result = command(
    "gh",
    ["pr", "list", "--head", branch, "--state", "all", "--limit", "100", "--json", "number,state,mergedAt"],
    repo
  );
  if (!result.ok) return { kind: "unknown", prs: [] };
  try {
    const prs = JSON.parse(result.stdout);
    if (!Array.isArray(prs)) return { kind: "unknown", prs: [] };
    if (prs.some((pr) => pr.state === "OPEN")) return { kind: "open", prs };
    if (prs.some((pr) => pr.state === "CLOSED" && !pr.mergedAt)) {
      return { kind: "closed-unmerged", prs };
    }
    return { kind: "clear", prs };
  } catch {
    return { kind: "unknown", prs: [] };
  }
}

export function classify(probe) {
  if (probe.main) return { bucket: "hold", reasons: ["main-worktree"] };
  if (probe.locked) return { bucket: "hold", reasons: ["locked"] };
  if (!probe.statusKnown) return { bucket: "review", reasons: ["status-unknown"] };
  if (probe.changes.tracked > 0) return { bucket: "hold", reasons: ["tracked-changes"] };
  if (probe.changes.untracked > 0) return { bucket: "hold", reasons: ["untracked-files"] };
  if (probe.changes.ignored > 0) return { bucket: "hold", reasons: ["ignored-files"] };
  if (probe.activity === "active") return { bucket: "hold", reasons: ["active"] };
  if (probe.activity === "unknown") return { bucket: "review", reasons: ["activity-unknown"] };
  if (probe.pr.kind === "open") return { bucket: "hold", reasons: ["open-pr"] };
  if (probe.pr.kind === "closed-unmerged") return { bucket: "hold", reasons: ["closed-unmerged-pr"] };
  if (probe.pr.kind === "unknown") return { bucket: "review", reasons: ["pr-state-unknown"] };
  if (probe.contained === null) return { bucket: "review", reasons: ["base-state-unknown"] };
  if (!probe.contained) return { bucket: "review", reasons: ["head-not-contained-by-base"] };
  return { bucket: "candidate", reasons: ["clean-inactive-contained"] };
}

function inspect(options) {
  const repoResult = command("git", ["rev-parse", "--show-toplevel"], options.repo);
  if (!repoResult.ok) throw new Error(`not a Git repository: ${options.repo}`);
  const repo = canonical(repoResult.stdout.trim());
  const invokedPath = repo;
  const listing = command("git", ["worktree", "list", "--porcelain", "-z"], repo);
  if (!listing.ok) throw new Error(listing.stderr.trim() || "could not list worktrees");
  const worktrees = parseWorktrees(listing.stdout);
  const mainPath = canonical(worktrees[0]?.path ?? repo);
  const base = command("git", ["rev-parse", "--verify", `${options.base}^{commit}`], repo);

  return worktrees.map((worktree) => {
    const path = canonical(worktree.path);
    const status = command("git", ["status", "--porcelain=v1", "-z", "--untracked-files=all", "--ignored=matching"], path);
    const changes = status.ok ? parseStatus(status.stdout) : { tracked: 0, untracked: 0, ignored: 0 };
    const activity = path === mainPath || path === invokedPath || options.active.has(path)
      ? "active"
      : options.inactive.has(path)
        ? "inactive"
        : "unknown";
    const pr = pullRequestState(repo, worktree.branch);
    let contained = null;
    if (base.ok && worktree.head) {
      const ancestor = command("git", ["merge-base", "--is-ancestor", worktree.head, base.stdout.trim()], repo);
      contained = ancestor.status === 0 ? true : ancestor.status === 1 ? false : null;
    }
    const probe = {
      path,
      branch: worktree.branch,
      head: worktree.head,
      main: path === mainPath,
      locked: worktree.locked,
      activity,
      statusKnown: status.ok,
      changes,
      pr,
      contained,
    };
    return { ...probe, ...classify(probe) };
  });
}

function renderTsv(results) {
  const cell = (value) => String(value ?? "").replace(/[\t\r\n]/g, " ");
  const rows = [["BUCKET", "REASONS", "ACTIVITY", "TRACKED", "UNTRACKED", "IGNORED", "PR", "CONTAINED", "BRANCH", "WORKTREE"]];
  for (const result of results) {
    rows.push([
      result.bucket,
      result.reasons.join(","),
      result.activity,
      result.changes.tracked,
      result.changes.untracked,
      result.changes.ignored,
      result.pr.kind,
      result.contained,
      result.branch,
      result.path,
    ]);
  }
  return `${rows.map((row) => row.map(cell).join("\t")).join("\n")}\n`;
}

export function main(argv = process.argv.slice(2)) {
  try {
    const options = parseArgs(argv);
    const results = inspect(options);
    process.stdout.write(options.format === "json" ? `${JSON.stringify(results, null, 2)}\n` : renderTsv(results));
    return 0;
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    return 64;
  }
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  process.exitCode = main();
}
