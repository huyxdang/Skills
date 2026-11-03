# Codex capability boundary

Codex owns the mechanics of collaboration, permissions, models, task state, and
tool availability. This skill supplies workflow policy only.

- Use the collaboration tools exposed in the current session. Do not assume a
  fixed worker type, model, concurrency limit, or background flag.
- Use the current permission mechanism. A user's request authorizes ordinary
  in-scope implementation work, but not unrelated external effects.
- Prefer read-only inspection before a write. Ask for permission when the
  environment requires it.
- Use workspace tools already available. Prepare missing dependencies in an isolated workspace when the task authorizes setup; never mutate the installed skill directory or global environment merely by invoking a skill.
- Keep parallel workers away from the same mutable files, branch, or state.
- Treat worker output as evidence to review, not as the final answer.
- Read optional personal and project pstack configuration through the swarm workflow. Inherit models when no preference exists, and never exceed host limits.
- Shared scope and evidence contracts apply to delegated work; no automatic private checkout is assumed.
