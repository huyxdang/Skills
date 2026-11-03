# Huy's skills

A small collection of agent skills for Codex, Claude Code, Cursor, OpenCode, and other tools that support the Agent Skills format. Some skills target one agent's capabilities.

## Install the full pack

Install every skill globally for the agents detected on your machine:

```bash
npx skills add huyxdang/Skills -g -y
```

Install every skill globally for every supported agent target:

```bash
npx skills add huyxdang/Skills --all -g
```

List the available skills without installing them:

```bash
npx skills add huyxdang/Skills --list
```

Install one skill:

```bash
npx skills add huyxdang/Skills --skill eli5 -g
```

For Poteto Mode specifically:

```bash
npx skills add huyxdang/Skills --skill poteto-mode -g
```

## Included skills

The Codex suite includes all 58 top-level pstack skills at the revision in [pstack-source.json](pstack-source.json), plus `eli5`, `emil-design-eng`, and `social-card`: 61 skills total.

### Engineering and communication workflows

`architect`, `arena`, `automate-me`, `benchmark-checklist`, `blast-radius`, `bro`, `correct`, `create-formal-verification-skill`, `create-verification-skill`, `figure-it-out`, `how`, `in-your-own-words`, `interrogate`, `ketchup`, `ketchup-video`, `maintain-formal-verification-skill`, `maintain-verification-skill`, `make-bot-ui`, `no-comments`, `poteto-help`, `poteto-mode`, `recall`, `reflect`, `setup-pstack`, `sharpen`, `show-me-your-work`, `statechart`, `swarm`, `tdd`, `teach`, `technical-writing`, `typescript-best-practices`, `unslop`, `why`.

### Engineering principles

`principle-attack-the-premise`, `principle-boundary-discipline`, `principle-build-the-lever`, `principle-encode-lessons-in-structure`, `principle-exhaust-the-design-space`, `principle-experience-first`, `principle-explain-the-number`, `principle-fix-root-causes`, `principle-foundational-thinking`, `principle-guard-the-context-window`, `principle-laziness-protocol`, `principle-make-operations-idempotent`, `principle-migrate-callers-then-delete-legacy-apis`, `principle-minimize-reader-load`, `principle-model-the-domain`, `principle-never-block-on-the-human`, `principle-outcome-oriented-execution`, `principle-prove-it-works`, `principle-redesign-from-first-principles`, `principle-separate-before-serializing-shared-state`, `principle-sequence-verifiable-units`, `principle-subtract-before-you-add`, `principle-test-behavior-not-implementation`, `principle-type-system-discipline`.

### Additional personal skills

- `eli5`: a self-contained visual HTML explanation.
- `emil-design-eng`: interface polish, components, gestures, and animation.
- `social-card`: image composition with the bundled background.

## Codex usage

Invoke `$poteto-mode` for a scoped engineering task. It retains its existing explicit-only invocation policy and loads the relevant playbook and supporting workflows. `$bro` also remains explicit-only. Other skills have normal discovery enabled with task-specific descriptions.

Poteto Mode already had a strong Codex foundation. This revision adds companion routing, bounded multi-PR coordination, missing verification principles, proportional workflow steps, and ordinary-language reporting. It retains the existing watcher, cleanup protections, and tests.

Workers use the capabilities and concurrency available in the current session. No provider or model is assumed. `$setup-pstack` can set preferences in `$CODEX_HOME/pstack/config.json` (default `~/.codex/pstack/config.json`) or project `.agents/pstack-config.json`; project settings override personal settings. Installed skill folders are never configuration stores.

Statechart needs a supported TypeScript-capable runtime, Java, and TLC for actual model checking. Its checker does not install dependencies. See its dependency reference. The PR watcher needs Node.js and GitHub CLI when used. Social-card's compositor needs Python and Pillow; host image-editing rules still apply. Bot UI needs an actual configured webhook; absent one, the skill can produce a clearly labeled mock-backed UI, not a fictional Codex webhook.

The dormant upstream Benny automation pack is outside the skill catalog and is not installed or activated. No recurring automation or external communication is enabled by installing this suite.

## Validation

Install PyYAML in a development environment, then run:

```bash
python3 scripts/validate-skills.py skills
node skills/poteto-mode/scripts/validate.mjs skills/poteto-mode
node --test skills/poteto-mode/tests/*.test.mjs
node skills/poteto-mode/tests/read-only-smoke.mjs skills/poteto-mode
```

Statechart's scripts directory retains upstream replay and integration tests. Read its dependency reference before running tests that need external runtimes or renderers. Tests without real TLC are replay/unit evidence, not a new formal proof.

## Attribution

Pstack-derived skills preserve Lauren Tan's upstream MIT notice in each package. The adapted source revision is pinned in `pstack-source.json`. Poteto Mode retains its original third-party notices, including its bundled Commander dependency. `emil-design-eng` preserves its upstream MIT notice.

## Updating

Re-run the full-pack install command when new skills are added to this repository. `npx skills update` refreshes skills already installed on a machine, but does not reliably discover new skills added to a source repository.

## License

MIT. See [LICENSE](LICENSE).
