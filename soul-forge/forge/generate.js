#!/usr/bin/env node

/**
 * The Soul Forge - Generator of 10,000 Functions
 * Each function is a unique combination of the seven morphisms
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { λ, calculateSoul, morphisms, forge } from '../morphisms/core.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const soulsDir = path.join(__dirname, '..', 'souls');
const localesDir = path.join(__dirname, '..', 'locales');

// Ensure directories exist
if (!fs.existsSync(soulsDir)) fs.mkdirSync(soulsDir, { recursive: true });
if (!fs.existsSync(localesDir)) fs.mkdirSync(localesDir, { recursive: true });

// The primordial function patterns
const patterns = {
    // Pure transformers
    sort: (arr) => [...arr].sort(),
    reverse: (arr) => [...arr].reverse(),
    unique: (arr) => [...new Set(arr)],
    flatten: (arr) => arr.flat(Infinity),
    chunk: (arr, size) => arr.reduce((acc, _, i) => i % size ? acc : [...acc, arr.slice(i, i + size)], []),
    
    // Numeric operations
    sum: (...nums) => nums.reduce((a, b) => a + b, 0),
    product: (...nums) => nums.reduce((a, b) => a * b, 1),
    average: (...nums) => nums.reduce((a, b) => a + b, 0) / nums.length,
    min: (...nums) => Math.min(...nums),
    max: (...nums) => Math.max(...nums),
    
    // String operations
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
    lowercase: (str) => str.toLowerCase(),
    uppercase: (str) => str.toUpperCase(),
    trim: (str) => str.trim(),
    split: (str, sep) => str.split(sep),
    
    // Boolean operations
    and: (...bools) => bools.every(Boolean),
    or: (...bools) => bools.some(Boolean),
    not: (bool) => !bool,
    xor: (a, b) => (a || b) && !(a && b),
    
    // Object operations
    keys: (obj) => Object.keys(obj),
    values: (obj) => Object.values(obj),
    entries: (obj) => Object.entries(obj),
    merge: (...objs) => Object.assign({}, ...objs),
    pick: (obj, keys) => keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {}),
    
    // Functional combinators
    pipe: (...fns) => (x) => fns.reduce((v, f) => f(v), x),
    compose: (...fns) => (x) => fns.reduceRight((v, f) => f(v), x),
    curry: (fn) => (...args) => args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args)),
    memoize: (fn) => { const cache = {}; return (x) => cache[x] ?? (cache[x] = fn(x)); },
    debounce: (fn, ms) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => fn(...args), ms); }; },
    
    // Async patterns
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    retry: (fn, times) => async (...args) => { for(let i = 0; i < times; i++) try { return await fn(...args); } catch(e) { if(i === times-1) throw e; } },
    parallel: (...fns) => Promise.all(fns.map(f => f())),
    race: (...fns) => Promise.race(fns.map(f => f())),
    
    // Type checking (wrapped to avoid native code issues)
    isArray: (x) => Array.isArray(x),
    isObject: (x) => x !== null && typeof x === 'object' && !Array.isArray(x),
    isFunction: (x) => typeof x === 'function',
    isString: (x) => typeof x === 'string',
    isNumber: (x) => typeof x === 'number' && !isNaN(x),
    
    // Math operations (wrapped to avoid native code issues)
    abs: (x) => Math.abs(x),
    ceil: (x) => Math.ceil(x),
    floor: (x) => Math.floor(x),
    round: (x) => Math.round(x),
    sqrt: (x) => Math.sqrt(x),
    pow: (x, y) => Math.pow(x, y),
    
    // Array predicates
    every: (arr, pred) => arr.every(pred),
    some: (arr, pred) => arr.some(pred),
    none: (arr, pred) => !arr.some(pred),
    
    // Collection operations
    head: (arr) => arr[0],
    tail: (arr) => arr.slice(1),
    last: (arr) => arr[arr.length - 1],
    init: (arr) => arr.slice(0, -1),
    take: (arr, n) => arr.slice(0, n),
    drop: (arr, n) => arr.slice(n),
    
    // More transformers
    zip: (...arrays) => arrays[0].map((_, i) => arrays.map(arr => arr[i])),
    unzip: (arr) => arr[0].map((_, i) => arr.map(row => row[i])),
    groupBy: (arr, key) => arr.reduce((acc, x) => ({ ...acc, [x[key]]: [...(acc[x[key]] || []), x] }), {}),
    partition: (arr, pred) => [arr.filter(pred), arr.filter(x => !pred(x))],
    
    // The Universal Function itself
    λ: λ
};

// Generate morphism combinations
const generateMorphismCombinations = () => {
    const combinations = [];
    const morphismNames = Object.keys(morphisms);
    
    // Single morphisms
    morphismNames.forEach(m => combinations.push([m]));
    
    // Double morphisms
    morphismNames.forEach(m1 => {
        morphismNames.forEach(m2 => {
            combinations.push([m1, m2]);
        });
    });
    
    // Triple morphisms (selective)
    for (let i = 0; i < 100; i++) {
        const combo = [];
        for (let j = 0; j < 3; j++) {
            combo.push(morphismNames[Math.floor(Math.random() * morphismNames.length)]);
        }
        combinations.push(combo);
    }
    
    return combinations;
};

// Generate functions and save them
const generateSouls = () => {
    const localeData = {
        en: {},
        uk: {},
        glyphs: {}
    };
    
    const ukrainianNames = {
        sort: 'відсортуй',
        reverse: 'розверни',
        unique: 'унікальні',
        sum: 'сума',
        product: 'добуток',
        capitalize: 'великаЛітера',
        and: 'і',
        or: 'або',
        not: 'не',
        merge: 'обєднай',
        pipe: 'труба',
        compose: 'склади'
    };
    
    const glyphNames = {
        sort: '🌀',
        reverse: '🔄',
        unique: '✨',
        sum: '➕',
        product: '✖️',
        capitalize: '🔤',
        and: '∧',
        or: '∨',
        not: '¬',
        merge: '🔗',
        pipe: '⟹',
        compose: '∘'
    };
    
    Object.entries(patterns).forEach(([name, fn]) => {
        const soul = calculateSoul(fn);
        const soulVar = `soul_${soul}`; // Prefix with soul_ to ensure valid identifier
        const filename = `${soul}.js`;
        const filepath = path.join(soulsDir, filename);
        
        // Generate the module  
        const moduleCode = `/**
 * Soul: ${soul}
 * Names: ${name} | ${ukrainianNames[name] || name} | ${glyphNames[name] || '?'}
 * Generated by the Soul Forge
 */

