#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, realpathSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { bundleIntegrity } from "./bundle-integrity.mjs";

const REQUIRED_PLAYBOOKS = [
  "authoring-a-skill.md",
  "autonomous-run.md",
  "babysit.md",
  "bug-fix.md",
  "eval.md",
  "feature.md",
  "hillclimb.md",
  "investigation.md",
  "opening-a-pr.md",
  "pause-safely.md",
  "perf-issue.md",
  "plan.md",
  "prototype.md",
  "refactoring.md",
  "runtime-forensics.md",
  "session-pickup.md",
  "shipping.md",
  "trace-forensics.md",
  "visual-parity.md",
  "worktree-cleanup.md",
];

const REMOVED_PATHS = [
  "playbooks/autopilot-full.md",
  "playbooks/autopilot-stack.md",
  "playbooks/orchestrate.md",
  "playbooks/multi-phase-plan.md",
  "scripts/bootstrap.ts",
  "scripts/orch",
];

const FORBIDDEN = [
  ["former host contract", /\bCursor(?: agent| Task| restart|'s)\b/g],
  ["former host data path", /\.cursor\b/g],
  ["former host package", /@cursor-skill\b/g],
  ["unsupported question API", /\bAskQuestion\b/g],
  ["unsupported worker option", /\b(?:subagent_type|run_in_background)\b/g],
  ["unsupported command", /\/(?:loop|goal|drive)\b/g],
  ["hard-coded model", /\b(?:grok-[\w.-]+|claude-(?:fable|opus)-[\w.-]+|gpt-5\.6-sol-max)\b/g],
  ["missing external kit", /\bcursor-team-kit\b/g],
  ["runtime dependency bootstrap", /\bensureDependenciesInstalled\b/g],
  ["destructive reset", /git\s+reset\s+--hard/g],
];

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".git"].includes(entry.name)) return [];
      return walk(path);
    }
    return path;
  });
}

function lineAt(text, offset) {
  return text.slice(0, offset).split("\n").length;
}

export function validate(root) {
  const skillRoot = resolve(root);
  const failures = [];
  const fail = (path, line, message) => {
    failures.push(`${relative(skillRoot, path) || "."}:${line}: ${message}`);
  };

  const skillPath = join(skillRoot, "SKILL.md");
  if (!existsSync(skillPath)) return ["SKILL.md:1: missing"];
  const skill = readFileSync(skillPath, "utf8");
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/)?.[1];
  if (!frontmatter) {
    fail(skillPath, 1, "missing YAML frontmatter");
  } else {
    const entries = frontmatter
      .split("\n")
      .filter(Boolean)
      .map((line) => line.match(/^([a-z][a-z0-9-]*):\s*(.*)$/))
      .filter(Boolean);
    const keys = entries.map((entry) => entry[1]);
    if (keys.join(",") !== "name,description") {
      fail(skillPath, 1, "frontmatter must contain only name and description");
    }
    if (!frontmatter.includes("name: poteto-mode")) {
      fail(skillPath, 2, "name must be poteto-mode");
    }
  }

  const metadataPath = join(skillRoot, "agents", "openai.yaml");
  if (!existsSync(metadataPath)) {
    fail(metadataPath, 1, "missing Codex metadata");
  } else {
    const metadata = readFileSync(metadataPath, "utf8");
    for (const expected of [
      'display_name: "Poteto Mode"',
      'default_prompt: "Use $poteto-mode',
      "allow_implicit_invocation: false",
    ]) {
      if (!metadata.includes(expected)) fail(metadataPath, 1, `missing ${expected}`);
    }
  }

  for (const path of REQUIRED_PLAYBOOKS.map((name) => join(skillRoot, "playbooks", name))) {
    if (!existsSync(path)) fail(path, 1, "required playbook is missing");
  }
  for (const path of REMOVED_PATHS.map((name) => join(skillRoot, name))) {
    if (existsSync(path)) fail(path, 1, "obsolete path must be removed");
  }

  const active = walk(skillRoot).filter((path) => /\.(?:md|mjs|ts|sh|yaml|json|lock)$/.test(path));
  const validatorPath = realpathSync(fileURLToPath(import.meta.url));
  const hostReferenceAllowlist = new Set([
    "scripts/watch-pr/github.ts",
    "scripts/watch-pr/github.test.ts",
    "tests/validate.test.mjs",
  ]);
  for (const path of active.filter((value) => realpathSync(value) !== validatorPath)) {
    const source = readFileSync(path, "utf8");
    for (const [label, pattern] of FORBIDDEN) {
      for (const match of source.matchAll(pattern)) {
        fail(path, lineAt(source, match.index), label);
      }
    }
    if (!hostReferenceAllowlist.has(relative(skillRoot, path))) {
      for (const match of source.matchAll(/\bCursor\b/g)) {
        fail(path, lineAt(source, match.index), "former host reference");
      }
    }
  }

  for (const path of active.filter((value) => value.endsWith(".md"))) {
    const source = readFileSync(path, "utf8");
    for (const match of source.matchAll(/`((?:\.\.\/|\.\/)?(?:playbooks|references|scripts)\/[^`\s]+)`/g)) {
      const reference = match[1].replace(/[),.;]+$/, "");
      const candidates = [resolve(dirname(path), reference), resolve(skillRoot, reference)];
      if (!candidates.some(existsSync)) {
        fail(path, lineAt(source, match.index), `missing local reference ${reference}`);
      }
    }
  }

  const bundlePath = join(skillRoot, "scripts", "dist", "watch-pr.mjs");
  if (!existsSync(bundlePath)) {
    fail(bundlePath, 1, "missing committed Node bundle");
  } else {
    const integrity = bundleIntegrity(join(skillRoot, "scripts"));
    if (!integrity.sourceOk) fail(bundlePath, 1, "committed Node bundle source stamp is stale");
    if (!integrity.contentOk) fail(bundlePath, 2, "committed Node bundle content digest does not match");
  }
  return failures;
}

function run() {
  const root = resolve(process.argv[2] ?? dirname(dirname(fileURLToPath(import.meta.url))));
  const failures = validate(root);
  if (failures.length) {
    console.error(failures.join("\n"));
    console.error(`${failures.length} validation failure${failures.length === 1 ? "" : "s"}`);
    process.exitCode = 1;
    return;
  }
  console.log(`PASS ${root}`);
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) run();
