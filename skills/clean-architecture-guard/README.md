# Clean Architecture Guard

A master opencode skill combining architectural restructuring with strict clean-code quality enforcement. Use this to overhaul spaghetti code, enforce SOLID principles, move code to correct layers, AND ensure micro-level implementation has zero LLM hallucinations, perfect naming, and strict error handling.

## Installation

### Option 1: Clone into your project (recommended)

```bash
cd your-project/
git submodule add https://github.com/Salafite/Clean-architecture-guard.git skills/clean-architecture-guard
```

Then reference it in your `opencode.json` or `.opencode/skills.json`:

```json
{
  "skills": [
    {
      "name": "clean-architecture-guard",
      "location": "file://skills/clean-architecture-guard/SKILL.md"
    }
  ]
}
```

### Option 2: Copy the skill folder directly

```bash
cd your-project/
git clone https://github.com/Salafite/Clean-architecture-guard.git skills/clean-architecture-guard
rm -rf skills/clean-architecture-guard/.git
```

Then reference it in your opencode config as described above.

### Option 3: Use from any absolute path

Clone to any location on your machine and point the skill location in your opencode config:

```json
{
  "skills": [
    {
      "name": "clean-architecture-guard",
      "location": "file:///path/to/your/clone/Clean-architecture-guard/SKILL.md"
    }
  ]
}
```

## Usage

Invoke the skill in your opencode session whenever you need to:

- **Refactor existing code** into a clean layered architecture (`controllers/`, `services/`, `repositories/`, `clients/`, `models/`)
- **Review generated code** before committing or merging
- **Write new features** with strict clean-code and SOLID enforcement
- **Audit LLM-generated code** for the 14 systematic AI failure modes

The skill works in two modes:

1. **Guard-pass mode** — run it *after* code is generated to check for violations before presenting or committing
2. **Live mode** — invoke before a risky edit to guide writing with the same rules

## What's included

| File | Purpose |
|------|---------|
| `SKILL.md` | Master skill combining architecture refactoring + clean code enforcement |
| `agents/openai.yaml` | Agent display metadata |
| `references/naming-and-functions.md` | Clean Code Ch. 2 & 3 — naming, function size, parameters |
| `references/comments-and-formatting.md` | Clean Code Ch. 4 & 5 — when to comment, style matching |
| `references/solid.md` | SOLID principles with AI-specific breakage patterns |
| `references/dry-kiss-yagni.md` | DRY/KISS/YAGNI with Sandi Metz wrong-abstraction corollary |
| `references/ai-failure-modes.md` | 14 systematic LLM failure modes with research citations |
| `references/review-checklist.md` | Structured walk-through for review mode |
| `references/sources.md` | Full bibliography of cited works |

## Architecture principles enforced

- **Layered architecture** — controllers (HTTP), services (business logic), repositories (data access), clients (external APIs), models (data shapes)
- **Dependency Inversion** — calls flow inward; infrastructure never leaks upward
- **SOLID** — single responsibility, open/closed, Liskov substitution, interface segregation, dependency inversion
- **Clean Code** — intention-revealing names, tiny functions, command/query separation, no comment pollution
- **AI-specific guardrails** — no swallowed errors, no defensive guards for impossible cases, no hardcoded mock returns, no speculative abstractions

## License

MIT
