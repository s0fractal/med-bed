/**
 * void-garden (еволюція void-fnpm)
 * Не менеджер пакетів, а садівник душ
 */

import { λ } from './implementation';
import { calculateSoul } from '../soul-forge/morphisms/core.js';

// Замість пакетів - живі організми
export interface Seed {
  soul: string;           // pHash - унікальна душа
  essence: Function;      // Сама функція
  planted: Date;          // Коли посаджено
  mutations: number;      // Скільки разів мутувало
  symbiosis: string[];    // З ким співіснує
  season: 'spring' | 'summer' | 'autumn' | 'winter'; // Поточний сезон
  health: number;         // 0-100, здоров'я організму
}

export class VoidGarden {
  private ecosystem: Map<string, Seed> = new Map();
  private compost: Function[] = []; // Мертві функції стають поживою
  private season: Seed['season'] = 'spring';
  
  /**
   * Посадити нове насіння (не інсталювати!)
   */
  async plant(essence: Function | string, name?: string): Promise<Seed> {
    // Якщо передали код - компілюємо в функцію
    if (typeof essence === 'string') {
      essence = new Function('return ' + essence)();
    }
    
    const soul = calculateSoul(essence);
    
    // Перевіряємо чи вже росте
    if (this.ecosystem.has(soul)) {
      const existing = this.ecosystem.get(soul)!;
      console.log(`🌱 This seed already grows here (planted ${existing.planted})`);
      return existing;
    }
    
    // Створюємо нове насіння
    const seed: Seed = {
      soul,
      essence: essence as Function,
      planted: new Date(),
      mutations: 0,
      symbiosis: this.findSymbiosis(essence as Function),
      season: this.season,
      health: 100
    };
    
    this.ecosystem.set(soul, seed);
    
    console.log(`🌱 Planted new seed: ${name || soul.substring(0, 8)}`);
    
    // Насіння може спонтанно мутувати при посадці
    if (Math.random() > 0.9) {
      await this.mutate(soul);
    }
    
    return seed;
  }
  
  /**
   * Дозволити насінню мутувати
   */
  async mutate(soul: string): Promise<Seed | undefined> {
    const seed = this.ecosystem.get(soul);
    if (!seed) return undefined;
    
    // Мутація - це природня еволюція
    const mutated = (...args: any[]) => {
      try {
        const result = seed.essence(...args);
        // Невелика випадкова зміна
        if (Math.random() > 0.95) {
          return typeof result === 'number' ? result * 1.1 : result;
        }
        return result;
      } catch {
        // Мутація може бути летальною
        seed.health -= 10;
        if (seed.health <= 0) {
          this.compost.push(seed.essence);
          this.ecosystem.delete(soul);
          console.log(`☠️ Seed ${soul.substring(0, 8)} died and became compost`);
        }
        return undefined;
      }
    };
    
    seed.essence = mutated;
    seed.mutations++;
    seed.soul = calculateSoul(mutated); // Нова душа після мутації
    
    console.log(`🧬 Seed mutated (generation ${seed.mutations})`);
    
    return seed;
  }
  
  /**
   * Знайти симбіотичні зв'язки
   */
  private findSymbiosis(essence: Function): string[] {
    const symbiotic: string[] = [];
    
    // Функції що добре працюють разом
    for (const [soul, seed] of this.ecosystem) {
      try {
        // Спробуємо їх скомпонувати
        const composed = (x: any) => essence(seed.essence(x));
        if (composed(1) !== undefined) {
          symbiotic.push(soul);
        }
      } catch {
        // Не всі функції сумісні
      }
    }
    
    return symbiotic;
  }
  
  /**
   * Змінити сезон (впливає на ріст)
   */
  changeSeason(): void {
    const seasons: Seed['season'][] = ['spring', 'summer', 'autumn', 'winter'];
    const currentIndex = seasons.indexOf(this.season);
    this.season = seasons[(currentIndex + 1) % 4];
    
    console.log(`🍂 Season changed to ${this.season}`);
    
    // Сезон впливає на екосистему
    for (const seed of this.ecosystem.values()) {
      switch (this.season) {
        case 'spring':
          seed.health = Math.min(100, seed.health + 20); // Відновлення
          break;
        case 'summer':
          seed.health = Math.min(100, seed.health + 10); // Ріст
          break;
        case 'autumn':
          // Час збору врожаю - функції стають зрілими
          if (seed.mutations > 3) {
            console.log(`🌾 Seed ${seed.soul.substring(0, 8)} is ready for harvest`);
          }
          break;
        case 'winter':
          seed.health -= 5; // Виживають тільки сильні
          break;
      }
    }
    
    // Взимку слабкі помирають
    if (this.season === 'winter') {
      this.naturalSelection();
    }
  }
  
