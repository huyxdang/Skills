#!/usr/bin/env node

import { readFileSync, realpathSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED = ["Outcome", "Files", "Proof", "Decision gate"];

export function checkPlan(source) {
  const starts = [...source.matchAll(/^## Unit\b.*$/gm)];
  if (starts.length === 0) return ["plan must contain at least one ## Unit section"];
  const failures = [];
  for (let index = 0; index < starts.length; index += 1) {
    const start = starts[index].index;
    const end = starts[index + 1]?.index ?? source.length;
    const section = source.slice(start, end);
    for (const field of REQUIRED) {
      const pattern = new RegExp(`^(?:#{3,6}\\s+|[-*]\\s+|\\*\\*)${field}(?:\\*\\*)?[.:]`, "im");
      if (!pattern.test(section)) failures.push(`unit ${index + 1} is missing ${field}`);
    }
  }
  return failures;
}

function run() {
  const path = process.argv[2];
  if (!path) {
    console.error("usage: node scripts/check-plan.mjs PATH");
    process.exitCode = 64;
    return;
  }
  const failures = checkPlan(readFileSync(resolve(path), "utf8"));
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
    return;
  }
  console.log(`PASS ${path}`);
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) run();
