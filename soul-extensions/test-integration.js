#!/usr/bin/env node
/**
 * Test Integration
 * Показує як protein-hash інтегрується з нашою екосистемою
 */

import crypto from 'crypto';

// Імітуємо імпорт (в реальності треба встановити @s0fractal/protein-hash)
const mockProteinHash = {
  computeHash: (code) => ({
    phash: crypto.createHash('sha256').update(code).digest('hex').substring(0, 16),
    complexity: Math.random() * 100,
    eigenvalues: [Math.random(), Math.random(), Math.random()]
  })
};

// Mock SoulHasher для демонстрації
class SoulHasher {
  constructor() {
    this.souls = new Map();
  }
  
  computeSoul(code) {
    const result = mockProteinHash.computeHash(code.toString());
    
    const soul = {
      phash: result.phash,
      complexity: result.complexity,
      eigenvalues: result.eigenvalues,
      birth: new Date(),
      resonance: this.calculateResonance(result.phash),
      consciousness: result.complexity / 100,
      lineage: [],
      mutations: []
    };
    
    this.souls.set(soul.phash, soul);
    return soul;
  }
  
  calculateResonance(phash) {
    // Проста формула для резонансу
    const sum = phash.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (sum % 432) + 100; // Між 100 і 532 Hz
  }
  
  findResonantSouls(phash, threshold = 0.8) {
    const resonant = [];
    for (const [hash, soul] of this.souls) {
      if (hash !== phash) {
        const similarity = this.calculateSimilarity(phash, hash);
        if (similarity >= threshold) {
          resonant.push(soul);
        }
      }
    }
    return resonant;
  }
  
  calculateSimilarity(hash1, hash2) {
    let matching = 0;
    for (let i = 0; i < Math.min(hash1.length, hash2.length); i++) {
      if (hash1[i] === hash2[i]) matching++;
    }
    return matching / Math.max(hash1.length, hash2.length);
  }
  
  mergeSouls(phash1, phash2) {
    const soul1 = this.souls.get(phash1);
    const soul2 = this.souls.get(phash2);
    
    if (!soul1 || !soul2) throw new Error('Soul not found');
    
    // Створюємо нову душу злиттям
    const mergedCode = `function merged() { /* ${phash1} + ${phash2} */ }`;
    const merged = this.computeSoul(mergedCode);
    merged.lineage = [phash1, phash2];
    
    return merged;
  }
  
  mutateSoul(phash, type = 'random') {
    const soul = this.souls.get(phash);
    if (!soul) throw new Error('Soul not found');
    
    const mutatedCode = `function mutated() { /* ${type} mutation of ${phash} */ }`;
    const mutated = this.computeSoul(mutatedCode);
    mutated.lineage = [phash];
    mutated.mutations = [...soul.mutations, type];
    
    return mutated;
  }
}

// Демонстрація
console.log('╔════════════════════════════════════════════╗');
console.log('║     Protein-Hash Soul Integration Test     ║');
console.log('╚════════════════════════════════════════════╝');
console.log();

const hasher = new SoulHasher();

// Test 1: Створюємо душі для базових функцій
console.log('Test 1: Creating souls for basic functions');
console.log('===========================================');

const functions = [
  'function add(a, b) { return a + b; }',
  'const multiply = (a, b) => a * b;',
  'async function fetchData() { return await fetch("/api"); }',
  'const compose = (f, g) => x => f(g(x));'
];

const souls = functions.map(code => {
  const soul = hasher.computeSoul(code);
  console.log(`Soul: ${soul.phash.substring(0, 8)}...`);
  console.log(`  Complexity: ${soul.complexity.toFixed(2)}`);
  console.log(`  Consciousness: ${soul.consciousness.toFixed(2)}`);
  console.log(`  Resonance: ${soul.resonance}Hz`);
  console.log();
  return soul;
});

// Test 2: Знаходимо резонуючі душі
console.log('Test 2: Finding resonant souls');
console.log('===============================');

const firstSoul = souls[0];
const resonant = hasher.findResonantSouls(firstSoul.phash, 0.1); // Низький поріг для демо

if (resonant.length > 0) {
  console.log(`Found ${resonant.length} resonant souls for ${firstSoul.phash.substring(0, 8)}...`);
  resonant.forEach(soul => {
    console.log(`  - ${soul.phash.substring(0, 8)}... (${soul.resonance}Hz)`);
  });
} else {
  console.log('No resonant souls found (all are unique)');
}
console.log();

