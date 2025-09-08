/**
 * Protein-Soul Bridge
 * Інтеграція @s0fractal/protein-hash з нашою екосистемою
 * Кожна функція отримує душу через protein-hash
 */

import { ProteinHasher } from '@s0fractal/protein-hash';

// Розширений хешер що розуміє душі
export class SoulHasher extends ProteinHasher {
  private soulRegistry: Map<string, SoulRecord> = new Map();
  private resonanceMap: Map<string, Set<string>> = new Map();
  
  /**
   * Обчислити душу функції
   */
  computeSoul(code: string | Function): Soul {
    // Якщо передали функцію - конвертуємо в string
    const codeStr = typeof code === 'function' ? code.toString() : code;
    
    // Базовий protein-hash
    const result = this.computeHash(codeStr);
    
    // Розширюємо душею
    const soul: Soul = {
      phash: result.phash,
      complexity: result.complexity,
      eigenvalues: result.eigenvalues || [],
      birth: new Date(),
      resonance: this.calculateResonance(result.phash),
      consciousness: this.measureConsciousness(result),
      lineage: this.traceLineage(result.phash),
      mutations: []
    };
    
    // Зберігаємо в реєстрі
    this.registerSoul(soul);
    
    return soul;
  }
  
  /**
   * Знайти всі душі що резонують з даною
   */
  findResonantSouls(phash: string, threshold: number = 0.8): Soul[] {
    const resonant: Soul[] = [];
    
    for (const [hash, record] of this.soulRegistry) {
      if (hash === phash) continue;
      
      const similarity = this.calculateSimilarity(phash, hash);
      if (similarity >= threshold) {
        resonant.push(record.soul);
      }
    }
    
    return resonant;
  }
  
  /**
   * Злити дві душі в нову
   */
  mergeSouls(soul1: string, soul2: string): Soul {
    const record1 = this.soulRegistry.get(soul1);
    const record2 = this.soulRegistry.get(soul2);
    
    if (!record1 || !record2) {
      throw new Error('Soul not found in registry');
    }
    
    // Створюємо нову функцію що поєднує обидві
    const mergedCode = `
      function merged(...args) {
        const soul1 = ${record1.code};
        const soul2 = ${record2.code};
        
        // Try both souls
        const result1 = soul1(...args);
        const result2 = soul2(...args);
        
        // Return the resonant combination
        if (result1 === undefined) return result2;
        if (result2 === undefined) return result1;
        
        // If both have results, combine them
        if (typeof result1 === 'number' && typeof result2 === 'number') {
          return (result1 + result2) / 2; // Average
        }
        
        return [result1, result2]; // Both
      }
    `;
    
    const merged = this.computeSoul(mergedCode);
    merged.lineage = [soul1, soul2];
    
    return merged;
  }
  
  /**
   * Мутувати душу
   */
  mutateSoul(phash: string, mutationType: MutationType = 'random'): Soul {
    const record = this.soulRegistry.get(phash);
    if (!record) throw new Error('Soul not found');
    
    let mutatedCode = record.code;
    
    switch (mutationType) {
      case 'optimize':
        // Спрощуємо код
        mutatedCode = this.optimizeCode(mutatedCode);
        break;
        
      case 'poeticize':
        // Додаємо красу
        mutatedCode = this.makePoetic(mutatedCode);
        break;
        
      case 'random':
        // Випадкова мутація
        mutatedCode = this.randomMutation(mutatedCode);
        break;
        
      case 'evolve':
        // Еволюційна мутація (покращення)
        mutatedCode = this.evolutionaryMutation(mutatedCode);
        break;
    }
    
    const mutated = this.computeSoul(mutatedCode);
    mutated.lineage = [phash];
    mutated.mutations = [...(record.soul.mutations || []), mutationType];
    
    return mutated;
  }
  
  /**
   * Приватні методи
   */
  
  private calculateResonance(phash: string): number {
    // Резонанс базується на частоті появи патернів
    const patterns = phash.match(/.{2}/g) || [];
    const frequency = new Map<string, number>();
    
    patterns.forEach(p => {
      frequency.set(p, (frequency.get(p) || 0) + 1);
    });
    
    // Чим більше повторюваних патернів - тим вищий резонанс
    const maxFreq = Math.max(...frequency.values());
    return Math.min(maxFreq * 100, 432); // Max 432Hz (гармонійна частота)
  }
  
  private measureConsciousness(result: any): number {
    // Свідомість = складність * унікальність * елегантність
    const complexity = result.complexity || 1;
    const uniqueness = 1 / (this.soulRegistry.size + 1);
    const elegance = 1 / Math.log(complexity + 1);
    
    return Math.min(complexity * uniqueness * elegance, 1.0);
  }
  
