# Contributing

Thanks for improving Council. Keep contributions practical, small, and easy to verify.

## Development Setup

Clone the repository:

```bash
git clone https://github.com/saroo98/council-skill.git
cd council-skill
```

Run the local checks:

```bash
node scripts/validate-repo.mjs
bash -n install-codex.sh
bash -n install-claude.sh
bash -n install-both.sh
```

## Contribution Guidelines

- Keep `skills/council/SKILL.md` instruction-only unless there is a clear reason to add resources.
- Preserve the required skill frontmatter fields.
- Prefer concrete guidance over abstract roleplay.
- Do not add dependencies unless they are necessary and justified.
- Do not commit secrets, local config, generated caches, or build artifacts.
- Update `examples/` and `docs/forward-tests.md` when changing skill behavior.

## Pull Requests

Open a pull request with:

- A short summary of what changed
- The reason for the change
- Commands run for verification
- Any tradeoffs or known limitations
