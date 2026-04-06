#!/usr/bin/env bash
# ============================================================================
# validate-codex-mirror.sh — Validate the .codex/ mirror structure and content
#
# The .codex/ directory is an auto-synced mirror of .claude/ (agents, commands,
# skills) normalized for OpenAI Codex compatibility. This script ensures:
#
#   1. Required directories and files exist (.codex/commands/, .codex/agents/)
#   2. Every .codex agent/command is registered in AGENTS.md
#   3. No Claude Code-specific references remain in normalized files
#      (e.g., "Claude Code", "CLAUDE.md", slash-command syntax like `/foo`)
#   4. run-implementation.md meets the Codex contract:
#      - Contains RUN_STATUS.md bootstrap instructions
#      - Does not reference "current git SHA" (git unavailable in Codex)
#      - Includes Codex session/context budget guidance
#
# Usage:
#   bash scripts/validate-codex-mirror.sh                       # Validate all
#   bash scripts/validate-codex-mirror.sh --component=commands   # Commands only
#   bash scripts/validate-codex-mirror.sh --component=agents     # Agents only
#   bash scripts/validate-codex-mirror.sh --component=commands --name=run-implementation
#
# Options:
#   --component <name>  Restrict validation to "commands" or "agents" only.
#                        Can be passed multiple times. If omitted, all are checked.
#   --name <name>       Validate a single item by stem name (without .md extension).
#                        Must be combined with --component.
#
# Exit codes:
#   0  All checks passed
#   1  One or more validation issues found (details printed to stderr)
#
# This script is called automatically by sync-claude-to-codex.sh after syncing,
# but can also be run manually to audit the mirror at any time.
# ============================================================================
set -euo pipefail

# ── Project paths ───────────────────────────────────────────────────────────
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CODEX_DIR="$ROOT_DIR/.codex"
AGENTS_FILE="$ROOT_DIR/AGENTS.md"

# ── CLI state ───────────────────────────────────────────────────────────────
# COMPONENTS: which component types to validate (empty = all)
# ITEM_NAME:  optional single-item filter within a component
declare -a COMPONENTS=()
ITEM_NAME=""

# ── Issue accumulator ───────────────────────────────────────────────────────
# Collects all validation failures so we can report them together at the end
# rather than failing on the first error.
issues=()

# Append a human-readable issue description to the issues array.
add_issue() {
  issues+=("$1")
}

# ── Validation helpers ──────────────────────────────────────────────────────

# require_file <path>
# Check that a file exists. Adds an issue and returns 1 if missing.
require_file() {
  local path="$1"
  if [[ ! -f "$path" ]]; then
    add_issue "Missing required file: $path"
    return 1
  fi
  return 0
}

