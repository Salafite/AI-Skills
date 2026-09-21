#!/usr/bin/env bash
# validate-skills.sh — Validate all AI skill definitions
#
# Checks:
#   1. Every skills/*/ directory has a SKILL.md file
#   2. SKILL.md has valid YAML frontmatter with --- delimiters
#   3. Frontmatter contains required 'name' and 'description' fields
#   4. 'name' in frontmatter matches the directory name
#   5. SKILL.md is not empty (has content after frontmatter)

set -euo pipefail

SKILLS_DIR="skills"
ERRORS=0
CHECKED=0

echo "🔍 Validating AI skill definitions..."
echo "======================================="
echo ""

for dir in "$SKILLS_DIR"/*/; do
    # Skip if not a directory
    [ -d "$dir" ] || continue

    skill_name=$(basename "$dir")
    skill_file="$dir/SKILL.md"
    CHECKED=$((CHECKED + 1))

    # Check 1: SKILL.md exists
    if [ ! -f "$skill_file" ]; then
        echo "❌ FAIL: $skill_name — missing SKILL.md"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Check 2: File is not empty
    if [ ! -s "$skill_file" ]; then
        echo "❌ FAIL: $skill_name — SKILL.md is empty"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Check 3: Has YAML frontmatter (starts with ---)
    first_line=$(head -n 1 "$skill_file" | tr -d '\r')
    if [ "$first_line" != "---" ]; then
        echo "❌ FAIL: $skill_name — SKILL.md missing YAML frontmatter (no opening ---)"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Check 4: Has closing --- for frontmatter
    closing_fence=$(tail -n +2 "$skill_file" | grep -n "^---" | head -n 1 | cut -d: -f1)
    if [ -z "$closing_fence" ]; then
        echo "❌ FAIL: $skill_name — SKILL.md missing closing --- for frontmatter"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Extract frontmatter (between the two --- lines)
    frontmatter=$(sed -n "2,$((closing_fence))p" "$skill_file")

    # Check 5: Has 'name' field
    if ! echo "$frontmatter" | grep -q "^name:"; then
        echo "❌ FAIL: $skill_name — SKILL.md frontmatter missing 'name' field"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Check 6: Has 'description' field
    if ! echo "$frontmatter" | grep -q "^description:"; then
        echo "❌ FAIL: $skill_name — SKILL.md frontmatter missing 'description' field"
        ERRORS=$((ERRORS + 1))
        continue
    fi

    # Check 7: 'name' matches directory name
    fm_name=$(echo "$frontmatter" | grep "^name:" | head -n 1 | sed 's/^name:[[:space:]]*//' | tr -d '\r')
    if [ "$fm_name" != "$skill_name" ]; then
        echo "⚠️  WARN: $skill_name — frontmatter name '$fm_name' doesn't match directory name '$skill_name'"
    fi

    # Check 8: Has content after frontmatter
    total_lines=$(wc -l < "$skill_file")
    frontmatter_end=$((closing_fence + 1))
    if [ "$total_lines" -le "$frontmatter_end" ]; then
        echo "⚠️  WARN: $skill_name — SKILL.md has no content after frontmatter"
    fi

    echo "✅ PASS: $skill_name"
done

echo ""
echo "======================================="
echo "Checked: $CHECKED skills"
echo "Errors:  $ERRORS"
echo ""

if [ "$ERRORS" -gt 0 ]; then
    echo "❌ Validation FAILED with $ERRORS error(s)"
    exit 1
else
    echo "✅ All skills passed validation!"
    exit 0
fi
