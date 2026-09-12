# Bug fix

1. Reproduce the reported defect on the same user-facing surface.
2. Record the smallest failing input and the observed output.
3. Trace the failure to the earliest incorrect state or boundary.
4. Add a focused regression check when the repository has a cheap test target.
5. Fix the root cause with the smallest coherent change.
6. Run the focused check, the relevant suite, and the original reproduction.
7. Inspect the diff for unrelated edits and new fallback paths.
8. Use `playbooks/opening-a-pr.md` only when the user asked for a pull request.

If the defect cannot be reproduced, report the attempted surface and missing
evidence. Do not guess a fix.
