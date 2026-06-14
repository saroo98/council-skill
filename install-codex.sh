#!/usr/bin/env bash
set -euo pipefail

die() {
  printf 'Error: %s\n' "$*" >&2
  exit 1
}

install_skill() {
  local label="$1"
  local parent_dir="$2"
  local invoke_hint="$3"
  local script_dir source_dir home_real parent_real dest_dir timestamp backup_dir

  script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
  source_dir="${script_dir}/skills/council"

  [ -f "${source_dir}/SKILL.md" ] || die "Missing source skill at ${source_dir}/SKILL.md"
  [ -n "${HOME:-}" ] || die "HOME is not set"

  home_real="$(cd -- "${HOME}" && pwd -P)"
  mkdir -p -- "${parent_dir}"
  parent_real="$(cd -- "${parent_dir}" && pwd -P)"

  case "${parent_real}" in
    "${home_real}"/*) ;;
    *) die "Refusing to install outside HOME: ${parent_real}" ;;
  esac

  dest_dir="${parent_real}/council"

  if [ -e "${dest_dir}" ]; then
    timestamp="$(date +%Y%m%d-%H%M%S)"
    backup_dir="${dest_dir}.backup.${timestamp}"
    [ ! -e "${backup_dir}" ] || die "Backup path already exists: ${backup_dir}"
    mv -- "${dest_dir}" "${backup_dir}"
    printf 'Existing %s destination backed up to %s\n' "${label}" "${backup_dir}"
  fi

  mkdir -p -- "${dest_dir}"
  cp -R -- "${source_dir}/." "${dest_dir}/"

  printf 'Council skill installed for %s at %s\n' "${label}" "${dest_dir}"
  printf 'Invoke it with: %s\n' "${invoke_hint}"
}

install_skill "Codex" "${HOME}/.agents/skills" "/council"
