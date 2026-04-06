# Repository Guidelines

## Project Structure & Module Organization
This repository is documentation-first. Product ideas live in [`docs/ideas/`](./docs/ideas), implementation-ready specs live in [`docs/roadmap/`](./docs/roadmap), and automation lives in [`scripts/`](./scripts). The `.claude/` tree is the source of truth for agent prompts, commands, and skills; `.codex/` is the normalized mirror used by Codex. When adding a roadmap item, use a short kebab-case filename such as `daily-summary.md` and include frontmatter with `status`, `created`, and dependency metadata.

## Build, Test, and Development Commands
There is no application runtime in this repository yet; the main workflow is script-driven.

- `bash scripts/sync-claude-to-codex.sh`: copy `.claude` content into `.codex` and normalize it.
- `bash scripts/validate-codex-mirror.sh`: verify the mirror and confirm `AGENTS.md` registrations exist.
- `node scripts/generate-roadmap-board.js`: rebuild `docs/roadmap/board.html` from roadmap markdown.
- `bash scripts/create-project.sh my-app`: scaffold the downstream Node/React monorepo described by the roadmap docs.

Run commands from the repository root.

## Coding Style & Naming Conventions
Shell scripts should use `bash`, `set -euo pipefail`, and small helper functions for repeated logic. JavaScript in `scripts/` is ESM-style Node code with single quotes and clear function names like `extractStatus` or `normalizeStatus`. Keep markdown headings shallow, prefer short sections, and use kebab-case for roadmap filenames, command names, and agent IDs.

## Testing Guidelines
Testing is lightweight and repo-specific. Treat `bash scripts/validate-codex-mirror.sh` as the required check after editing `.codex/`, `.claude/`, or this file. Re-run `node scripts/generate-roadmap-board.js` after changing roadmap statuses or adding new roadmap docs, then inspect the generated board. No formal coverage threshold is defined.

## Commit & Pull Request Guidelines
Git history is not available in this workspace, so follow a simple convention: use short imperative commit subjects such as `Add roadmap board generator` or `Update Codex mirror validation`. Pull requests should summarize the change, list affected directories, and include screenshots when `docs/roadmap/board.html` or other rendered artifacts change.

## Codex Registry
These registrations are required by `scripts/validate-codex-mirror.sh`.

- decompose-idea: .codex/commands/decompose-idea.md
- plan-to-impl: .codex/commands/plan-to-impl.md
- process-roadmap-queue: .codex/commands/process-roadmap-queue.md
- review-to-plan: .codex/commands/review-to-plan.md
- roadmap-to-code: .codex/commands/roadmap-to-code.md
- run-implementation: .codex/commands/run-implementation.md
- setup-supabase: .codex/commands/setup-supabase.md
- validate-roadmap: .codex/commands/validate-roadmap.md
- deepgram-reviewer: .codex/agents/deepgram-reviewer.md
- implementer: .codex/agents/implementer.md
- java-spring-architect: .codex/agents/java-spring-architect.md
- openai-pipeline-reviewer: .codex/agents/openai-pipeline-reviewer.md
- playwright-tester: .codex/agents/playwright-tester.md
- security-reviewer: .codex/agents/security-reviewer.md
- typescript-quality: .codex/agents/typescript-quality.md
- ui-designer: .codex/agents/ui-designer.md
- ux-accessibility-reviewer: .codex/agents/ux-accessibility-reviewer.md
- validator: .codex/agents/validator.md
- websocket-audio-reviewer: .codex/agents/websocket-audio-reviewer.md
