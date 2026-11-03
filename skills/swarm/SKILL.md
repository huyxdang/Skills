---
name: swarm
description: "Run parallel coverage, independent work slices, or races and consolidate their evidence. Use when parallel work is requested or materially helps a substantial task."
---

# Swarm

Define the result and completion predicate. Choose coverage, first-pass race, rank-all, or best-of before launching workers. For coverage, every required slice must be accounted for; a dropout is a gap.

This skill authorizes delegation for its scoped workflow when collaboration is available and allowed by the host. Use only the current collaboration APIs. Inherit the parent model unless the user or a relevant configuration selects an available model. Read optional personal `$CODEX_HOME/pstack/config.json` (default `~/.codex/pstack/config.json`) and project `.agents/pstack-config.json`. Project values override personal values by role and worker limit. Validate role preferences and positive integer `max_workers`; reject unavailable model choices without pretending to honor them. Use explorer for discovery, implementer for writing, reviewer for findings, and judge for candidate comparison. Unconfigured roles inherit. Effective capacity is the lesser of saved preference and currently available host slots; do not count the coordinator as an available worker. Configured limits may reduce but never raise the host limit. Respect the actual concurrency limit; queue excess slices. If delegation is unavailable, perform slices serially and disclose the limitation.

Give each worker a self-contained brief: goal, scope, input paths, exact revision and dirty-diff snapshot where relevant, owned output path, forbidden effects, verification method, and report schema. For measurements include sample count and ordering. Give writers disjoint files or isolated worktrees; never assume a spawned worker gets its own checkout. Keep shared Git mutations and live UI driving with one owner.

Workers report PASS, ISSUES, or BLOCKED with artifact paths and evidence. Review terminal results, inspect artifacts, and rerun consequential checks. Retry a missing or unusable result once with the failure explained, then record a coverage gap. Stop remaining race workers after the declared stopping rule is met without discarding their uncommitted work.

Return one consolidated result, proven issues, gaps, and the selection rule. Never count missing evidence as a pass.

## Codex execution

Resolve bundled paths from this skill directory. Read a named sibling skill before using its workflow; if it is not installed, report that dependency and use only capabilities actually available. Host instructions and the user’s scope govern all actions. A skill does not authorize unrelated edits, external messages, merges, or publication.
