import assert from "node:assert/strict";
import test from "node:test";
import { checkPlan } from "../scripts/check-plan.mjs";

test("accepts independently verifiable units", () => {
  const plan = `# Plan

## Unit 1

- Outcome. The parser accepts valid input.
- Files. parser.mjs
- Proof. node --test
- Decision gate. The focused test passes.

## Unit 2

### Outcome. The command exposes the parser.
### Files. cli.mjs
### Proof. node cli.mjs --help
### Decision gate. The command exits zero.
`;
  assert.deepEqual(checkPlan(plan), []);
});

test("reports missing fields by unit", () => {
  const failures = checkPlan("## Unit 1\n\n- Outcome. It works.\n");
  assert.deepEqual(failures, [
    "unit 1 is missing Files",
    "unit 1 is missing Proof",
    "unit 1 is missing Decision gate",
  ]);
});

test("requires a unit", () => {
  assert.deepEqual(checkPlan("# Notes\n"), ["plan must contain at least one ## Unit section"]);
});
