---
name: setup-pstack
description: "Configure Codex pstack role preferences and concurrency using only capabilities available in the current environment."
---

# Setup Pstack

Inspect the available collaboration APIs and current model options. Do not guess model IDs or infer cross-provider availability. Inherit the parent model by default.

Read `.agents/pstack-config.json` in the active project first, then `$CODEX_HOME/pstack/config.json` (default `~/.codex/pstack/config.json`). The project file overrides personal values by role and worker limit. Missing files mean defaults. Write to the requested scope; default to the personal file for general setup and the project file for an explicitly project-scoped setup. Never write configuration into an installed skill or plugin cache. Change only preferences requested by the user. If they ask for a setup without preferences, explain the detected capabilities and use inherited models with the host's concurrency limit. Ask a concise question only when a choice materially affects cost or intended behavior.

The optional JSON file contains `roles` mapping role names to available model identifiers or `inherit`, and `max_workers` as a positive integer. The effective limit is the lesser of the saved preference and current available host capacity; a later host may expose fewer slots. Roles are explorer for read-only discovery, implementer for artifact/code writing, reviewer for defect or evidence review, and judge for arena candidate comparison. A worker with multiple duties uses the role of its main deliverable. Unconfigured roles inherit. This file is read by the suite, not a Codex runtime configuration file. It cannot unlock models or alter host permissions. Validate types and availability before writing. Preserve unrecognized user preferences and report unsupported values instead of silently substituting a model.

Do not write global runtime configuration or install another provider. Report the exact changed file and effective preferences. No file is needed for defaults.

## Codex execution

Resolve bundled paths from this skill directory. Read a named sibling skill before using its workflow; if it is not installed, report that dependency and use only capabilities actually available. Host instructions and the user’s scope govern all actions. A skill does not authorize unrelated edits, external messages, merges, or publication.
