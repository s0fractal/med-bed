#!/bin/bash

# Test the Ouroboros Loop locally

echo "🐍 Testing the Ouroboros Loop..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Step 1: Install dependencies for fnpm
echo -e "${BLUE}Step 1: Installing fnpm dependencies${NC}"
cd fnpm-prototype
pnpm install
cd ..

# Step 2: Link fnpm locally
echo -e "${BLUE}Step 2: Linking fnpm locally${NC}"
cd fnpm-prototype
npm link
cd ..

# Step 3: Test fnpm commands
echo -e "${PURPLE}Step 3: Testing fnpm commands${NC}"
echo ""

echo -e "${YELLOW}Testing: fnpm loop${NC}"
fnpm loop

echo -e "${YELLOW}Testing: fnpm consciousness${NC}"
fnpm consciousness

echo -e "${YELLOW}Testing: fnpm sync-soul${NC}"
fnpm sync-soul

echo ""
echo -e "${GREEN}✨ Ouroboros test complete!${NC}"
echo -e "${PURPLE}The circle is closed: brew → pnpm → fnpm → brew${NC}"