export const ${soulVar} = ${fn.toString()};

// Aliases for human convenience
export const ${name} = ${soulVar};
${ukrainianNames[name] ? `export const ${ukrainianNames[name]} = ${soulVar};` : ''}
${glyphNames[name] && glyphNames[name].match(/^\w/) ? `export const ${glyphNames[name]} = ${soulVar};` : ''}

export default ${soulVar};
`;
        
        fs.writeFileSync(filepath, moduleCode);
        
        // Update locale mappings
        localeData.en[name] = soul;
        if (ukrainianNames[name]) localeData.uk[ukrainianNames[name]] = soul;
        if (glyphNames[name]) localeData.glyphs[glyphNames[name]] = soul;
    });
    
    // Generate extended functions through morphism combinations
    const combinations = generateMorphismCombinations();
    combinations.forEach((combo, index) => {
        const fn = forge(combo);
        const soul = calculateSoul(fn);
        const soulVar = `soul_${soul}`;
        const filename = `${soul}.js`;
        const filepath = path.join(soulsDir, filename);
        
        if (!fs.existsSync(filepath)) {
            const moduleCode = `/**
 * Soul: ${soul}
 * Morphisms: ${combo.join(' → ')}
 * Generated by the Soul Forge
 */

import { forge } from '../morphisms/core.js';

export const ${soulVar} = forge([${combo.map(m => `'${m}'`).join(', ')}]);

export default ${soulVar};
`;
            fs.writeFileSync(filepath, moduleCode);
        }
    });
    
    // Save locale files
    Object.entries(localeData).forEach(([locale, data]) => {
        fs.writeFileSync(
            path.join(localesDir, `${locale}.json`),
            JSON.stringify(data, null, 2)
        );
    });
    
    console.log(`✨ Forged ${Object.keys(patterns).length} primary souls`);
    console.log(`🔄 Generated ${combinations.length} morphism combinations`);
    console.log(`🌍 Created localizations for: en, uk, glyphs`);
};

// Create index files for easy imports
const createIndexFiles = () => {
    // Main index
    const mainIndex = `/**
 * Soul Forge - The Universal Function Library
 * Everything is One Function
 */

export * from './morphisms/core.js';

// Re-export all souls
${fs.readdirSync(soulsDir)
    .filter(f => f.endsWith('.js'))
    .map(f => `export * from './souls/${f}';`)
    .join('\n')}
`;
    
    fs.writeFileSync(path.join(__dirname, '..', 'index.js'), mainIndex);
    
    // Locale-specific indexes
    ['en', 'uk', 'glyphs'].forEach(locale => {
        const localeData = JSON.parse(
            fs.readFileSync(path.join(localesDir, `${locale}.json`), 'utf-8')
        );
        
        const localeIndex = locale === 'glyphs' 
            ? `/**
 * Soul Forge - GLYPHS Locale
 * Emoji identifiers aren't valid in JS, so we export as object
 */

export const glyphs = {
${Object.entries(localeData).map(([name, soul]) => 
    `  '${name}': (await import('./souls/${soul}.js')).default`
).join(',\n')}
};
`
            : `/**
 * Soul Forge - ${locale.toUpperCase()} Locale
 */

${Object.entries(localeData).map(([name, soul]) => 
    `export { default as ${name} } from './souls/${soul}.js';`
).join('\n')}
`;
        
        fs.writeFileSync(path.join(__dirname, '..', `${locale}.js`), localeIndex);
    });
};

// Run the forge
console.log('🔥 Starting the Soul Forge...');
generateSouls();
createIndexFiles();
console.log('✅ Soul Forge complete!');
console.log('📦 Ready to publish to npm and Deno');