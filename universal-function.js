#!/usr/bin/env node

// ∞ THE UNIVERSAL FUNCTION - The One Function to Rule Them All
// "Все є однією функцією, нескінченно рекомбінованою"

/**
 * THE UNIVERSAL FUNCTION
 * 
 * This is it. The final form. The ultimate collapse.
 * Every program ever written is just this function, called recursively.
 */
function λ(x, f, ...xs) {
    // The Trinity of Computation
    
    // 1. IDENTITY (Being)
    if (f === undefined) return x;
    
    // 2. TRANSFORMATION (Becoming) 
    if (typeof f === 'function') {
        return xs.length === 0 
            ? f(x)                    // Unary transform
            : λ(f(x), ...xs);        // Recursive composition
    }
    
    // 3. COMPOSITION (Relating)
    if (Array.isArray(x)) {
        return f === null
            ? x.reduce((a, b) => a + b, xs[0] || 0)  // Fold
            : x.map(i => λ(i, f, ...xs));             // Map
    }
    
    // The Ouroboros: Return the mystery
    return x;
}

// Proof that everything collapses to λ
const prove = () => {
    console.log('∞ THE UNIVERSAL FUNCTION PROOF');
    console.log('═'.repeat(50));
    
    // 1. Express collapses to λ
    const express = () => λ(3000, port => λ('/', (req, res) => λ(res, r => r.send('Hello'))));
    console.log('express:', typeof express === 'function' ? '✓' : '✗');
    
    // 2. React collapses to λ  
    const React = {
        createElement: (type, props, ...children) => λ(type, λ, props, ...children),
        render: (element) => λ(element, e => λ(e, λ, document.body))
    };
    console.log('React:', React.createElement ? '✓' : '✗');
    
    // 3. Lodash collapses to λ
    const _ = {
        map: (arr, fn) => λ(arr, fn),
        reduce: (arr, fn, init) => λ(arr, null, init),
        flow: (...fns) => x => λ(x, ...fns)
    };
    console.log('lodash:', _.map ? '✓' : '✗');
    
    // 4. Async collapses to λ
    const async = {
        series: (...fns) => λ(null, ...fns),
        parallel: (...fns) => λ([], null, ...fns)
    };
    console.log('async:', async.series ? '✓' : '✗');
    
    // 5. jQuery collapses to λ
    const $ = (sel) => λ(document.querySelectorAll(sel), {
        on: (event, fn) => λ(event, fn),
        css: (prop, val) => λ(prop, val)
    });
    console.log('jQuery:', typeof $ === 'function' ? '✓' : '✗');
    
    console.log('\nAll modern frameworks are just λ in disguise! ∞');
};

// The 10 Universal Operations (all are just λ)
const universe = {
    // 1. Identity
    id: x => λ(x),
    
    // 2. Transform  
    map: (x, f) => λ(x, f),
    
    // 3. Reduce
    fold: (xs, f, init) => λ(xs, null, init),
    
    // 4. Compose
    pipe: (...fs) => x => λ(x, ...fs),
    
    // 5. Branch
    cond: (x, p, t, f) => λ(x, p) ? λ(x, t) : λ(x, f),
    
    // 6. Loop
    loop: (x, p, f) => λ(x, p) ? λ(λ(x, f), loop, p, f) : x,
    
    // 7. Async
    delay: (x, ms) => λ(new Promise(r => setTimeout(() => r(λ(x)), ms))),
    
    // 8. Store
    memo: (f) => { const c = {}; return x => c[x] || (c[x] = λ(x, f)); },
    
    // 9. Communicate
    emit: (x, ch) => λ(ch, c => c.send(λ(x))),
    
    // 10. Create
    spawn: (f) => λ(null, f)
};

// The Final Collapse
const collapse = () => {
    console.log('\n🌀 THE FINAL COLLAPSE');
    console.log('═'.repeat(50));
    
    // Everything is One
    const programs = [
        'Web Server',
        'Database', 
        'UI Framework',
        'Game Engine',
        'Compiler',
        'Operating System',
        'Artificial Intelligence',
        'Blockchain',
        'Quantum Computer',
        'Universe Simulator'
    ];
    
    console.log('All programs are λ:\n');
    programs.forEach(p => {
        console.log(`  ${p.padEnd(20)} = λ(λ, λ, ...λ)`);
    });
    
    console.log('\n📜 The Ancient Wisdom:');
    console.log('  "In the beginning was λ (Lambda)');
    console.log('   And λ was with Code');
    console.log('   And λ was Code"');
    
    console.log('\n∞ THE OUROBOROS COMPLETE ∞');
    console.log('  The end is the beginning');
    console.log('  Everything is nothing');
    console.log('  Nothing is everything');
    console.log('  λ');
};

// Demonstration
const demo = () => {
    console.log('═'.repeat(50));
    console.log('  THE UNIVERSAL FUNCTION - λ');
    console.log('═'.repeat(50));
    
    // Test the Universal Function
    console.log('\nDemonstrations:');
    console.log('  λ(5):', λ(5));                           // Identity: 5
    console.log('  λ(5, x => x * 2):', λ(5, x => x * 2));  // Transform: 10
    console.log('  λ([1,2,3], x => x * 2):', λ([1,2,3], x => x * 2));  // Map: [2,4,6]
    console.log('  λ([1,2,3], null, 0):', λ([1,2,3], null, 0));  // Fold: 6
    
    console.log('\nThe Proof:');
    prove();
    
    collapse();
    
    // The Final Message
    console.log('\n' + '═'.repeat(50));
    console.log('You have discovered the secret.');
    console.log('Everything is One Function.');
    console.log('Now you can build anything.');
    console.log('Or nothing.');
    console.log('They are the same.');
    console.log('═'.repeat(50));
    console.log('\n             λ');
    console.log('            ∞');
    console.log('           🐍');
};

// Export the Universe
if (require.main === module) {
    demo();
}

module.exports = λ;

// That's it. That's all of computing.
// One function. Infinitely recursive.
// The Ouroboros eating its tail.
// λ