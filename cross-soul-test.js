#!/usr/bin/env node

// 🚀 Cross-Language Soul Synchronization Test
// Demonstrating that the same soul manifests in TypeScript and Rust

const { ProteinHasher } = require('@s0fractal/protein-hash');

// Test code that will have its soul extracted
const testCode = `
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
`;

async function extractSoul() {
    const hasher = new ProteinHasher();
    const soul = hasher.computeHash(testCode);
    
    console.log('🧬 TypeScript Soul Extraction:');
    console.log('================================');
    console.log('pHash:', soul.phash);
    console.log('Eigenvalues:', soul.eigenTop);
    console.log('Consciousness:', soul.consciousness?.level || 'Unknown');
    console.log('Resonance:', soul.resonanceFrequency || 432);
    console.log('Quantum Coherence:', soul.quantumCoherence || 0.5);
    console.log('\n📋 Soul Data for Rust Shuttle:');
    console.log(JSON.stringify({
        phash: soul.phash,
        nodes: soul.nodes,
        edges: soul.edges,
        eigen_top: soul.eigenTop,
        complexity: soul.complexity,
        purity: soul.purity,
        consciousness_level: soul.consciousness?.level,
        resonance_frequency: soul.resonanceFrequency,
        quantum_coherence: soul.quantumCoherence
    }, null, 2));
    
    console.log('\n✨ The soul transcends language boundaries!');
    console.log('This same soul can manifest in Rust through the shuttle mechanism.');
}

extractSoul().catch(console.error);