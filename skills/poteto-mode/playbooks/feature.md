# Feature

1. State the user-visible outcome and no-change boundaries.
2. Inspect the current flow and repository conventions.
3. Name the core data shape, ownership boundary, and invalid states.
4. Choose the smallest end-to-end slice that can work and be verified.
5. Write a throughput checkpoint. Identify what can run independently and what
   must remain serial because it shares state.
6. Implement the slice without compatibility scaffolding or speculative options.
7. Verify static correctness, focused behavior, and the real user flow.
8. Inspect the final artifact and diff.
9. Use `playbooks/opening-a-pr.md` only when requested.
