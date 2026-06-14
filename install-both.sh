#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"

bash "${script_dir}/install-codex.sh"
bash "${script_dir}/install-claude.sh"

printf 'Council skill installed for both Codex and Claude Code.\n'
printf 'Codex invocation: /council\n'
printf 'Claude Code invocation: /council\n'