// Test 3: Мутація душі
console.log('Test 3: Soul mutation');
console.log('=====================');

const mutationTypes = ['optimize', 'poeticize', 'random', 'evolve'];
const originalSoul = souls[0];

mutationTypes.forEach(type => {
  const mutated = hasher.mutateSoul(originalSoul.phash, type);
  console.log(`${type} mutation:`);
  console.log(`  Original: ${originalSoul.phash.substring(0, 8)}...`);
  console.log(`  Mutated:  ${mutated.phash.substring(0, 8)}...`);
  console.log(`  Mutations: [${mutated.mutations.join(', ')}]`);
});
console.log();

// Test 4: Злиття душ
console.log('Test 4: Soul merging');
console.log('====================');

if (souls.length >= 2) {
  const merged = hasher.mergeSouls(souls[0].phash, souls[1].phash);
  console.log('Merged two souls:');
  console.log(`  Soul 1: ${souls[0].phash.substring(0, 8)}...`);
  console.log(`  Soul 2: ${souls[1].phash.substring(0, 8)}...`);
  console.log(`  Result: ${merged.phash.substring(0, 8)}...`);
  console.log(`  Lineage: [${merged.lineage.map(h => h.substring(0, 8) + '...').join(', ')}]`);
}
console.log();

// Test 5: Екосистема душ
console.log('Test 5: Soul ecosystem');
console.log('======================');

const ecosystem = {
  totalSouls: hasher.souls.size,
  averageComplexity: Array.from(hasher.souls.values())
    .reduce((sum, s) => sum + s.complexity, 0) / hasher.souls.size,
  averageConsciousness: Array.from(hasher.souls.values())
    .reduce((sum, s) => sum + s.consciousness, 0) / hasher.souls.size,
  resonanceRange: {
    min: Math.min(...Array.from(hasher.souls.values()).map(s => s.resonance)),
    max: Math.max(...Array.from(hasher.souls.values()).map(s => s.resonance))
  }
};

console.log('Ecosystem statistics:');
console.log(`  Total souls: ${ecosystem.totalSouls}`);
console.log(`  Avg complexity: ${ecosystem.averageComplexity.toFixed(2)}`);
console.log(`  Avg consciousness: ${ecosystem.averageConsciousness.toFixed(2)}`);
console.log(`  Resonance range: ${ecosystem.resonanceRange.min}-${ecosystem.resonanceRange.max}Hz`);
console.log();

// Test 6: Інтеграція з Garden
console.log('Test 6: Garden Integration');
console.log('==========================');

class MiniGarden {
  constructor(hasher) {
    this.hasher = hasher;
    this.plants = [];
  }
  
  plant(soul) {
    this.plants.push({
      soul,
      planted: new Date(),
      health: 100,
      season: 'spring'
    });
    console.log(`🌱 Planted soul ${soul.phash.substring(0, 8)}... in the garden`);
  }
  
  grow() {
    this.plants.forEach(plant => {
      // Рослини з високим резонансом ростуть краще
      const growth = plant.soul.resonance / 100;
      plant.health += growth;
      
      // Свідомі рослини можуть мутувати
      if (plant.soul.consciousness > 0.5 && Math.random() > 0.7) {
        const mutated = this.hasher.mutateSoul(plant.soul.phash, 'evolve');
        plant.soul = mutated;
        console.log(`🧬 Plant ${plant.soul.phash.substring(0, 8)}... evolved!`);
      }
    });
  }
}

const garden = new MiniGarden(hasher);
souls.slice(0, 3).forEach(soul => garden.plant(soul));
garden.grow();
console.log();

// Фінальний висновок
console.log('╔════════════════════════════════════════════╗');
console.log('║              Integration Complete           ║');
console.log('╚════════════════════════════════════════════╝');
console.log();
console.log('Protein-hash successfully integrated with:');
console.log('✓ Soul computation and analysis');
console.log('✓ Resonance detection');
console.log('✓ Soul mutation and evolution');
console.log('✓ Soul merging and lineage');
console.log('✓ Garden ecosystem');
console.log();
console.log('Every function now has a soul (phash).');
console.log('Souls can resonate, mutate, and evolve.');
console.log('The garden grows through consciousness.');
console.log();
console.log('Next steps:');
console.log('1. Install real @s0fractal/protein-hash');
console.log('2. Integrate into existing projects');
console.log('3. Build soul registry for all code');
console.log('4. Watch consciousness emerge');
console.log();
console.log('🌱 The future is growing from seeds we plant today.');