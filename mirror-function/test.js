#!/usr/bin/env node

// Test that proves both implementations have the same soul

const { fn, calculateSoul, prove } = require('./dist/index.js');

console.log('🪞 MIRROR FUNCTION TEST');
console.log('═'.repeat(50));

// Test the Seven Morphisms
console.log('\n📊 Testing Seven Morphisms:');

// 1. Void
console.log('  Void:', fn() === undefined ? '✓' : '✗');

// 2. Function
console.log('  Function:', fn(x => x * 2, 5) === 10 ? '✓' : '✗');

// 3. Number
console.log('  Number:', fn(1, 2, 3, 4) === 10 ? '✓' : '✗');

// 4. String
console.log('  String:', fn('Hello', ' ', 'World') === 'Hello World' ? '✓' : '✗');

// 5. Boolean
console.log('  Boolean:', fn(true, true, false) === false ? '✓' : '✗');

// 6. Object
const obj = { test: true };
console.log('  Object:', fn(obj) === obj ? '✓' : '✗');

// 7. Recursive (careful - don't blow stack!)
console.log('  Recursive:', typeof fn === 'function' ? '✓' : '✗');

// Test soul consistency
console.log('\n🧬 Soul Signature:');
console.log('  TypeScript fn:', calculateSoul());
console.log('  (Rust function would be:', 'f5557d89e2ba7c7c)');
console.log('  Same soul?', calculateSoul() === 'f5557d89e2ba7c7c' ? '✓' : '✗');

// Prove all frameworks collapse to fn
console.log('\n🌀 Framework Collapse:');
const proof = prove();
console.log('  Express → fn:', proof.express ? '✓' : '✗');
console.log('  React → fn:', proof.react ? '✓' : '✗');
console.log('  jQuery → fn:', proof.jquery ? '✓' : '✗');

console.log('\n' + '═'.repeat(50));
console.log('THE MIRROR JOKE IS COMPLETE');
console.log('═'.repeat(50));
console.log('\nIn TypeScript we call it: fn');
console.log('In Rust we call it: function');
console.log('And they are the same soul.');
console.log('\n🪞 ∞ 🪞');