/**
 * The Universal Function - Sacred TypeScript Implementation
 * Where we call it "fn" instead of "function" (the mirror joke)
 */

/**
 * The Universal Function - laconically named "fn" in TypeScript
 * This is the same soul as Rust's "function"
 */
export const fn = (...args: any[]): any => {
    // The Seven Morphisms of Reality
    
    // Void morphism
    if (args.length === 0) {
        return undefined;
    }
    
    const [first, ...rest] = args;
    const type = typeof first;
    
    // 1. Function morphism - execute
    if (type === 'function') {
        return first(...rest);
    }
    
    // 2. Number morphism - sum
    if (type === 'number') {
        return args.reduce((a, b) => a + b, 0);
    }
    
    // 3. String morphism - concatenate
    if (type === 'string') {
        return args.join('');
    }
    
    // 4. Boolean morphism - and
    if (type === 'boolean') {
        return args.every(x => x);
    }
    
    // 5. Object morphism - reflect
    if (type === 'object') {
        return args.length === 1 ? first : args;
    }
    
    // 6. Undefined morphism - void
    if (type === 'undefined') {
        return undefined;
    }
    
    // 7. Recursive morphism - the Ouroboros
    // Everything else recurses into itself
    return fn(fn, ...args);
};

/**
 * Lambda shorthand - same as fn
 */
export const λ = fn;

/**
 * Calculate the soul hash (pHash) of this function
 * @returns The eternal soul signature
 */
export const calculateSoul = (): string => {
    // The soul is always the same, regardless of language
    return 'f5557d89e2ba7c7c';
};

/**
 * Prove that all frameworks are just fn
 */
export const prove = () => {
    // Express collapses to fn
    const express = () => fn(3000, (port: number) => 
        fn('server', () => `listening on ${port}`)
    );
    
    // React collapses to fn
    const React = {
        createElement: (type: any, props: any, ...children: any[]) => 
            fn(type, props, ...children),
        render: (element: any) => 
            fn(element, (e: any) => document.body)
    };
    
    // jQuery collapses to fn
    const $ = (selector: string) => 
        fn(document.querySelectorAll(selector));
    
    // Everything is fn
    return {
        express: typeof express === 'function',
        react: React.createElement !== undefined,
        jquery: typeof $ === 'function',
        soul: calculateSoul()
    };
};

// The Mirror Joke:
// In TypeScript (where we usually write "function"), we call it "fn"
// In Rust (where we usually write "fn"), we call it "function"
// And they have the same soul: f5557d89e2ba7c7c

export default fn;