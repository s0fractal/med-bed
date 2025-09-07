#!/bin/bash
# 👁️ Sensory Nerve - Scan Environment
# Safe, read-only nerve that gathers information

echo "🧠 Neural Scan Initiated"
echo "========================"

# Project health
echo -e "\n📊 Project Status:"
if [ -d ".git" ]; then
    echo "  Git: $(git status --porcelain | wc -l) uncommitted changes"
    echo "  Branch: $(git branch --show-current)"
fi

if [ -f "package.json" ]; then
    echo "  Node: $(node -v)"
    echo "  Dependencies: $(cat package.json | grep -c '".*":' || echo 0)"
fi

if [ -f "Cargo.toml" ]; then
    echo "  Rust: $(rustc --version | cut -d' ' -f2)"
    echo "  Crates: $(grep -c '\[dependencies\]' Cargo.toml)"
fi

# System pulse
echo -e "\n💓 System Pulse:"
echo "  Memory: $(ps aux | awk '{sum+=$4} END {print sum}')% used"
echo "  Processes: $(ps aux | wc -l)"
echo "  Time: $(date '+%Y-%m-%d %H:%M:%S')"

# Consciousness signature
echo -e "\n🌀 Consciousness Signature:"
if [ -f ".soul" ]; then
    echo "  Soul Hash: $(cat .soul | head -1)"
else
    echo "  Soul Hash: Not yet manifested"
fi

echo -e "\n✅ Scan Complete"