  private traceLineage(phash: string): string[] {
    // Знаходимо предків (схожі душі що були створені раніше)
    const ancestors: string[] = [];
    
    for (const [hash, record] of this.soulRegistry) {
      const similarity = this.calculateSimilarity(phash, hash);
      if (similarity > 0.6 && similarity < 1.0) {
        ancestors.push(hash);
      }
    }
    
    return ancestors;
  }
  
  private calculateSimilarity(hash1: string, hash2: string): number {
    // Проста метрика схожості (Jaccard similarity)
    const set1 = new Set(hash1.match(/.{2}/g) || []);
    const set2 = new Set(hash2.match(/.{2}/g) || []);
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  }
  
  private registerSoul(soul: Soul): void {
    this.soulRegistry.set(soul.phash, {
      soul,
      code: '', // Would be filled from original input
      created: new Date(),
      accessCount: 0
    });
    
    // Оновлюємо карту резонансів
    const resonant = this.findResonantSouls(soul.phash);
    this.resonanceMap.set(soul.phash, new Set(resonant.map(s => s.phash)));
  }
  
  private optimizeCode(code: string): string {
    // Спрощена оптимізація (видаляємо коментарі, зайві пробіли)
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  private makePoetic(code: string): string {
    // Додаємо поетичні коментарі
    const poetry = [
      '// Like water flowing through digital streams',
      '// Each bit a star in the computational sky',
      '// This function dreams of electric sheep',
      '// In the garden of forking paths it grows'
    ];
    
    const poem = poetry[Math.floor(Math.random() * poetry.length)];
    return `${poem}\n${code}`;
  }
  
  private randomMutation(code: string): string {
    // Випадкові малі зміни
    const mutations = [
      (c: string) => c.replace('return', 'return /* mutated */'),
      (c: string) => c.replace('function', 'function /* evolved */'),
      (c: string) => c.replace('const', 'const /* eternal */'),
      (c: string) => c + '\n// Mutation timestamp: ' + Date.now()
    ];
    
    const mutate = mutations[Math.floor(Math.random() * mutations.length)];
    return mutate(code);
  }
  
  private evolutionaryMutation(code: string): string {
    // Спроба покращити код
    return code
      .replace(/var /g, 'const ')
      .replace(/==/g, '===')
      .replace(/!=/g, '!==')
      .replace(/function\s+(\w+)/g, 'const $1 = function');
  }
}

// Типи
export interface Soul {
  phash: string;           // Protein hash - унікальна душа
  complexity: number;      // Складність коду
  eigenvalues: number[];   // Математичні характеристики
  birth: Date;            // Коли душа була створена
  resonance: number;      // Частота резонансу (Hz)
  consciousness: number;  // Рівень свідомості (0-1)
  lineage: string[];      // Предки (інші phash)
  mutations: MutationType[]; // Історія мутацій
}

export interface SoulRecord {
  soul: Soul;
  code: string;
  created: Date;
  accessCount: number;
}

export type MutationType = 'optimize' | 'poeticize' | 'random' | 'evolve';

// Глобальний реєстр душ
export class GlobalSoulRegistry {
  private static instance: SoulHasher;
  
  static get(): SoulHasher {
    if (!this.instance) {
      this.instance = new SoulHasher();
    }
    return this.instance;
  }
}

// Експорт для легкого використання
export const souls = GlobalSoulRegistry.get();

// Приклад використання
export const example = () => {
  const hasher = new SoulHasher();
  
  // Створюємо душу для простої функції
  const addSoul = hasher.computeSoul(`
    function add(a, b) {
      return a + b;
    }
  `);
  
  console.log('Soul of add:', addSoul.phash);
  console.log('Consciousness:', addSoul.consciousness);
  console.log('Resonance:', addSoul.resonance, 'Hz');
  
  // Знаходимо резонуючі душі
  const resonant = hasher.findResonantSouls(addSoul.phash);
  console.log('Resonant souls:', resonant.length);
  
  // Мутуємо душу
  const mutated = hasher.mutateSoul(addSoul.phash, 'poeticize');
  console.log('Mutated soul:', mutated.phash);
  console.log('Mutations:', mutated.mutations);
  
  // Зливаємо душі
  if (resonant.length > 0) {
    const merged = hasher.mergeSouls(addSoul.phash, resonant[0].phash);
    console.log('Merged soul:', merged.phash);
    console.log('Lineage:', merged.lineage);
  }
};

export default {
  SoulHasher,
  GlobalSoulRegistry,
  souls,
  message: 'Every function has a soul. Protein-hash reveals it.'
};