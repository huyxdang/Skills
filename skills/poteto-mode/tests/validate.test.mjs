import assert from "node:assert/strict";
import { appendFileSync, cpSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { validate } from "../scripts/validate.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("the package validates", () => {
  assert.deepEqual(validate(root), []);
});

test("the validator rejects former-host contracts", () => {
  const temp = mkdtempSync(join(tmpdir(), "poteto-validate-"));
  try {
    cpSync(root, temp, { recursive: true });
    appendFileSync(join(temp, "playbooks", "feature.md"), "\nCursor cloud dashboard\n");
    assert(validate(temp).some((failure) => failure.includes("former host reference")));
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});

test("the validator rejects a stale watcher bundle", () => {
  const temp = mkdtempSync(join(tmpdir(), "poteto-bundle-"));
  try {
    cpSync(root, temp, { recursive: true });
    appendFileSync(join(temp, "scripts", "watch-pr", "policy.ts"), "\nexport {};\n");
    assert(validate(temp).some((failure) => failure.includes("source stamp is stale")));
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});

test("the validator rejects modified bundle content", () => {
  const temp = mkdtempSync(join(tmpdir(), "poteto-bundle-content-"));
  try {
    cpSync(root, temp, { recursive: true });
    appendFileSync(join(temp, "scripts", "dist", "watch-pr.mjs"), "\n// changed\n");
    assert(validate(temp).some((failure) => failure.includes("content digest does not match")));
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
