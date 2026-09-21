#!/usr/bin/env bash
# check-catalog-sync.sh — Verify README.md catalog matches skills/ directory
#
# Checks:
#   1. Every directory in skills/ is mentioned in README.md
#   2. Every skill linked in README.md exists as a directory in skills/
#   3. Reports orphaned entries in either direction

set -euo pipefail

SKILLS_DIR="skills"
README="README.md"
ERRORS=0

echo "🔍 Checking README ↔ skills/ catalog sync..."
echo "==============================================="
echo ""

# Collect actual skill directories
declare -a actual_skills=()
for dir in "$SKILLS_DIR"/*/; do
    [ -d "$dir" ] || continue
    actual_skills+=("$(basename "$dir")")
done

# Collect skills mentioned in README (look for links like [name](skills/name/))
declare -a readme_skills=()
while IFS= read -r skill; do
    readme_skills+=("$skill")
done < <(grep -oP '\(skills/\K[^/)]+' "$README" | sort -u)

echo "📁 Skills on disk: ${#actual_skills[@]}"
echo "📝 Skills in README: ${#readme_skills[@]}"
echo ""

# Check 1: Every skill directory is in README
echo "--- Checking: disk → README ---"
for skill in "${actual_skills[@]}"; do
    if printf '%s\n' "${readme_skills[@]}" | grep -qx "$skill"; then
        echo "  ✅ $skill — listed in README"
    else
        echo "  ❌ $skill — EXISTS on disk but MISSING from README"
        ERRORS=$((ERRORS + 1))
    fi
done

echo ""

# Check 2: Every README entry exists on disk
echo "--- Checking: README → disk ---"
for skill in "${readme_skills[@]}"; do
    if printf '%s\n' "${actual_skills[@]}" | grep -qx "$skill"; then
        echo "  ✅ $skill — exists on disk"
    else
        echo "  ❌ $skill — listed in README but MISSING from disk"
        ERRORS=$((ERRORS + 1))
    fi
done

echo ""
echo "==============================================="

if [ "$ERRORS" -gt 0 ]; then
    echo "❌ Catalog sync FAILED with $ERRORS mismatch(es)"
    echo ""
    echo "To fix:"
    echo "  • Add missing skills to README.md catalog tables"
    echo "  • Or remove orphaned README entries for deleted skills"
    exit 1
else
    echo "✅ README catalog is in sync with skills/ directory!"
    exit 0
fi
