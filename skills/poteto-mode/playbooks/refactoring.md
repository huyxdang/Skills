# Refactoring

1. State the behavior that must remain unchanged.
2. Capture a focused baseline that proves that behavior.
3. Map callers and delete obsolete structure before adding anything.
4. Prefer inline, move, rename, or deletion over a new abstraction.
5. Migrate all callers and remove the old API in the same change.
6. Run the baseline, relevant tests, and a caller search.
7. Inspect the diff for compatibility layers and behavior drift.
8. Use `playbooks/opening-a-pr.md` only when requested.
