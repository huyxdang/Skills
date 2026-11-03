---
name: no-comments
description: "Review comments and suppressions in a specified diff, remove redundant commentary when editing is requested, and preserve useful constraints and notices."
---

# No Comments

Resolve the user's files or diff and inspect the code around each comment. Read historical rationale when a warning's purpose is unclear. Do not delete a comment because it is lengthy, emphatic, or inconvenient.

Keep legal notices, public API documentation, non-obvious rationale, external constraints, and justified tool directives. Flag stale comments and narration of obvious code. Check lint and type suppressions against the actual diagnostic; removing them must not hide an unresolved error.

For substantial scope, use `../swarm/SKILL.md` for an independent read-only comment reviewer. The coordinator verifies each proposed deletion. Unknown rationale remains a review question, not permission to delete.

If cleanup is requested, remove confirmed redundancy and repair in-scope causes with focused verification. Propose a type, test, or lint when it can enforce a real constraint, but do not remove the explanation before the replacement preserves its purpose. Review-only requests produce findings without edits. Report meaningful changes and unresolved constraints.

## Codex execution

Resolve bundled paths from this skill directory. Read a named sibling skill before using its workflow; if it is not installed, report that dependency and use only capabilities actually available. Host instructions and the user’s scope govern all actions. A skill does not authorize unrelated edits, external messages, merges, or publication.
