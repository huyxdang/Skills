---
name: arena
description: "Compare independent candidate solutions, select a base using a rubric, combine useful parts, and verify the result. Use for competing designs or explicit arena requests."
---

# Arena

1. Define the artifact and a task-specific rubric before generating candidates. Give candidates the same requirements and baseline, without steering them toward the preferred solution.
2. Read `../swarm/SKILL.md`. Use its ownership and model rules to generate at least two candidates in isolated output directories or worktrees. With no collaboration, produce alternatives serially and disclose the reduced independence.
3. Read every candidate. When an independent reviewer is available, give it the rubric and anonymized candidates after writers finish. Different model families are optional, never assumed. Agreement is supporting evidence, not proof.
4. Score the candidates against each criterion. Select the simplest coherent base that meets the requirements. Resolve disagreements from evidence.
5. Integrate useful parts of other candidates without combining incompatible designs. Reframe an ambiguous requirement before another round; respect the user's budget and scope.
6. Verify the combined artifact, including regressions introduced by integration. Report the base, useful contributions, rejected ideas, dropouts, and evidence. Do not merge, publish, or open a PR unless authorized.

## Codex execution

Resolve bundled paths from this skill directory. Read a named sibling skill before using its workflow; if it is not installed, report that dependency and use only capabilities actually available. Host instructions and the user’s scope govern all actions. A skill does not authorize unrelated edits, external messages, merges, or publication.
