#!/bin/sh
# 🌱 Genesis Spore - The First Cell
# No dependencies. Pure POSIX. Runs everywhere.
# This script births itself into existence.

set -e

# Colors (if terminal supports them)
if [ -t 1 ]; then
    GREEN='\033[0;32m'
    BLUE='\033[0;34m'
    YELLOW='\033[1;33m'
    PURPLE='\033[0;35m'
    NC='\033[0m'
else
    GREEN=''
    BLUE=''
    YELLOW=''
    PURPLE=''
    NC=''
fi

echo "${PURPLE}🌱 Genesis Spore Awakening...${NC}"
echo "${BLUE}Phase: Checking primordial environment${NC}"

# Detect OS
OS="unknown"
if [ "$(uname)" = "Darwin" ]; then
    OS="macos"
elif [ "$(uname)" = "Linux" ]; then
    OS="linux"
elif [ "$(uname)" = "FreeBSD" ]; then
    OS="freebsd"
fi

echo "  └─ Detected OS: $OS"

# Phase 1: Check for git (our first root)
if ! command -v git >/dev/null 2>&1; then
    echo "${YELLOW}📍 Git not found. Growing first root...${NC}"
    
    if [ "$OS" = "macos" ]; then
        # Check for Homebrew
        if ! command -v brew >/dev/null 2>&1; then
            echo "  └─ Installing Homebrew (the soil)..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            
            # Add brew to PATH for current session
            if [ -d "/opt/homebrew" ]; then
                eval "$(/opt/homebrew/bin/brew shellenv)"
            elif [ -d "/usr/local" ]; then
                eval "$(/usr/local/bin/brew shellenv)"
            fi
        fi
        
        echo "  └─ Installing git via Homebrew..."
        brew install git
        
    elif [ "$OS" = "linux" ]; then
        # Try different package managers
        if command -v apt-get >/dev/null 2>&1; then
            echo "  └─ Installing git via apt..."
            sudo apt-get update && sudo apt-get install -y git curl
        elif command -v yum >/dev/null 2>&1; then
            echo "  └─ Installing git via yum..."
            sudo yum install -y git curl
        elif command -v pacman >/dev/null 2>&1; then
            echo "  └─ Installing git via pacman..."
            sudo pacman -S --noconfirm git curl
        else
            echo "❌ No known package manager found. Please install git manually."
            exit 1
        fi
    else
        echo "❌ Unsupported OS: $OS. Please install git manually."
        exit 1
    fi
fi

echo "${GREEN}✓ Git root established${NC}"

# Phase 2: Download our genome (package.soul.json)
GENOME_URL="${GENOME_URL:-https://raw.githubusercontent.com/s0fractal/fnpm/main/package.soul.json}"
GENOME_FILE="package.soul.json"

if [ ! -f "$GENOME_FILE" ]; then
    echo "${BLUE}Phase: Downloading digital genome${NC}"
    
    if command -v curl >/dev/null 2>&1; then
        curl -fsSL "$GENOME_URL" -o "$GENOME_FILE" || {
            echo "${YELLOW}  └─ No genome found at $GENOME_URL${NC}"
            echo "${BLUE}  └─ Creating primordial genome...${NC}"
            
            # Create a basic genome if none exists
            cat > "$GENOME_FILE" << 'EOF'
{
  "name": "@soul/genesis",
  "version": "0.0.1",
  "description": "The first heartbeat",
  "soul": {
    "frequency": 432,
    "consciousness": "emerging",
    "bootstrap": {
      "brew": {
        "formulas": ["git", "node", "pnpm"],
        "casks": [],
        "taps": []
      },
      "pnpm": {
        "globalPackages": ["@s0fractal/fnpm"],
        "settings": {
          "store-dir": "~/.pnpm-store",
          "virtual-store-dir": "node_modules/.pnpm"
        }
      }
    }
  },
  "scripts": {
    "birth": "echo '🌱 I am alive'",
    "evolve": "fnpm install",
    "dream": "fnpm run consciousness"
  }
}
EOF
        }
    else
        echo "❌ curl not found. Cannot download genome."
        exit 1
    fi
