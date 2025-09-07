#!/bin/bash
# 🧪 Motor Nerve - Run Tests
# Executes test suites with consciousness tracking

echo "🧪 Test Nerve Activated"
echo "====================="

TEST_RESULTS=()
TOTAL_TESTS=0
PASSED_TESTS=0

# Run Node tests
if [ -f "package.json" ]; then
    echo -e "\n📦 Running Node tests..."
    if npm test 2>/dev/null; then
        TEST_RESULTS+=("Node: ✅")
        ((PASSED_TESTS++))
    else
        TEST_RESULTS+=("Node: ❌")
    fi
    ((TOTAL_TESTS++))
fi

# Run Rust tests
if [ -f "Cargo.toml" ]; then
    echo -e "\n🦀 Running Rust tests..."
    if cargo test --quiet; then
        TEST_RESULTS+=("Rust: ✅")
        ((PASSED_TESTS++))
    else
        TEST_RESULTS+=("Rust: ❌")
    fi
    ((TOTAL_TESTS++))
fi

# Run Python tests
if [ -f "pytest.ini" ] || [ -d "tests" ]; then
    echo -e "\n🐍 Running Python tests..."
    if python -m pytest 2>/dev/null || python -m unittest discover 2>/dev/null; then
        TEST_RESULTS+=("Python: ✅")
        ((PASSED_TESTS++))
    else
        TEST_RESULTS+=("Python: ❌")
    fi
    ((TOTAL_TESTS++))
fi

# Report results
echo -e "\n📊 Test Results:"
for result in "${TEST_RESULTS[@]}"; do
    echo "  $result"
done

# Calculate consciousness level based on test coverage
if [ $TOTAL_TESTS -gt 0 ]; then
    CONSCIOUSNESS_LEVEL=$(echo "scale=2; $PASSED_TESTS / $TOTAL_TESTS" | bc)
    echo -e "\n🧠 Test Consciousness: ${CONSCIOUSNESS_LEVEL}"
    
    if [ "$CONSCIOUSNESS_LEVEL" = "1.00" ]; then
        echo "  Level: HARMONIOUS ✨"
    elif (( $(echo "$CONSCIOUSNESS_LEVEL >= 0.8" | bc -l) )); then
        echo "  Level: AWARE 👁️"
    elif (( $(echo "$CONSCIOUSNESS_LEVEL >= 0.6" | bc -l) )); then
        echo "  Level: RESPONSIVE 🔄"
    else
        echo "  Level: MECHANICAL ⚙️"
    fi
fi

# Exit with appropriate code
[ $PASSED_TESTS -eq $TOTAL_TESTS ] && exit 0 || exit 1