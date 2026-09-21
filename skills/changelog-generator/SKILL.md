---
name: changelog-generator
description: >-
  Auto-generate or review CHANGELOG.md files from git history using Conventional Commits.
  Use when the user asks to 'generate a changelog', 'update the changelog', 'write release
  notes', 'what changed since last release', or 'create a CHANGELOG'. Parses git log for
  Conventional Commit types (feat, fix, docs, etc.), groups them by category, formats with
  Keep a Changelog structure, and handles version bumping (major for breaking, minor for
  feat, patch for fix). DO NOT USE for commit message review (use git-commit-guard), code
  review, or general documentation (use docs-guard).
---

# Changelog Generator

Generate and maintain `CHANGELOG.md` files from git history using the **Conventional Commits** and **Keep a Changelog** standards.

## When to Activate

- When the user asks to generate, update, or review a changelog
- Before a release to summarize changes since the last tag
- When writing release notes
- When auditing what changed between versions

## Changelog Format (Keep a Changelog)

Every `CHANGELOG.md` MUST follow this structure:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- New features (from `feat:` commits)

### Changed
- Changes in existing functionality (from `refactor:`, `perf:` commits)

### Fixed
- Bug fixes (from `fix:` commits)

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Security
- Vulnerability fixes

## [1.0.0] - 2024-01-15

### Added
- Initial release with core features
```

## Commit-to-Changelog Mapping

| Commit Type | Changelog Section | Version Bump |
|---|---|---|
| `feat` | Added | Minor |
| `fix` | Fixed | Patch |
| `perf` | Changed | Patch |
| `refactor` | Changed | None |
| `docs` | — (skip) | None |
| `style` | — (skip) | None |
| `test` | — (skip) | None |
| `build` | — (skip) | None |
| `ci` | — (skip) | None |
| `chore` | — (skip) | None |
| `BREAKING CHANGE` | ⚠️ section header | **Major** |

## Workflow

### Step 1: Determine Version Range
```sh
# Find the last release tag
git describe --tags --abbrev=0

# Get commits since last tag
git log v1.2.0..HEAD --oneline
```

### Step 2: Parse Commits
Extract type, scope, and description from each Conventional Commit.

### Step 3: Group and Format
- Group by changelog section (Added, Changed, Fixed, etc.)
- Sort by scope within each group
- Include PR/issue links when available

### Step 4: Determine Version Bump
- Any `BREAKING CHANGE` → major bump
- Any `feat` → minor bump (if no breaking)
- Only `fix`/`perf` → patch bump

### Step 5: Write Entry
Prepend the new version section to `CHANGELOG.md` above `[Unreleased]`.

## Rules

1. **Never delete existing entries** — only prepend new versions
2. **Use ISO 8601 dates** — `YYYY-MM-DD` format
3. **Include links** — link version headers to diff comparisons on GitHub
4. **Keep Unreleased section** — always present at the top for ongoing work
5. **Human-readable descriptions** — rewrite terse commit subjects into clear sentences
6. **Group breaking changes** — prominently display at the top of the version section

## Anti-Patterns to Flag

- ❌ Listing every commit verbatim — summarize and group
- ❌ Missing dates on versions
- ❌ No links to diffs or issues
- ❌ Mixing unreleased and released content
- ❌ Skipping security fixes from the changelog
