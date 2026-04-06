#!/usr/bin/env bash
# Sync .claude content into .codex.
#
# Usage:
#   bash scripts/sync-claude-to-codex.sh
#     Full sync of agents, commands, and skills.
#
#   bash scripts/sync-claude-to-codex.sh --component commands
#     Sync only one top-level component.
#
#   bash scripts/sync-claude-to-codex.sh --component commands --name review-to-plan
#     Sync only one named item inside a component.
#     - agents: pass the file stem, for example `validator`
#     - commands: pass the file stem, for example `review-to-plan`
#     - skills: pass the directory name, for example `lint`
#
#   bash scripts/sync-claude-to-codex.sh --component skills --dry-run
#     Show planned actions without modifying files.
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLAUDE_DIR="$ROOT_DIR/.claude"
CODEX_DIR="$ROOT_DIR/.codex"
VALIDATOR="$ROOT_DIR/scripts/validate-codex-mirror.sh"
DRY_RUN=0
ITEM_NAME=""
declare -a COMPONENTS=()

if [[ ! -d "$CLAUDE_DIR" ]]; then
  echo "Error: .claude directory not found at $CLAUDE_DIR"
  exit 1
fi

usage() {
  cat <<'EOF'
Usage: sync-claude-to-codex.sh [--component agents|commands|skills]... [--name ITEM] [--all] [--dry-run]

Options:
  --component KIND  Sync only the selected component. May be repeated.
  --name ITEM       Sync only one named item inside the selected component.
  --all             Sync agents, commands, and skills.
  --dry-run         Print planned actions without modifying files.
  -h, --help        Show this help text.
EOF
}

add_component() {
  local component="$1"

  case "$component" in
    agents|commands|skills) ;;
    *)
      echo "Error: unsupported component '$component'" >&2
      usage >&2
      exit 1
      ;;
  esac

  local existing
  for existing in "${COMPONENTS[@]}"; do
    if [[ "$existing" == "$component" ]]; then
      return 0
    fi
  done

  COMPONENTS+=("$component")
}

run_cmd() {
  if ((DRY_RUN)); then
    printf '[dry-run] '
    printf '%q ' "$@"
    printf '\n'
    return 0
  fi

  "$@"
}

normalize_agents() {
  local pattern="${1:-$CODEX_DIR/agents/*.md}"
  local file
  for file in $pattern; do
    [[ -f "$file" ]] || continue
    sed -i '/^tools:/d;/^model:/d' "$file"
    # Codex has no CLAUDE.md — point to README.md for architecture context
    sed -i 's/See CLAUDE\.md/See README.md/g' "$file"
  done
}

normalize_commands() {
  local pattern="${1:-$CODEX_DIR/commands/*.md}"
  local file
  for file in $pattern; do
    [[ -f "$file" ]] || continue
    sed -i 's/Claude Code/Codex/g' "$file"
    sed -i 's/CLAUDE\.md/README.md/g' "$file"
    sed -E -i 's#`/([a-z0-9-]+)`#`\1`#g' "$file"
  done

  if [[ -z "$ITEM_NAME" || "$ITEM_NAME" == "review-to-plan" ]] && [[ -f "$CODEX_DIR/commands/review-to-plan.md" ]]; then
    sed -i 's|`/plan-to-impl`|`plan-to-impl`|g; s|/plan-to-impl|plan-to-impl|g' \
      "$CODEX_DIR/commands/review-to-plan.md"
  fi

  if [[ -z "$ITEM_NAME" || "$ITEM_NAME" == "run-implementation" ]] && [[ -f "$CODEX_DIR/commands/run-implementation.md" ]]; then
    python3 - <<'PY' "$CODEX_DIR/commands/run-implementation.md"
from pathlib import Path
import sys

path = Path(sys.argv[1])
text = path.read_text()

needle = "Read the RUN_STATUS.md in the same directory to find the next block.\n"
bootstrap = """Read the RUN_STATUS.md in the same directory to find the next block.\nIf RUN_STATUS.md does not exist, create it before starting with this initial shape:\n\n```md\n# Implementation Run Status\n\n- Implementation file: `/absolute/path/to/IMPLEMENTATION.md`\n- Updated (UTC): <ISO-8601 timestamp>\n- Total blocks: <N>\n- Last completed block: none\n- Next block: 1\n- Last run result: not started\n- Note: Created by `run-implementation`.\n```\n"""
if "If RUN_STATUS.md does not exist, create it before starting with this initial shape:" not in text:
    text = text.replace(needle, bootstrap)

step_needle = """1. Invoke the `implementer` subagent with the current block number and\n   IMPLEMENTATION.md path.\n"""
step_replacement = """1. Invoke the `implementer` subagent with the current block number and\n   IMPLEMENTATION.md path.\n   - Use a fresh Codex session per block when possible so context stays small.\n   - Before starting the next block, confirm the current session still has\n     enough context budget to read the full IMPLEMENTATION.md, inspect the\n     target files, implement the block, and summarize the result. If not,\n     stop after updating RUN_STATUS.md and tell the user to continue in a\n     fresh session.\n"""
if "Use a fresh Codex session per block when possible so context stays small." not in text:
    text = text.replace(step_needle, step_replacement)

text = text.replace("timestamp, and current git SHA", "timestamp, and result summary")
text = text.replace(
    "Do NOT run any git commands (add, commit, push). The user will handle git manually after reviewing the changes.\n",
    "Do NOT run any git commands. The user will handle git manually after reviewing the changes.\n",
)

path.write_text(text)
PY
  fi

  if [[ -z "$ITEM_NAME" || "$ITEM_NAME" == "roadmap-to-code" ]] && [[ -f "$CODEX_DIR/commands/roadmap-to-code.md" ]]; then
    python3 - <<'PY' "$CODEX_DIR/commands/roadmap-to-code.md"
from pathlib import Path
import sys

path = Path(sys.argv[1])
text = path.read_text()

text = text.replace(
    "2. Follow all `run-implementation` rules: never skip blocks, stop on FAIL, no git commands.\n",
    "2. Follow all `run-implementation` rules: never skip blocks, stop on FAIL, no git commands, and prefer a fresh Codex session per block when context is getting large.\n",
)

path.write_text(text)
PY
  fi
}

