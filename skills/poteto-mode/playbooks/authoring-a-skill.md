# Authoring a skill

1. Read the current Codex skill-authoring instructions in the environment.
2. Inspect the target skill, its metadata, references, scripts, and tests.
3. Define trigger phrases, intended behavior, and explicit non-goals.
4. Keep `SKILL.md` as a concise router. Move detail to referenced files.
5. Put interface metadata and invocation policy in `agents/openai.yaml`.
6. Add deterministic validation for metadata, references, and forbidden terms.
7. Exercise representative prompts and at least one near-miss prompt.
8. Validate a copied read-only package when the skill ships executable helpers.
9. Inspect the installed copy after installation.
