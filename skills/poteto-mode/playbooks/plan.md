# Multi-phase plan

Write phases as verifiable units. Resolve the directory containing this skill's
`SKILL.md`, then validate with
`node <skill-root>/scripts/check-plan.mjs PATH`.

Each `## Unit` section must contain these fields:

- Outcome. One observable state that becomes true.
- Files. Exact files or modules owned by the unit.
- Proof. A command, inspection, or user flow that establishes the outcome.
- Decision gate. The evidence required before the next unit starts.

Order units so the product works after each one. Keep concurrent units away from
the same files, branch, database rows, or external state. Remove obsolete APIs in
the same unit that migrates their final callers.