normalize_skills() {
  local pattern="${1:-$CODEX_DIR/skills/*/SKILL.md}"
  local file
  for file in $pattern; do
    [[ -f "$file" ]] || continue
    sed -i '/^disable-model-invocation:/d;/^allowed-tools:/d' "$file"
  done
}

sync_named_item() {
  local component="$1"
  local item="$2"
  local source_path=""
  local target_path=""

  case "$component" in
    agents)
      source_path="$CLAUDE_DIR/agents/$item.md"
      target_path="$CODEX_DIR/agents/$item.md"
      ;;
    commands)
      source_path="$CLAUDE_DIR/commands/$item.md"
      target_path="$CODEX_DIR/commands/$item.md"
      ;;
    skills)
      source_path="$CLAUDE_DIR/skills/$item"
      target_path="$CODEX_DIR/skills/$item"
      ;;
  esac

  if [[ ! -e "$source_path" ]]; then
    echo "Error: source item not found: $source_path" >&2
    exit 1
  fi

  run_cmd mkdir -p "$(dirname "$target_path")"
  run_cmd rm -rf "$target_path"
  run_cmd cp -r "$source_path" "$target_path"

  if ((DRY_RUN)); then
    return 0
  fi

  case "$component" in
    agents) normalize_agents "$target_path" ;;
    commands) normalize_commands "$target_path" ;;
    skills) normalize_skills "$target_path/SKILL.md" ;;
  esac
}

sync_component() {
  local component="$1"
  local source_dir="$CLAUDE_DIR/$component"
  local target_dir="$CODEX_DIR/$component"

  if [[ ! -d "$source_dir" ]]; then
    echo "Warning: source component not found: $source_dir"
    return 0
  fi

  if [[ -n "$ITEM_NAME" ]]; then
    sync_named_item "$component" "$ITEM_NAME"
    return 0
  fi

  run_cmd mkdir -p "$CODEX_DIR"
  run_cmd rm -rf "$target_dir"
  run_cmd cp -r "$source_dir" "$CODEX_DIR/"

  if ((DRY_RUN)); then
    return 0
  fi

  case "$component" in
    agents) normalize_agents ;;
    commands) normalize_commands ;;
    skills) normalize_skills ;;
  esac
}

while (($# > 0)); do
  case "$1" in
    --component)
      if (($# < 2)); then
        echo "Error: --component requires a value" >&2
        usage >&2
        exit 1
      fi
      add_component "$2"
      shift 2
      ;;
    --name)
      if (($# < 2)); then
        echo "Error: --name requires a value" >&2
        usage >&2
        exit 1
      fi
      ITEM_NAME="$2"
      shift 2
      ;;
    --all)
      add_component agents
      add_component commands
      add_component skills
      shift
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Error: unknown argument '$1'" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if ((${#COMPONENTS[@]} == 0)); then
  COMPONENTS=(agents commands skills)
fi

if [[ -n "$ITEM_NAME" ]] && ((${#COMPONENTS[@]} != 1)); then
  echo "Error: --name requires exactly one --component" >&2
  exit 1
fi

for component in "${COMPONENTS[@]}"; do
  sync_component "$component"
done

if ((DRY_RUN)); then
  echo "Dry run complete"
elif [[ -x "$VALIDATOR" ]]; then
  validator_args=("${COMPONENTS[@]/#/--component=}")
  if [[ -n "$ITEM_NAME" ]]; then
    validator_args+=("--name=$ITEM_NAME")
  fi
  "$VALIDATOR" "${validator_args[@]}"
else
  echo "Warning: validator not found or not executable at $VALIDATOR"
fi

if [[ -n "$ITEM_NAME" ]]; then
  echo "Synced .claude -> .codex (${COMPONENTS[*]}:$ITEM_NAME)"
else
  echo "Synced .claude -> .codex (${COMPONENTS[*]})"
fi