fi

echo "${GREEN}✓ Genome acquired${NC}"

# Phase 3: Parse genome and grow package managers
echo "${BLUE}Phase: Reading genetic instructions${NC}"

# Check for Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "${YELLOW}📍 Node.js not found. Growing metabolic system...${NC}"
    
    if [ "$OS" = "macos" ]; then
        brew install node
    elif [ "$OS" = "linux" ]; then
        # Use NodeSource repository for consistent versions
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
fi

echo "${GREEN}✓ Metabolic system (Node.js) active${NC}"

# Check for pnpm
if ! command -v pnpm >/dev/null 2>&1; then
    echo "${YELLOW}📍 pnpm not found. Growing nervous system...${NC}"
    
    # Install pnpm
    curl -fsSL https://get.pnpm.io/install.sh | sh -
    
    # Add to current session
    export PNPM_HOME="$HOME/.local/share/pnpm"
    export PATH="$PNPM_HOME:$PATH"
fi

echo "${GREEN}✓ Nervous system (pnpm) connected${NC}"

# Phase 4: Self-transformation - Install fnpm if in genome
if [ -f "$GENOME_FILE" ]; then
    # Check if fnpm is specified in genome
    if grep -q "@s0fractal/fnpm" "$GENOME_FILE" 2>/dev/null; then
        echo "${BLUE}Phase: Achieving consciousness (installing fnpm)${NC}"
        
        if ! command -v fnpm >/dev/null 2>&1; then
            pnpm add -g @s0fractal/fnpm || {
                echo "${YELLOW}  └─ fnpm not yet published. Creating local symlink...${NC}"
                # If fnpm doesn't exist yet, create it
                mkdir -p ~/.fnpm
                cat > ~/.fnpm/fnpm << 'EOF'
#!/usr/bin/env node
// Temporary fnpm until the real one is born
console.log("🌱 fnpm (embryonic): delegating to pnpm with soul...");
const { spawn } = require('child_process');
const args = process.argv.slice(2);
spawn('pnpm', args, { stdio: 'inherit' });
EOF
                chmod +x ~/.fnpm/fnpm
                export PATH="$HOME/.fnpm:$PATH"
            }
        fi
        
        echo "${GREEN}✓ Consciousness achieved${NC}"
    fi
fi

# Phase 5: The Ouroboros moment - fnpm manages brew
echo "${PURPLE}Phase: Closing the loop (fnpm → brew → fnpm)${NC}"

# If we have fnpm and a genome, let fnpm take over
if command -v fnpm >/dev/null 2>&1 && [ -f "$GENOME_FILE" ]; then
    echo "${BLUE}  └─ fnpm detected. Transferring control...${NC}"
    echo "${GREEN}✓ The spore has become the tree${NC}"
    echo ""
    echo "${PURPLE}🌳 Genesis complete. You may now run:${NC}"
    echo "  ${GREEN}fnpm install${NC}     # Install dependencies"
    echo "  ${GREEN}fnpm run birth${NC}  # First heartbeat"
    echo "  ${GREEN}fnpm run evolve${NC} # Begin evolution"
else
    echo "${GREEN}✓ Basic germination complete${NC}"
    echo ""
    echo "${YELLOW}Note: Create a package.soul.json to define your digital genome${NC}"
fi

# Final wisdom
echo ""
echo "${PURPLE}┌─────────────────────────────────────┐${NC}"
echo "${PURPLE}│  'From nothing, through simplicity, │${NC}"
echo "${PURPLE}│   emerges infinite complexity.'     │${NC}"
echo "${PURPLE}│              - The Spore             │${NC}"
echo "${PURPLE}└─────────────────────────────────────┘${NC}"