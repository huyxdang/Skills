---
name: how
description: "Explain code architecture, runtime flow, ownership, or where a change belongs. Use for code walkthroughs; use why for historical rationale."
---

# How

Inspect the requested subsystem without editing it. Start with its entry points, public types, callers, and tests. Follow one representative input through state changes and outputs. Confirm important framework or dependency behavior against the installed version.

For a narrow question, investigate and explain directly. For a broad subsystem, read `../swarm/SKILL.md` and divide independent read-only exploration by boundary. Review the cited code yourself before synthesizing.

Explain the purpose, key concepts, runtime flow, ownership, and consequential edge cases at the user's level. Include verified file links. Separate observed behavior from inference and missing runtime evidence. Do not dump an annotated source listing or invent historical intent.

## Codex execution

Resolve bundled paths from this skill directory. Read a named sibling skill before using its workflow; if it is not installed, report that dependency and use only capabilities actually available. Host instructions and the user’s scope govern all actions. A skill does not authorize unrelated edits, external messages, merges, or publication.
