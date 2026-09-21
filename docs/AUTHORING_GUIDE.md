# Skill Authoring Guide

A step-by-step guide to creating new AI skills for the **AI-Skills** repository.

---

## What Is a Skill?

A **skill** is a self-contained directory that teaches an AI coding assistant a specialized workflow. At minimum, it contains a single `SKILL.md` file with YAML frontmatter and detailed markdown instructions.

```
skills/
└── your-skill-name/
    ├── SKILL.md              # Required — main instruction file
    ├── references/           # Optional — supporting docs
    │   ├── checklist.md
    │   └── examples.md
    ├── scripts/              # Optional — helper scripts
    │   └── helper.sh
    └── agents/               # Optional — agent configs
        └── openai.yaml
```

---

## Quick Start

1. **Copy the template**
   ```sh
   cp -r templates/skill-template skills/your-skill-name
   ```

2. **Edit `SKILL.md`** — fill in the frontmatter and instructions

3. **Validate** your skill
   ```sh
   bash scripts/validate-skills.sh
   ```

4. **Submit** a pull request

---

## SKILL.md Format

### YAML Frontmatter (Required)

Every `SKILL.md` MUST start with YAML frontmatter between `---` delimiters:

```yaml
---
name: your-skill-name
description: >-
  A concise description of what this skill does and when to use it.
  Include trigger phrases like 'review this code', 'write tests', etc.
  Also include DO NOT USE guidance to prevent misuse.
---
```

| Field | Required | Description |
|---|---|---|
| `name` | ✅ | Must match the directory name exactly |
| `description` | ✅ | Multi-line description with trigger phrases and exclusions |

### Markdown Body (Required)

After the frontmatter, include detailed instructions in markdown:

```markdown
# Skill Title

Brief introduction to what this skill does.

## When to Activate

- Bullet list of trigger conditions
- Include specific user phrases

## Rules / Checklist

Detailed rules the AI should follow.

## Anti-Patterns to Flag

Common mistakes to catch.

## Output Format

How the AI should structure its response.
```

---

## Best Practices

### Naming
- Use **lowercase with hyphens**: `my-skill-name`
- Name should describe the **action**: `test-guard`, `code-refactorer`
- Guards end in `-guard`, generators in `-generator`, delegates in `-delegate`

### Description
- Start with a **verb**: "Review...", "Generate...", "Scan..."
- Include **trigger phrases** the user might say
- Include **DO NOT USE** section to prevent misactivation
- Use YAML `>-` for multi-line descriptions (folds into single line, strips trailing newline)

### Instructions
- Be **specific and actionable** — provide exact rules, not vague guidance
- Include **code examples** (✅ correct and ❌ incorrect)
- Use **checklists** for multi-step reviews
- Define the **output format** explicitly
- Reference **standards** (OWASP, Conventional Commits, etc.)

### Anti-Patterns in Skill Writing
- ❌ **Too vague** — "Write good code" → Specify exactly what "good" means
- ❌ **Too broad** — Trying to cover everything → Focus on one domain
- ❌ **No exclusions** — Not saying when NOT to use → Add DO NOT USE section
- ❌ **No examples** — Abstract rules only → Add concrete code samples
- ❌ **Contradictory rules** — "Be concise" + "Explain everything" → Pick one

---

## Directory Structure

### `references/` (Optional)
For skills with extensive rules, split into reference files:
```
references/
├── checklist.md       # Quick-reference checklist
├── examples.md        # Detailed examples
└── sources.md         # Links to official docs/standards
```

### `scripts/` (Optional)
Helper scripts that extend the skill's capabilities:
```
scripts/
└── relay.mjs          # Script for delegating to external tools
```

### `agents/` (Optional)
Configuration files for specific AI platforms:
```
agents/
└── openai.yaml        # OpenAI-specific agent configuration
```

---

## Validation

Before submitting, run the validation script:

```sh
bash scripts/validate-skills.sh
```

This checks:
- ✅ `SKILL.md` exists in every skill directory
- ✅ YAML frontmatter is valid with `---` delimiters
- ✅ `name` and `description` fields are present
- ✅ `name` matches the directory name
- ✅ Content exists after frontmatter

---

## Submission Checklist

- [ ] Skill directory uses lowercase-hyphenated naming
- [ ] `SKILL.md` has valid YAML frontmatter with `name` and `description`
- [ ] `name` matches the directory name exactly
- [ ] Description includes trigger phrases and DO NOT USE guidance
- [ ] Instructions are specific with code examples
- [ ] Anti-patterns section is included
- [ ] Output format is defined
- [ ] Validation script passes: `bash scripts/validate-skills.sh`
- [ ] README catalog is updated with the new skill
- [ ] Catalog sync check passes: `bash scripts/check-catalog-sync.sh`
