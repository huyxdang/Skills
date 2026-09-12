import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, realpathSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, dirname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { classify, parseStatus, parseWorktrees } from "../scripts/worktree-audit.mjs";

const script = resolve(dirname(fileURLToPath(import.meta.url)), "../scripts/worktree-audit.mjs");

function cleanProbe(overrides = {}) {
  return {
    main: false,
    locked: false,
    statusKnown: true,
    changes: { tracked: 0, untracked: 0, ignored: 0 },
    activity: "inactive",
    pr: { kind: "clear", prs: [] },
    contained: true,
    ...overrides,
  };
}

test("parses worktree paths containing spaces", () => {
  const records = parseWorktrees("worktree /tmp/repo with spaces\0HEAD abc123\0branch refs/heads/topic\0");
  assert.deepEqual(records, [{ path: "/tmp/repo with spaces", head: "abc123", branch: "topic", locked: false }]);
});

test("closed unmerged pull requests are held", () => {
  assert.deepEqual(classify(cleanProbe({ pr: { kind: "closed-unmerged", prs: [] } })), {
    bucket: "hold",
    reasons: ["closed-unmerged-pr"],
  });
});

test("untracked and ignored files are held", () => {
  assert.equal(classify(cleanProbe({ changes: { tracked: 0, untracked: 1, ignored: 0 } })).bucket, "hold");
  assert.equal(classify(cleanProbe({ changes: { tracked: 0, untracked: 0, ignored: 1 } })).bucket, "hold");
  assert.deepEqual(parseStatus("?? loose file\0!! generated file\0"), {
    tracked: 0,
    untracked: 1,
    ignored: 1,
  });
});

test("only clean inactive contained worktrees become candidates", () => {
  assert.deepEqual(classify(cleanProbe()), {
    bucket: "candidate",
    reasons: ["clean-inactive-contained"],
  });
});

test("unknown activity, PR state, and base state require review", () => {
  assert.equal(classify(cleanProbe({ activity: "unknown" })).bucket, "review");
  assert.equal(classify(cleanProbe({ pr: { kind: "unknown", prs: [] } })).bucket, "review");
  assert.equal(classify(cleanProbe({ contained: null })).bucket, "review");
});

test("audits a real worktree with spaces and fails closed", () => {
  const temp = mkdtempSync(join(tmpdir(), "poteto-worktree-"));
  const repo = join(temp, "main repo");
  const linked = join(temp, "linked worktree with spaces");
  const bin = join(temp, "bin");
  const gh = join(bin, "gh");
  const run = (command, args, cwd = repo, env = process.env) => {
    const result = spawnSync(command, args, { cwd, env, encoding: "utf8" });
    assert.equal(result.status, 0, `${command} ${args.join(" ")}\n${result.stdout}${result.stderr}`);
    return result.stdout;
  };
  try {
    run("mkdir", ["-p", repo, bin], temp);
    run("git", ["init", "-b", "main"]);
    run("git", ["config", "user.email", "poteto@example.invalid"]);
    run("git", ["config", "user.name", "Poteto Test"]);
    writeFileSync(join(repo, "tracked.txt"), "one\n");
    run("git", ["add", "tracked.txt"]);
    run("git", ["commit", "-m", "base"]);
    run("git", ["branch", "safe"]);
    run("git", ["worktree", "add", linked, "safe"]);
    writeFileSync(gh, "#!/bin/sh\nprintf '[]\\n'\n");
    chmodSync(gh, 0o755);
    const env = { ...process.env, PATH: `${bin}${delimiter}${process.env.PATH}` };
    const args = [script, "--repo", repo, "--base", "main", "--inactive-path", linked];
    const linkedPath = realpathSync(linked);

    let results = JSON.parse(run(process.execPath, args, temp, env));
    assert.equal(results.find((result) => result.path === linkedPath).bucket, "candidate");

    writeFileSync(join(linked, "loose.txt"), "keep\n");
    results = JSON.parse(run(process.execPath, args, temp, env));
    assert.equal(results.find((result) => result.path === linkedPath).bucket, "hold");
    unlinkSync(join(linked, "loose.txt"));

    writeFileSync(gh, "#!/bin/sh\nprintf '[{\"number\":7,\"state\":\"CLOSED\",\"mergedAt\":null}]\\n'\n");
    results = JSON.parse(run(process.execPath, args, temp, env));
    assert.deepEqual(results.find((result) => result.path === linkedPath).reasons, ["closed-unmerged-pr"]);

    writeFileSync(gh, "#!/bin/sh\nprintf '[]\\n'\n");
    results = JSON.parse(run(process.execPath, [script, "--repo", linked, "--base", "main", "--inactive-path", linked], temp, env));
    assert.deepEqual(results.find((result) => result.path === linkedPath).reasons, ["active"]);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
