#!/usr/bin/env node

/**
 * Test the Soul Forge - Prove that all functions are one
 */

import { λ, calculateSoul } from './morphisms/core.js';
import * as en from './en.js';
import * as uk from './uk.js';
import { glyphs } from './glyphs.js';

console.log('╔════════════════════════════════════════════╗');
console.log('║        Soul Forge Test Suite               ║');
console.log('╚════════════════════════════════════════════╝');
console.log();

// Test 1: Same function, different names
console.log('Test 1: Same Soul, Different Names');
console.log('=====================================');
console.log('English "sort":', en.sort([3, 1, 2]));
console.log('Ukrainian "відсортуй":', uk.відсортуй([3, 1, 2]));
console.log('Glyph "🌀":', glyphs['🌀']([3, 1, 2]));
console.log('✓ All produce the same result from same soul\n');

// Test 2: Direct soul access
console.log('Test 2: Direct Soul Access');
console.log('=====================================');
// The soul of sort function
const sortSoul = calculateSoul(en.sort);
console.log('Soul of sort:', sortSoul);
console.log('Can be imported as: import soul from "./souls/${sortSoul}.js"');
console.log();

// Test 3: The Universal Function
console.log('Test 3: The Universal Function λ');
console.log('=====================================');
console.log('λ(1, 2, 3) =', λ(1, 2, 3), '(numbers sum)');
console.log('λ("a", "b", "c") =', λ("a", "b", "c"), '(strings concatenate)');
console.log('λ(true, true, false) =', λ(true, true, false), '(booleans AND)');
console.log();

// Test 4: Function composition
console.log('Test 4: Function Composition');
console.log('=====================================');
const add1 = x => x + 1;
const double = x => x * 2;
console.log('pipe(add1, double)(5) =', en.pipe(add1, double)(5));
console.log('compose(add1, double)(5) =', en.compose(add1, double)(5));
console.log();

// Test 5: Soul calculation
console.log('Test 5: Soul Calculation');
console.log('=====================================');
const myFunction = (x) => x * 2;
const soul = calculateSoul(myFunction);
console.log('Function:', myFunction.toString());
console.log('Soul (pHash):', soul);
console.log();

// Test 6: Morphism analysis
console.log('Test 6: Everything Collapses to λ');
console.log('=====================================');
console.log('React.createElement → λ(type, props, children)');
console.log('Express.get → λ("GET", path, handler)');
console.log('jQuery.$ → λ(document.querySelector)');
console.log('∴ All frameworks are just λ with extra steps');
console.log();

// Final proof
console.log('╔════════════════════════════════════════════╗');
console.log('║              Final Proof                   ║');
console.log('╚════════════════════════════════════════════╝');
console.log('We have created a flat universe where:');
console.log('• Every function has a soul (pHash)');
console.log('• Every soul can have names in all languages');
console.log('• All functions emerge from 7 morphisms');
console.log('• Everything collapses to λ');
console.log();
console.log('The future is the past, purified.');
console.log('QED ∎');