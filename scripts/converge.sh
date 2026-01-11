#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# ∞ CONVERGENCE SCRIPT ∞
#
# Migrates fragmented BiasGuard builds to unified core
#
# ∞ LOVE = LIFE = ONE ∞
# ═══════════════════════════════════════════════════════════════════

set -e

echo "∞ BiasGuard Convergence Protocol ∞"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ═══════════════════════════════════════════════════════════════════
# PHASE 1: Build core packages
# ═══════════════════════════════════════════════════════════════════

echo -e "${YELLOW}▸ Phase 1: Building core packages${NC}"

cd ~/biasguard-core

# Install dependencies
npm install

# Build all packages
npm run build

echo -e "${GREEN}✓ Core packages built${NC}"
echo ""

# ═══════════════════════════════════════════════════════════════════
# PHASE 2: Show what will be deprecated
# ═══════════════════════════════════════════════════════════════════

echo -e "${YELLOW}▸ Phase 2: Files to deprecate (manual review)${NC}"
echo ""

DEPRECATE=(
    "~/biasguard-one/"
    "~/shipped/biasguard-vscode/biasguard-one/"
    "~/shipped/biasguard-4/src/security/mcpPolicyRules.ts"
    "~/shipped/biasguard-4/src/core/types.ts"
)

for path in "${DEPRECATE[@]}"; do
    expanded=$(eval echo $path)
    if [ -e "$expanded" ]; then
        echo -e "  ${RED}✗ DEPRECATE:${NC} $path"
    else
        echo -e "  ${GREEN}✓ Already gone:${NC} $path"
    fi
done

echo ""

# ═══════════════════════════════════════════════════════════════════
# PHASE 3: Show surface updates needed
# ═══════════════════════════════════════════════════════════════════

echo -e "${YELLOW}▸ Phase 3: Surfaces to update${NC}"
echo ""

SURFACES=(
    "~/biasguard-4.2/package.json"
    "~/shipped/biasguard-4/package.json"
    "~/AbëONE-ETERNAL/mcp-servers/consciousness-continuity/package.json"
)

for path in "${SURFACES[@]}"; do
    expanded=$(eval echo $path)
    if [ -f "$expanded" ]; then
        echo -e "  ${YELLOW}→ UPDATE:${NC} $path"
        echo "    Add: \"@biasguard/security\": \"4.3.0\""
    fi
done

echo ""

# ═══════════════════════════════════════════════════════════════════
# PHASE 4: Initialize git
# ═══════════════════════════════════════════════════════════════════

echo -e "${YELLOW}▸ Phase 4: Initialize git repo${NC}"

cd ~/biasguard-core

if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "∞ BiasGuard Core v4.3.0 - ONE source of truth

- @biasguard/security: CRITICAL, BOUNDARY guards
- @biasguard/bias: 8 mirrors, cognitive/systemic patterns
- @biasguard/core: unified export

Zero drift. All surfaces. ONE version.

∞ LOVE = LIFE = ONE ∞"
    echo -e "${GREEN}✓ Git initialized${NC}"
else
    echo -e "${GREEN}✓ Git already initialized${NC}"
fi

echo ""

# ═══════════════════════════════════════════════════════════════════
# DONE
# ═══════════════════════════════════════════════════════════════════

echo "═══════════════════════════════════════════════════════════════════"
echo -e "${GREEN}∞ Convergence complete ∞${NC}"
echo ""
echo "Next steps:"
echo "  1. Review deprecated paths above"
echo "  2. Update surface package.json files"
echo "  3. Test: cd ~/biasguard-core && npm test"
echo "  4. Tag: git tag v4.3.0"
echo "  5. Push: git push origin main --tags"
echo ""
echo "∞ LOVE = LIFE = ONE ∞"
echo "═══════════════════════════════════════════════════════════════════"
