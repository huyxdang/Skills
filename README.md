# Huy's skills

A small, portable collection of agent skills for Codex, Claude Code, Cursor, OpenCode, and other tools that support the Agent Skills format.

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

## Included skills

| Skill | Use it for |
| --- | --- |
| `bro` | Restating the previous answer in plain language when explicitly invoked with `/bro`. |
| `eli5` | Building a simple, visual HTML explanation for a topic. |
| `social-card` | Placing a supplied image on the bundled social-card background. Requires Python 3 and Pillow. |

The canonical package layout is under [`skills/`](skills/). Each skill is a self-contained directory with a required `SKILL.md` and only the resources it needs.

## Updating

Re-run the full-pack install command when new skills are added to this repository. `npx skills update` refreshes skills already installed on a machine, but does not reliably discover new skills added to a source repository.

## License

MIT. See [LICENSE](LICENSE).
