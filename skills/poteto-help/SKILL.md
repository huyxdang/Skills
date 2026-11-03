---
name: poteto-help
description: "Explain how to use the installed Codex pstack skills, select a workflow, and show practical invocation examples."
---

# Poteto Help

Inspect the installed suite rather than assuming the upstream catalog. Use `$poteto-mode` for an engineering workflow, `$how` for runtime understanding, `$why` for rationale, `$architect` for design, `$arena` for alternatives, `$swarm` for parallel slices, and `$interrogate` for adversarial review.

For a bug, include the symptom, expected behavior, reproduction, and proof: `$poteto-mode Reproduce the idle scroll drift, fix the cause, and verify the actual UI.`
For review: `$interrogate Review this diff for correctness; report findings without edits.`
For context: `$recall Rebuild my recent work on the importer.`
For configuration: `$setup-pstack Use inherited models and limit workers to two.`

Explain relevant skills only. List actual installed names when the user requests the full catalog. Distinguish optional dependencies and unavailable capabilities. A skill is workflow guidance; it cannot override scope, approvals, tool access, or model availability. Do not promise unattended scheduling from a prompt alone; use the host automation tools only when scheduling is requested.

## Codex execution

Resolve bundled paths from this skill directory. Read a named sibling skill before using its workflow; if it is not installed, report that dependency and use only capabilities actually available. Host instructions and the user’s scope govern all actions. A skill does not authorize unrelated edits, external messages, merges, or publication.

Poteto Mode retains explicit-only invocation. Select or mention `$poteto-mode` to load it; natural-language aliases in its body are not a promise of automatic discovery. Other skills use their own installed invocation policy.
