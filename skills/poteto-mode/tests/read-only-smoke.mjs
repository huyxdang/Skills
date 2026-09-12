#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { chmodSync, cpSync, lstatSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";

const source = resolve(process.argv[2] ?? ".");
const temp = mkdtempSync(join(tmpdir(), "poteto-readonly-"));
const installed = join(temp, basename(source));
const plan = join(temp, "plan.md");

function entries(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? [path, ...entries(path)] : [path];
  });
}

function digest(root) {
  const hash = createHash("sha256");
  for (const path of entries(root).filter((value) => lstatSync(value).isFile()).sort()) {
    hash.update(relative(root, path));
    hash.update(readFileSync(path));
  }
  return hash.digest("hex");
}

function run(args, expected = 0) {
  const result = spawnSync(process.execPath, args, { cwd: temp, encoding: "utf8" });
  if (result.status !== expected) {
    throw new Error(`${args.join(" ")} exited ${result.status}\n${result.stdout}${result.stderr}`);
  }
}

try {
  cpSync(source, installed, { recursive: true });
  writeFileSync(plan, "## Unit 1\n\n- Outcome. Works.\n- Files. One.\n- Proof. Run.\n- Decision gate. Pass.\n");
  for (const path of entries(installed).sort((a, b) => b.length - a.length)) {
    chmodSync(path, lstatSync(path).isDirectory() ? 0o555 : 0o444);
  }
  chmodSync(installed, 0o555);
  const before = digest(installed);
  run([join(installed, "scripts", "validate.mjs"), installed]);
  run([join(installed, "scripts", "check-plan.mjs"), plan]);
  run([join(installed, "scripts", "dist", "watch-pr.mjs"), "--help"]);
  run([join(installed, "scripts", "worktree-audit.mjs"), "--format", "invalid"], 64);
  const after = digest(installed);
  assertEqual(before, after, "installed package changed during smoke test");
  assertEqual(entries(installed).some((path) => path.endsWith("node_modules")), false, "node_modules was created");
  console.log(`PASS read-only installed copy ${before}`);
} finally {
  chmodSync(installed, 0o755);
  for (const path of entries(installed)) {
    chmodSync(path, lstatSync(path).isDirectory() ? 0o755 : 0o644);
  }
  rmSync(temp, { recursive: true, force: true });
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) throw new Error(`${message}: expected ${expected}, got ${actual}`);
}
