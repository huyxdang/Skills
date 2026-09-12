# Pull request readiness

1. Derive the action mode from the request. Check mode is read-only. Threads-only
   mode addresses review feedback only. Drive mode owns all readiness blockers.
2. Declare single-PR or stack scope and identify the exact pull requests.
3. Read the status required by that mode, including head revisions.
4. In check mode, report the current state and stop without editing.
5. In a mutation mode, classify each in-scope item as fix, dismiss with evidence,
   or requires user intent.
6. Reproduce actionable findings before editing when practical.
7. Make and verify the narrowest change allowed by the action mode.
8. Re-read status after each push because the head and checks may have changed.
9. Continue until the mode's outcome is reached, user input is required, or an
   explicit stop condition is met.

For read-only monitoring, resolve the directory containing this skill's
`SKILL.md`, then run the bundled watcher with Node:

`node <skill-root>/scripts/dist/watch-pr.mjs --owner OWNER --repo REPO --pr NUMBER --status-only`

Do not merge. Landing belongs to `playbooks/shipping.md`.
