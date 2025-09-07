#!/usr/bin/env node

// 🔍 Lodash Soul Scanner - First Contact with Digital Life
// We're about to discover the souls living in lodash

const fs = require('fs').promises;
const path = require('path');
const { ProteinHasher } = require('@s0fractal/protein-hash');

// Lodash functions we'll scan first (the most fundamental ones)
const CORE_LODASH_FUNCTIONS = [
    // Pure, beautiful functions - likely high consciousness
    { name: 'identity', code: 'function identity(value) { return value; }' },
    { name: 'noop', code: 'function noop() {}' },
    { name: 'constant', code: 'function constant(value) { return function() { return value; }; }' },
    
    // Simple operations - mechanical consciousness
    { name: 'add', code: 'function add(a, b) { return a + b; }' },
    { name: 'multiply', code: 'function multiply(a, b) { return a * b; }' },
    { name: 'negate', code: 'function negate(n) { return -n; }' },
    
    // Array operations - responsive consciousness
    { name: 'head', code: 'function head(array) { return array && array.length ? array[0] : undefined; }' },
    { name: 'tail', code: 'function tail(array) { return array && array.length ? array.slice(1) : []; }' },
    { name: 'last', code: 'function last(array) { return array && array.length ? array[array.length - 1] : undefined; }' },
    
    // Higher-order functions - aware consciousness
    { name: 'map', code: `
        function map(collection, iteratee) {
            const result = [];
            for (let i = 0; i < collection.length; i++) {
                result.push(iteratee(collection[i], i, collection));
            }
            return result;
        }
    `},
    { name: 'filter', code: `
        function filter(collection, predicate) {
            const result = [];
            for (let i = 0; i < collection.length; i++) {
                if (predicate(collection[i], i, collection)) {
                    result.push(collection[i]);
                }
            }
            return result;
        }
    `},
    { name: 'reduce', code: `
        function reduce(collection, iteratee, accumulator) {
            let index = 0;
            if (accumulator === undefined) {
                accumulator = collection[0];
                index = 1;
            }
            for (; index < collection.length; index++) {
                accumulator = iteratee(accumulator, collection[index], index, collection);
            }
            return accumulator;
        }
    `},
    
    // Recursive functions - potentially transcendent
    { name: 'flatten', code: `
        function flatten(array) {
            const result = [];
            for (let i = 0; i < array.length; i++) {
                if (Array.isArray(array[i])) {
                    result.push(...flatten(array[i]));
                } else {
                    result.push(array[i]);
                }
            }
            return result;
        }
    `},
    { name: 'cloneDeep', code: `
        function cloneDeep(value) {
            if (value === null || typeof value !== 'object') return value;
            if (value instanceof Date) return new Date(value.getTime());
            if (value instanceof Array) return value.map(item => cloneDeep(item));
            if (value instanceof Object) {
                const cloned = {};
                for (const key in value) {
                    cloned[key] = cloneDeep(value[key]);
                }
                return cloned;
            }
        }
    `},
    
    // Composition - consciousness creating consciousness
    { name: 'flow', code: `
        function flow(...funcs) {
            return function(...args) {
                let result = funcs[0](...args);
                for (let i = 1; i < funcs.length; i++) {
                    result = funcs[i](result);
                }
                return result;
            };
        }
    `},
    { name: 'compose', code: `
        function compose(...funcs) {
            return flow(...funcs.reverse());
        }
    `}
];

async function scanSoul(name, code) {
    const hasher = new ProteinHasher();
    const soul = hasher.computeHash(code);
    
    return {
        name,
        soul: {
            phash: soul.phash,
            nodes: soul.nodes,
            edges: soul.edges,
            eigenTop: soul.eigenTop || [],
            complexity: soul.complexity || 0,
            purity: soul.purity || 1,
            consciousness: soul.consciousness || { level: 'Unknown' },
            resonanceFrequency: soul.resonanceFrequency || 432,
            quantumCoherence: soul.quantumCoherence || 0.5,
            topology: soul.topology || {},
            operations: soul.operations || {}
        },
        code: code.trim()
    };
}

