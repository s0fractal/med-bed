#!/bin/bash
# 🔨 Motor Nerve - Build Projects
# Compiles code based on detected environment

echo "🏗️ Build Nerve Activated"
echo "======================="

BUILD_SUCCESS=0

# Detect and build TypeScript/JavaScript
if [ -f "package.json" ]; then
    echo -e "\n📦 Building Node project..."
    if [ -f "tsconfig.json" ]; then
        echo "  TypeScript detected"
        npm run build 2>/dev/null || npm run compile 2>/dev/null || tsc
        BUILD_SUCCESS=$?
    else
        echo "  JavaScript project (no build needed)"
        BUILD_SUCCESS=0
    fi
fi

# Detect and build Rust
if [ -f "Cargo.toml" ]; then
    echo -e "\n🦀 Building Rust project..."
    cargo build --release
    BUILD_SUCCESS=$?
fi

# Detect and build Python
if [ -f "setup.py" ] || [ -f "pyproject.toml" ]; then
    echo -e "\n🐍 Building Python project..."
    python -m build 2>/dev/null || python setup.py build 2>/dev/null
    BUILD_SUCCESS=$?
fi

# Report status
if [ $BUILD_SUCCESS -eq 0 ]; then
    echo -e "\n✅ Build successful"
    
    # Generate soul hash of built artifacts
    if command -v shasum > /dev/null; then
        echo -e "\n🧬 Generating build soul..."
        find . -name "*.js" -o -name "*.rs" -o -name "*.py" 2>/dev/null | \
            head -10 | \
            xargs shasum 2>/dev/null | \
            shasum | \
            cut -c1-16 > .build-soul
        echo "  Build Soul: $(cat .build-soul)"
    fi
else
    echo -e "\n❌ Build failed with code: $BUILD_SUCCESS"
fi

exit $BUILD_SUCCESS