# check_registered_entries <kind> <dir>
# Verify that every .md file in <dir> (e.g., .codex/commands/) has a matching
# registration line in AGENTS.md. The expected format is:
#   - <stem>: .codex/<kind>/<filename>.md
# If ITEM_NAME is set, only that specific file is checked.
check_registered_entries() {
  local kind="$1"   # "commands" or "agents"
  local dir="$2"    # directory containing the .md files

  # Build the file list: single item or all .md files in the directory
  local files=()
  if [[ -n "$ITEM_NAME" ]]; then
    files=("$dir/$ITEM_NAME.md")
  else
    shopt -s nullglob
    files=("$dir"/*.md)
    shopt -u nullglob
  fi

  local file
  for file in "${files[@]}"; do
    [[ -f "$file" ]] || continue
    local base
    base="$(basename "$file")"
    local stem="${base%.md}"
    # Expected line format in AGENTS.md, e.g.: "- run-implementation: .codex/commands/run-implementation.md"
    local expected="- $stem: .codex/$kind/$base"
    if ! grep -Fq -- "$expected" "$AGENTS_FILE"; then
      add_issue "AGENTS.md is missing registration for .codex/$kind/$base"
    fi
  done
}

# check_no_pattern <regex> <target> <label>
# Search <target> (file or directory) for a regex pattern that should NOT appear
# in Codex-normalized content. If found, the first match is reported as an issue.
# Uses ripgrep (rg) for fast searching across .md files.
check_no_pattern() {
  local pattern="$1"   # regex to search for
  local target="$2"    # file or directory to search in
  local label="$3"     # human-readable description for the issue message

  if rg -n --glob '*.md' -- "$pattern" "$target" >/tmp/codex-validate-match.$$ 2>/dev/null; then
    local first_match
    first_match="$(head -n 1 /tmp/codex-validate-match.$$)"
    add_issue "$label still present: $first_match"
  fi
  rm -f /tmp/codex-validate-match.$$
}

# check_run_implementation_contract
# The run-implementation.md command has special requirements for Codex:
#   - Must bootstrap RUN_STATUS.md (since Codex can't use git for progress tracking)
#   - Must NOT reference "current git SHA" (git is unavailable in Codex sandbox)
#   - Must include guidance about fresh Codex sessions and context budgets
# Skipped if validating a different single item (--name != run-implementation).
check_run_implementation_contract() {
  local file="$CODEX_DIR/commands/run-implementation.md"
  # Skip if we're validating a specific item that isn't run-implementation
  if [[ -n "$ITEM_NAME" && "$ITEM_NAME" != "run-implementation" ]]; then
    return 0
  fi
  # Skip if the file doesn't exist (handled by other checks)
  [[ -f "$file" ]] || return 0

  # Check 1: Must contain RUN_STATUS.md bootstrap instructions
  if ! rg -q "If RUN_STATUS\\.md does not exist, create it" "$file"; then
    add_issue "run-implementation.md is missing RUN_STATUS.md bootstrap instructions"
  fi

  # Check 2: Must NOT reference git SHA (Codex doesn't have git access)
  if rg -q "current git SHA" "$file"; then
    add_issue "run-implementation.md still refers to current git SHA even though git commands are disallowed"
  fi

  # Check 3: Must include Codex-specific session/context guidance
  if ! rg -q "fresh Codex session per block|context budget" "$file"; then
    add_issue "run-implementation.md is missing Codex session/context guidance"
  fi
}

# ── Component filter ────────────────────────────────────────────────────────

# has_component <name>
# Returns 0 (true) if the given component should be validated.
# When COMPONENTS is empty (no --component flags), all components are included.
# When COMPONENTS has entries, only listed components return true.
has_component() {
  local component="$1"

  # No filter set — validate everything
  if ((${#COMPONENTS[@]} == 0)); then
    return 0
  fi

  # Check if this component is in the filter list
  local existing
  for existing in "${COMPONENTS[@]}"; do
    if [[ "$existing" == "$component" ]]; then
      return 0
    fi
  done

  return 1
}

# ── Argument parsing ────────────────────────────────────────────────────────

# Supports both --flag=value and --flag value syntax for all options.
parse_args() {
  while (($# > 0)); do
    case "$1" in
      --component=*)
        COMPONENTS+=("${1#*=}")
        shift
        ;;
      --component)
        if (($# < 2)); then
          echo "Error: --component requires a value" >&2
          exit 1
        fi
        COMPONENTS+=("$2")
        shift 2
        ;;
      --name=*)
        ITEM_NAME="${1#*=}"
        shift
        ;;
      --name)
        if (($# < 2)); then
          echo "Error: --name requires a value" >&2
          exit 1
        fi
        ITEM_NAME="$2"
        shift 2
        ;;
      *)
        echo "Error: unknown argument '$1'" >&2
        exit 1
        ;;
    esac
  done
}

# ── Main execution ──────────────────────────────────────────────────────────

main() {
  parse_args "$@"

  # Step 1: Ensure AGENTS.md exists (non-fatal — we continue to catch more issues)
  require_file "$AGENTS_FILE" || true

  # Step 2: Check that required .codex/ subdirectories exist
  if has_component commands && [[ ! -d "$CODEX_DIR/commands" ]]; then
    add_issue "Missing .codex/commands directory"
  fi
  if has_component agents && [[ ! -d "$CODEX_DIR/agents" ]]; then
    add_issue "Missing .codex/agents directory"
  fi

  # Step 3: Verify every .codex file is registered in AGENTS.md
  if [[ -f "$AGENTS_FILE" ]]; then
    if has_component commands; then
      check_registered_entries "commands" "$CODEX_DIR/commands"
    fi
    if has_component agents; then
      check_registered_entries "agents" "$CODEX_DIR/agents"
    fi
  fi

  # Step 4: Check that Claude Code-specific references have been removed
  # from .codex commands (they should have been normalized during sync)
  if has_component commands; then
    local commands_target="$CODEX_DIR/commands"
    if [[ -n "$ITEM_NAME" ]]; then
      commands_target="$CODEX_DIR/commands/$ITEM_NAME.md"
    fi
    # "Claude Code" brand name should be replaced with "Codex" or generic wording
    check_no_pattern 'Claude Code' "$commands_target" ".codex command wording"
    # References to CLAUDE.md should point to AGENTS.md instead
    check_no_pattern 'CLAUDE\.md' "$commands_target" ".codex command docs references"
    # Slash-command syntax (e.g., `/plan-to-impl`) is Claude Code-specific
    check_no_pattern '`/[a-z0-9-]+`' "$commands_target" ".codex slash-command references"

    # Step 5: Extra contract checks for run-implementation.md
    check_run_implementation_contract
  fi

  # ── Report results ──────────────────────────────────────────────────────
  if ((${#issues[@]} > 0)); then
    printf 'Codex mirror validation failed with %d issue(s):\n' "${#issues[@]}" >&2
    local issue
    for issue in "${issues[@]}"; do
      printf ' - %s\n' "$issue" >&2
    done
    exit 1
  fi

  echo "Codex mirror validation passed"
}

main "$@"
