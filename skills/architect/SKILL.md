---
name: architect
description: "Design caller usage, domain types, ownership, and module boundaries before a substantial implementation. Use for architecture work and consequential design choices."
---

# Architect

Ground the design in the current subsystem using `../how/SKILL.md` and repository conventions. Write representative caller usage first; derive the smallest types, signatures, state transitions, errors, and ownership boundaries that support it.

For a consequential unsettled choice, use `../arena/SKILL.md` to compare alternatives. A small settled change does not need a panel. Read `references/design-red-flags.md` and `references/rationale-template.md` when a substantial design needs a reviewable rationale.

Keep sketches in scratch files or design documents. Do not replace working production code with stub bodies. If the user requested design only, finish with the sketch, tradeoffs, and verification plan. If implementation is authorized, implement in verifiable slices and check callers against the design.

Repeated workarounds, casts, coordination leaks, or deviations of the same shape are evidence to revisit the design. Investigate the failed premise before adding another workaround. Redesign only within the user's scope, preserve unrelated work, and verify the final behavior.

## Codex execution

Resolve bundled paths from this skill directory. Read a named sibling skill before using its workflow; if it is not installed, report that dependency and use only capabilities actually available. Host instructions and the user’s scope govern all actions. A skill does not authorize unrelated edits, external messages, merges, or publication.
