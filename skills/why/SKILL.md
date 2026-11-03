---
name: why
description: "Investigate why code or a design decision exists using history, issues, documents, and relevant connected sources. Distinguish recorded intent from inference."
---

# Why

Anchor the question in exact files, symbols, revisions, and linked issues. Inspect blame and history through renames; follow substantive commits to their PR discussions. Prefer connected tools when they support the source.

Discover relevant available sources: source control, tickets, documents, team chat, observability, error tracking, and product analytics. Search the categories that can answer this question; keep a compact coverage record of searched, unavailable, and irrelevant sources. Do not assume a connector or CLI exists. Do not send messages or change tickets during investigation.

For independent substantial searches, use `../swarm/SKILL.md` with one read-only slice per source. Supply the anchor, question, date range, and expected evidence. Keep raw transcripts out of the synthesis.

Read `references/epistemics.md` for confidence language and `references/sources/` only for relevant source guidance. Check original records and dates before attributing intent. Distinguish recorded rationale, reasonable inference, competing explanations, and unknowns. Absence of a search result does not prove an event never happened.

Return the conclusion with citations, material tradeoffs, confidence, and source gaps. If the user plans a change, translate findings into what to preserve, change, avoid, and verify.

## Codex execution

Resolve bundled paths from this skill directory. Read a named sibling skill before using its workflow; if it is not installed, report that dependency and use only capabilities actually available. Host instructions and the user’s scope govern all actions. A skill does not authorize unrelated edits, external messages, merges, or publication.
