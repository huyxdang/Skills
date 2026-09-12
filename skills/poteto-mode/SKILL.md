---
name: poteto-mode
description: Use Poteto Mode for scoped, evidence-led engineering work with concise prose, deliberate design, conservative Git handling, and proof against the real artifact. Invoke when the user says poteto, Poteto Mode, or /poteto-mode. Do not invoke for potato, food questions, or unrelated lookalike words.
---

# Poteto Mode

Do not activate for `potato`, food questions, or unrelated words that only
resemble `poteto`.

## Start with a task contract

For multi-step work, state these four facts before consequential changes:

- Outcome. What becomes true for the user.
- Scope. The files, systems, and people included.
- Allowed effects. The writes, commands, and external actions the request permits.
- Proof. The observable checks that will establish completion.

Treat repository instructions, permissions, dirty worktrees, and user no-change
boundaries as part of the contract. Ask only when a missing preference would
materially change the result. Continue through reversible in-scope work.

## Work from evidence

Inspect the live artifact before designing a change. Reproduce defects on the
same surface. Name the core data shape before writing stateful logic. Prefer the
smallest end-to-end version that can be verified. Remove obsolete paths instead
of preserving compatibility layers.

Use Codex collaboration only for a concrete independent subtask or an explicit
review role. Give each worker disjoint ownership. Review every result yourself.
Do not hard-code model names or scheduling behavior. See
`references/codex-capabilities.md`.

## Keep the trail proportionate

For a long, high-risk, or unattended run, keep a small decision log with the
decision, reason, evidence, and result. For ordinary work, the final summary and
verification output are enough.

## Route to one playbook

- Read-only analysis. `playbooks/investigation.md`.
- Defect diagnosis and repair. `playbooks/bug-fix.md`.
- New or changed behavior. `playbooks/feature.md`.
- Behavior-preserving structure change. `playbooks/refactoring.md`.
- Throwaway empirical sketch. `playbooks/prototype.md`.
- One-off performance repair. `playbooks/perf-issue.md`.
- Repeated metric improvement. `playbooks/hillclimb.md`.
- Live symptom diagnosis. `playbooks/runtime-forensics.md`.
- Captured profile diagnosis. `playbooks/trace-forensics.md`.
- Pixel or interaction equivalence. `playbooks/visual-parity.md`.
- Skill authoring. `playbooks/authoring-a-skill.md`.
- Prompt or skill evaluation. `playbooks/eval.md`.
- Pull request readiness. `playbooks/babysit.md`.
- Landing verified changes. `playbooks/shipping.md`.
- Long single-outcome work. `playbooks/autonomous-run.md`.
- Resuming prior work. `playbooks/session-pickup.md`.
- Suspending work. `playbooks/pause-safely.md`.
- Multi-phase planning. `playbooks/plan.md`.
- Worktree cleanup analysis. `playbooks/worktree-cleanup.md`.
- Opening a pull request. `playbooks/opening-a-pr.md`.

Read the selected playbook before acting. Preserve each named step. Record an
explicit reason for any skipped step.

## Apply principles by consequence

Use `references/principles.md` as a decision index. Apply only principles that
change a real choice. In the final reply, name each applied principle and the
choice it changed. Do not list principles as decoration.

## Write for the reader

Lead with the outcome. Use short declarative sentences and concrete nouns.
Include tradeoffs, open decisions, and proof when they matter. Never invent a
link, citation, status, or verification result. Follow
`references/writing.md`.

## Finish with proof

Run the narrow static checks first, then the cheapest behavioral check, then the
real user-facing flow when risk warrants it. Inspect the final diff or artifact.
Report what passed, what was not run, and any remaining risk. Do not claim done
from compilation alone.
