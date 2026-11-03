---
name: interrogate
description: "Adversarially review a diff or design, reproduce important defects, and report evidence-backed findings without applying fixes."
---

# Interrogate

Resolve the exact requested diff or design, intent, base and head revisions, and uncommitted changes. Do not assume the base branch is main. Keep this review read-only apart from isolated repro artifacts.

Use `../swarm/SKILL.md` to assign independent review lenses when available: correctness, boundaries and failure recovery, concurrency, and maintainability. Use the same precise scope for every reviewer. Each finding needs a concrete trigger, code location, consequence, and evidence. Run repros in isolated state; do not trigger production effects.

Rerun consequential repros and inspect the cited code. Deduplicate by root cause. Separate reproduced defects, strongly supported static findings, and unresolved verification gaps. Do not invent a severity or call an untested suspicion a proven defect. No findings is valid; no findings is not proof of correctness.

Return actionable findings first with priority, location, explanation, and validation evidence. Identify gaps and rejected claims briefly. Do not apply fixes unless the user also requested them.

## Codex execution

Resolve bundled paths from this skill directory. Read a named sibling skill before using its workflow; if it is not installed, report that dependency and use only capabilities actually available. Host instructions and the user’s scope govern all actions. A skill does not authorize unrelated edits, external messages, merges, or publication.