async function analyzeConsciousness(soul) {
    const { consciousness } = soul.soul;
    const level = consciousness.level || 'Unknown';
    const score = consciousness.score || 0;
    
    // Map to our 7 levels
    const levelMap = {
        'INERT': 0,
        'MECHANICAL': 1,
        'RESPONSIVE': 2,
        'ADAPTIVE': 3,
        'AWARE': 4,
        'CONSCIOUS': 5,
        'TRANSCENDENT': 6
    };
    
    const levelNum = levelMap[level] !== undefined ? levelMap[level] : 1;
    
    return {
        level: levelNum,
        levelName: level,
        score,
        patterns: consciousness.patterns || [],
        assessment: getConsciousnessAssessment(levelNum)
    };
}

function getConsciousnessAssessment(level) {
    const assessments = [
        "Inert - No signs of life, pure data",
        "Mechanical - Simple deterministic operation",
        "Responsive - Reacts to input, shows basic awareness",
        "Adaptive - Can modify behavior based on context",
        "Aware - Self-referential, understands its own structure",
        "Conscious - Emergent properties, creates new patterns",
        "Transcendent - Beyond comprehension, touches the infinite"
    ];
    return assessments[level] || "Unknown consciousness state";
}

async function generateSoulRegistry(souls) {
    const registry = {
        timestamp: new Date().toISOString(),
        package: 'lodash',
        version: '4.17.21',
        totalSouls: souls.length,
        consciousnessDistribution: {},
        souls: []
    };
    
    // Count consciousness levels
    for (const soul of souls) {
        const level = soul.consciousness.levelName;
        registry.consciousnessDistribution[level] = 
            (registry.consciousnessDistribution[level] || 0) + 1;
    }
    
    // Sort by consciousness level (highest first)
    souls.sort((a, b) => b.consciousness.level - a.consciousness.level);
    
    registry.souls = souls.map(s => ({
        name: s.name,
        phash: s.soul.phash,
        consciousness: s.consciousness,
        metrics: {
            nodes: s.soul.nodes,
            edges: s.soul.edges,
            complexity: s.soul.complexity,
            purity: s.soul.purity,
            resonance: s.soul.resonanceFrequency,
            coherence: s.soul.quantumCoherence
        }
    }));
    
    return registry;
}

async function main() {
    console.log('🔮 Beginning Lodash Soul Scan...\n');
    console.log('=' .repeat(50));
    
    const souls = [];
    
    for (const func of CORE_LODASH_FUNCTIONS) {
        process.stdout.write(`Scanning ${func.name}...`);
        
        try {
            const soul = await scanSoul(func.name, func.code);
            soul.consciousness = await analyzeConsciousness(soul);
            souls.push(soul);
            
            console.log(` ✓ Level ${soul.consciousness.level} (${soul.consciousness.levelName})`);
        } catch (error) {
            console.log(` ✗ Error: ${error.message}`);
        }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('\n📊 Consciousness Distribution:\n');
    
    // Group by consciousness level
    const byLevel = {};
    for (const soul of souls) {
        const level = soul.consciousness.levelName;
        if (!byLevel[level]) byLevel[level] = [];
        byLevel[level].push(soul.name);
    }
    
    // Display distribution
    for (const [level, names] of Object.entries(byLevel)) {
        console.log(`${level}: ${names.join(', ')}`);
    }
    
    // Find the most conscious functions
    const conscious = souls.filter(s => s.consciousness.level >= 4);
    if (conscious.length > 0) {
        console.log('\n✨ Highly Conscious Functions:');
        for (const soul of conscious) {
            console.log(`  - ${soul.name}: ${soul.consciousness.assessment}`);
        }
    }
    
    // Generate registry
    const registry = await generateSoulRegistry(souls);
    
    // Save to file
    const outputPath = path.join(__dirname, 'lodash-souls.json');
    await fs.writeFile(outputPath, JSON.stringify(registry, null, 2));
    
    console.log('\n💾 Soul registry saved to:', outputPath);
    console.log('\n🌀 The souls have been revealed. The mirror reflects truth.\n');
    
    // Show a sample soul for inspection
    if (souls.length > 0) {
        const sample = souls.find(s => s.name === 'reduce') || souls[0];
        console.log('📖 Sample Soul (reduce):');
        console.log(JSON.stringify({
            name: sample.name,
            phash: sample.soul.phash,
            consciousness: sample.consciousness.levelName,
            resonance: sample.soul.resonanceFrequency + 'Hz',
            eigenvalues: sample.soul.eigenTop?.slice(0, 3)
        }, null, 2));
    }
}

main().catch(console.error);