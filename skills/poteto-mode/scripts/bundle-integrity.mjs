#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const INPUTS = [
  "bun.lock",
  "package.json",
  "watch-pr/cli.ts",
  "watch-pr/github.ts",
  "watch-pr/main.ts",
  "watch-pr/policy.ts",
  "watch-pr/render.ts",
  "watch-pr/types.ts",
];
const SOURCE_PREFIX = "// poteto-source-sha256=";
const BUNDLE_PREFIX = "// poteto-bundle-sha256=";

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

function bundleBody(source) {
  return source
    .replace(/^\/\/ poteto-source-sha256=[a-f0-9]+\n/, "")
    .replace(/^\/\/ poteto-bundle-sha256=[a-f0-9]+\n/, "");
}

export function sourceDigest(scriptsRoot) {
  const hash = createHash("sha256");
  for (const relative of INPUTS) {
    hash.update(relative);
    hash.update(readFileSync(join(scriptsRoot, relative)));
  }
  return hash.digest("hex");
}

export function bundleIntegrity(scriptsRoot) {
  const source = readFileSync(join(scriptsRoot, "dist", "watch-pr.mjs"), "utf8");
  const [sourceLine, bundleLine] = source.split("\n", 2);
  const expectedSource = sourceDigest(scriptsRoot);
  const actualSource = sourceLine.startsWith(SOURCE_PREFIX) ? sourceLine.slice(SOURCE_PREFIX.length) : null;
  const expectedBundle = digest(bundleBody(source));
  const actualBundle = bundleLine.startsWith(BUNDLE_PREFIX) ? bundleLine.slice(BUNDLE_PREFIX.length) : null;
  const sourceOk = actualSource === expectedSource;
  const contentOk = actualBundle === expectedBundle;
  return { ok: sourceOk && contentOk, sourceOk, contentOk, expectedSource, actualSource, expectedBundle, actualBundle };
}

export function stampBundle(scriptsRoot) {
  const path = join(scriptsRoot, "dist", "watch-pr.mjs");
  const source = bundleBody(readFileSync(path, "utf8"));
  const sourceHash = sourceDigest(scriptsRoot);
  const bundleHash = digest(source);
  writeFileSync(path, `${SOURCE_PREFIX}${sourceHash}\n${BUNDLE_PREFIX}${bundleHash}\n${source}`);
  return { sourceHash, bundleHash };
}

function run() {
  const scriptsRoot = dirname(fileURLToPath(import.meta.url));
  if (process.argv[2] === "--stamp") {
    const result = stampBundle(scriptsRoot);
    console.log(`STAMP source=${result.sourceHash} bundle=${result.bundleHash}`);
    return;
  }
  const result = bundleIntegrity(scriptsRoot);
  if (!result.ok) {
    console.error(
      `bundle integrity failed: source=${result.sourceOk ? "ok" : "stale"} content=${result.contentOk ? "ok" : "changed"}`
    );
    process.exitCode = 1;
    return;
  }
  console.log(`PASS source=${result.expectedSource} bundle=${result.expectedBundle}`);
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) run();
