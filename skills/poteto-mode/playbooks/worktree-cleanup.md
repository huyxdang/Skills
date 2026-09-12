# Worktree cleanup

1. Resolve the repository and capture the intended base revision without fetching.
2. Mark current worktrees as active or explicitly inactive from reliable context.
3. Resolve the directory containing this skill's `SKILL.md`. Run
   `node <skill-root>/scripts/worktree-audit.mjs --repo PATH --base REF` with the
   activity flags that are known.
4. Inspect every hold and review result before considering a candidate.
5. Present exact candidate paths, evidence, and estimated effect to the user.
6. Delete only after explicit approval for those exact paths.
7. Use Git's worktree removal command. Do not use a recursive-delete fallback.
8. Run `git worktree prune` only when separately requested or clearly included.
9. Re-list worktrees and verify the requested result.

Untracked files, ignored files, locks, open pull requests, closed-unmerged pull
requests, unknown activity, and missing evidence are never cleanup candidates.