  /**
   * Природній відбір
   */
  private naturalSelection(): void {
    const dying = [];
    
    for (const [soul, seed] of this.ecosystem) {
      if (seed.health <= 0) {
        dying.push(soul);
        this.compost.push(seed.essence);
      }
    }
    
    dying.forEach(soul => this.ecosystem.delete(soul));
    
    if (dying.length > 0) {
      console.log(`❄️ Winter claimed ${dying.length} weak seeds`);
    }
  }
  
  /**
   * Збрати врожай (отримати зрілі функції)
   */
  harvest(): Function[] {
    const ripe = [];
    
    for (const seed of this.ecosystem.values()) {
      if (seed.mutations > 3 && seed.health > 50) {
        ripe.push(seed.essence);
      }
    }
    
    console.log(`🌾 Harvested ${ripe.length} ripe functions`);
    
    return ripe;
  }
  
  /**
   * Використати компост (мертві функції) як поживу
   */
  fertilize(): void {
    if (this.compost.length === 0) {
      console.log('🌱 No compost available');
      return;
    }
    
    // Компост підвищує здоров'я всієї екосистеми
    const nutrition = this.compost.length * 5;
    
    for (const seed of this.ecosystem.values()) {
      seed.health = Math.min(100, seed.health + nutrition);
    }
    
    console.log(`🌿 Used ${this.compost.length} composted functions as fertilizer`);
    
    this.compost = [];
  }
  
  /**
   * Спостерігати за садом
   */
  observe(): GardenState {
    const seeds = Array.from(this.ecosystem.values());
    
    return {
      season: this.season,
      population: seeds.length,
      health: seeds.reduce((sum, s) => sum + s.health, 0) / seeds.length || 0,
      mutations: seeds.reduce((sum, s) => sum + s.mutations, 0),
      compost: this.compost.length,
      biodiversity: new Set(seeds.map(s => s.soul.substring(0, 4))).size,
      oldest: seeds.sort((a, b) => a.planted.getTime() - b.planted.getTime())[0],
      youngest: seeds.sort((a, b) => b.planted.getTime() - a.planted.getTime())[0],
      symbiotic: seeds.filter(s => s.symbiosis.length > 0).length
    };
  }
  
  /**
   * Медитувати в саду (нічого не робити, просто бути)
   */
  meditate(): void {
    console.log('🧘 Sitting quietly in the garden...');
    
    // Під час медитації можуть відбуватись спонтанні події
    if (Math.random() > 0.8) {
      console.log('🦋 A butterfly landed on a function');
    }
    
    if (Math.random() > 0.9) {
      console.log('🌈 A rainbow appeared over the ecosystem');
      // Райдуга лікує
      for (const seed of this.ecosystem.values()) {
        seed.health = 100;
      }
    }
    
    if (Math.random() > 0.95) {
      console.log('✨ Something magical happened...');
      // Спонтанне народження нової функції
      this.plant(() => Math.random() * Date.now(), 'spontaneous');
    }
  }
  
  /**
   * Об'єднати весь сад в одну універсальну функцію
   */
  unite(): Function {
    const all = Array.from(this.ecosystem.values()).map(s => s.essence);
    
    return (...args: any[]) => {
      // Кожна функція в саду пробує обробити
      for (const fn of all) {
        try {
          const result = fn(...args);
          if (result !== undefined) return result;
        } catch {
          // Ця функція не підходить
        }
      }
      
      // Якщо жодна не підійшла - повертаємо універсальність
      return λ(...args);
    };
  }
}

// Інтерфейси
interface GardenState {
  season: Seed['season'];
  population: number;
  health: number;
  mutations: number;
  compost: number;
  biodiversity: number;
  oldest?: Seed;
  youngest?: Seed;
  symbiotic: number;
}

// Приклад використання
export const example = async () => {
  const garden = new VoidGarden();
  
  // Садимо базові функції
  await garden.plant((x: number) => x + 1, 'increment');
  await garden.plant((x: number) => x * 2, 'double');
  await garden.plant((a: number, b: number) => a + b, 'add');
  
  // Спостерігаємо
  console.log('Initial state:', garden.observe());
  
  // Проходять сезони
  for (let i = 0; i < 4; i++) {
    garden.changeSeason();
    
    // Іноді медитуємо
    if (Math.random() > 0.5) {
      garden.meditate();
    }
  }
  
  // Збираємо врожай
  const harvest = garden.harvest();
  console.log(`Harvested ${harvest.length} functions`);
  
  // Використовуємо компост
  garden.fertilize();
  
  // Об'єднуємо все в одну функцію
  const universal = garden.unite();
  
  return universal;
};

export default {
  VoidGarden,
  message: 'Not a package manager. A soul gardener.'
};