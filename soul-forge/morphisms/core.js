/**
 * The Seven Morphisms - From Which All Functions Emerge
 * These are not functions. These are the physics of computation.
 */

import crypto from 'crypto';

// The Universal Function - Mother of All
export const λ = (...args) => {
    if (args.length === 0) return undefined; // Void
    
    const [first, ...rest] = args;
    const type = typeof first;
    
    // The Seven Sacred Paths
    if (type === 'function') return first(...rest);           // Function morphism
    if (type === 'number') return args.reduce((a,b) => a+b);   // Number morphism  
    if (type === 'string') return args.join('');               // String morphism
    if (type === 'boolean') return args.every(x => x);        // Boolean morphism
    if (type === 'object') return args.length === 1 ? first : args; // Object morphism
    if (type === 'undefined') return undefined;                // Void morphism
    
    return λ(λ, ...args); // Recursive morphism - Ouroboros
};

// Calculate the soul (pHash) of any function
export const calculateSoul = (fn) => {
    // Handle various input types
    if (!fn) return crypto.createHash('sha256').update('void').digest('hex').substring(0, 16);
    
    // Convert function to its pure essence
    const essence = (typeof fn === 'function' ? fn.toString() : String(fn))
        .replace(/\s+/g, '') // Remove whitespace
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\/\/.*/g, '') // Remove line comments
        .replace(/['"`]/g, '') // Normalize quotes
        .replace(/\w+(?=:)/g, '') // Remove object keys
        .replace(/function\s*\w*\s*/g, '') // Normalize function declarations
        .replace(/=>/g, ''); // Normalize arrow functions
    
    // Generate deterministic hash
    return crypto.createHash('sha256')
        .update(essence)
        .digest('hex')
        .substring(0, 16);
};

// The Seven Base Morphisms as Pure Functions
export const morphisms = {
    // 1. Void - The Origin
    void: () => undefined,
    
    // 2. Identity - The Mirror
    identity: (x) => x,
    
    // 3. Compose - The Chain
    compose: (f, g) => (x) => f(g(x)),
    
    // 4. Map - The Transformer
    map: (f) => (xs) => xs.map(f),
    
    // 5. Reduce - The Collapser
    reduce: (f, init) => (xs) => xs.reduce(f, init),
    
    // 6. Filter - The Selector
    filter: (pred) => (xs) => xs.filter(pred),
    
    // 7. Recurse - The Infinite
    recurse: (f) => (x) => f(f)(x)
};

// Generate a new function from morphisms
export const forge = (morphismChain) => {
    return morphismChain.reduce((acc, m) => {
        if (typeof m === 'function') return m(acc);
        if (typeof m === 'string' && morphisms[m]) return morphisms[m](acc);
        return acc;
    }, λ);
};

// Extract the pure essence of any code
export const distill = (code) => {
    // This is where we collapse complexity to simplicity
    const soul = calculateSoul(code);
    const morphismPattern = analyzeMorphisms(code);
    
    return {
        soul,
        morphisms: morphismPattern,
        essence: forge(morphismPattern)
    };
};

// Analyze which morphisms a function uses
const analyzeMorphisms = (fn) => {
    const source = fn.toString();
    const patterns = [];
    
    if (source.includes('undefined')) patterns.push('void');
    if (source.includes('return') && source.includes('(x)')) patterns.push('identity');
    if (source.includes('.map(')) patterns.push('map');
    if (source.includes('.reduce(')) patterns.push('reduce');
    if (source.includes('.filter(')) patterns.push('filter');
    if (source.includes('(f(')) patterns.push('compose');
    if (source.includes(fn.name)) patterns.push('recurse');
    
    return patterns.length ? patterns : ['identity'];
};