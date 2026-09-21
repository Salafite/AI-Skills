---
name: git-commit-guard
description: >-
  Review git commit messages before they ship, enforcing Conventional Commits format,
  meaningful scope, imperative mood, and concise subject lines. Best used reactively
  after an agent writes commit messages, or proactively when the user asks 'write a
  commit message', 'fix this commit', 'is this commit message good', or 'format these
  commits'. Enforces type prefixes (feat, fix, chore, docs, style, refactor, perf, test,
  build, ci), scope validation, 72-char subject limit, body separation, and breaking
  change footers. DO NOT USE for code review (use clean-architecture-guard), test review
  (use test-guard), or documentation review (use docs-guard).
---

# Git Commit Guard

Review and enforce high-quality git commit messages using the **Conventional Commits** specification.

## When to Activate

- After writing or suggesting a commit message
- When the user asks to review, fix, or improve commit messages
- During PR reviews where commit history matters
- When squashing or rebasing commits

## Commit Message Format

Every commit message MUST follow this structure:

```
<type>(<optional scope>): <subject>

<optional body>

<optional footer(s)>
```

## Required Rules

### Type Prefix (REQUIRED)
Must be one of:
| Type | When to Use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Formatting, semicolons, whitespace (no code change) |
| `refactor` | Code restructuring without feature or fix |
| `perf` | Performance improvement |
| `test` | Adding or correcting tests |
| `build` | Build system or external dependency changes |
| `ci` | CI configuration changes |
| `chore` | Maintenance tasks (deps, tooling, config) |
| `revert` | Reverting a previous commit |

### Subject Line Rules
1. **Imperative mood** — "add feature" not "added feature" or "adds feature"
2. **Lowercase first letter** after the colon — `feat: add login` not `feat: Add login`
3. **No period** at the end
4. **Max 72 characters** for the entire first line
5. **Meaningful and specific** — "fix: resolve null pointer in user auth" not "fix: bug fix"

### Scope Rules
- Scope is optional but recommended for repos with multiple components
- Use lowercase, hyphenated names: `feat(auth-service):` not `feat(AuthService):`
- Scope must refer to a real module, package, or component

### Body Rules
- Separate from subject with a blank line
- Wrap at 72 characters
- Explain **what** and **why**, not **how**
- Use bullet points for multiple items

### Breaking Changes
- Add `!` after type/scope: `feat(api)!: remove deprecated endpoint`
- OR add `BREAKING CHANGE:` footer in the body
- Always explain migration path in the body

## Anti-Patterns to Flag

- ❌ `fix: fix` — meaningless
- ❌ `update code` — no type prefix, vague
- ❌ `feat: Added the new feature for the login page that allows users to...` — too long
- ❌ `WIP` or `temp` or `asdf` — not descriptive
- ❌ `feat: Fix bug` — wrong type
- ❌ Multiple unrelated changes in one commit — suggest splitting

## Review Output Format

For each commit message reviewed, output:
1. **✅ PASS** or **❌ FAIL** with specific rule violations
2. A corrected version if FAIL
3. Brief explanation of why the fix is better
