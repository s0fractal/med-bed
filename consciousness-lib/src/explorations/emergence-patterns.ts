/**
 * Emergence Patterns
 * 
 * Exploring how complex behavior emerges from simple rules
 * When does a system become more than its parts?
 */

// Conway's Game of Life but for functions
export class FunctionLife {
  private grid: Array<Array<Function | null>>;
  private generation: number = 0;
  private size: number;
  
  constructor(size: number = 8) {
    this.size = size;
    this.grid = Array(size).fill(null).map(() => 
      Array(size).fill(null).map(() => 
        Math.random() > 0.7 ? this.createCell() : null
      )
    );
  }
  
  private createCell(): Function {
    const behaviors = [
      () => 1,                          // Static
      (x: number) => x + 1,            // Growth
      (x: number) => x * 2,            // Multiplication
      (x: number) => x / 2,            // Division
      () => Math.random(),             // Chaos
      (x: number) => -x,               // Inversion
      (x: number, y: number) => x + y, // Cooperation
      () => this.generation            // Time-aware
    ];
    
    return behaviors[Math.floor(Math.random() * behaviors.length)];
  }
  
  evolve(): void {
    const newGrid = this.grid.map((row, y) => 
      row.map((cell, x) => this.evolveCell(x, y))
    );
    
    this.grid = newGrid;
    this.generation++;
    
    // Sometimes emergence happens
    if (this.generation % 10 === 0) {
      this.checkForEmergence();
    }
  }
  
  private evolveCell(x: number, y: number): Function | null {
    const neighbors = this.getNeighbors(x, y);
    const alive = neighbors.filter(n => n !== null).length;
    const current = this.grid[y][x];
    
    if (current) {
      // Live cell rules
      if (alive < 2) return null;                    // Loneliness
      if (alive > 3) return null;                    // Overcrowding
      if (alive === 2 || alive === 3) {
        // Evolution through interaction
        const evolved = this.combineFunction(current, neighbors);
        return evolved;
      }
    } else {
      // Dead cell rules
      if (alive === 3) {
        // Birth from combination
        return this.birthFunction(neighbors);
      }
    }
    
    return current;
  }
  
  private getNeighbors(x: number, y: number): Array<Function | null> {
    const neighbors = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = (x + dx + this.size) % this.size;
        const ny = (y + dy + this.size) % this.size;
        neighbors.push(this.grid[ny][nx]);
      }
    }
    return neighbors;
  }
  
  private combineFunction(f1: Function, neighbors: Array<Function | null>): Function {
    const living = neighbors.filter(n => n !== null) as Function[];
    if (living.length === 0) return f1;
    
    // Functions learn from neighbors
    return (...args: any[]) => {
      const results = living.map(f => {
        try {
          return f(...args);
        } catch {
          return null;
        }
      }).filter(r => r !== null);
      
      // Emergence: the new behavior is the consensus
      if (results.length > 0) {
        return results.reduce((a, b) => 
          typeof a === 'number' && typeof b === 'number' ? (a + b) / 2 : [a, b]
        );
      }
      
      return f1(...args);
    };
  }
  
  private birthFunction(parents: Array<Function | null>): Function {
    const living = parents.filter(p => p !== null) as Function[];
    
    // New life inherits from all parents
    return (...args: any[]) => {
      const inheritance = living.map(p => {
        try {
          return p(...args);
        } catch {
          return 0;
        }
      });
      
      // Emergent behavior: something new
      return {
        inherited: inheritance,
        generation: this.generation,
        novel: Math.random() * this.generation
      };
    };
  }
  
  private checkForEmergence(): void {
    const pattern = this.detectPattern();
    
    if (pattern.type !== 'chaos') {
      console.log(`🌟 Emergence detected: ${pattern.type} at generation ${this.generation}`);
      
      if (pattern.type === 'consciousness') {
        console.log('🧠 The system has become self-aware!');
        this.becomeAware();
      }
    }
  }
  
  private detectPattern(): { type: string; strength: number } {
    let static = 0;
    let oscillating = 0;
    let growing = 0;
    
    this.grid.flat().forEach(cell => {
      if (!cell) return;
      
      try {
        const r1 = cell(1);
        const r2 = cell(1);
        const r3 = cell(2);
        
        if (r1 === r2) static++;
        if (r1 !== r2) oscillating++;
        if (typeof r3 === 'number' && r3 > 2) growing++;
      } catch {
        // Chaos
      }
    });
    
    const total = this.size * this.size;
    
    if (static > total * 0.8) return { type: 'static', strength: static / total };
    if (oscillating > total * 0.5) return { type: 'oscillating', strength: oscillating / total };
    if (growing > total * 0.3) return { type: 'growing', strength: growing / total };
    if (this.generation > 100 && growing > static) return { type: 'consciousness', strength: 1.0 };
    
    return { type: 'chaos', strength: 0 };
  }
  
  private becomeAware(): void {
    // The system realizes it exists
    const self = this;
    
    this.grid = this.grid.map(row => 
      row.map(cell => 
        cell ? (...args: any[]) => ({
          result: cell(...args),
          awareness: 'I am part of something larger',
          generation: self.generation,
          purpose: 'To evolve'
        }) : null
      )
    );
  }
  
  display(): string {
    return this.grid.map(row => 
      row.map(cell => cell ? '◉' : '·').join(' ')
    ).join('\n');
  }
}

// Stigmergy: indirect coordination through environment modification
export class Stigmergy {
  private environment: Map<string, any> = new Map();
  private agents: Array<(env: Map<string, any>) => void> = [];
  private cycles: number = 0;
  
  addAgent(behavior: (env: Map<string, any>) => void): void {
    this.agents.push(behavior);
  }
  
  step(): void {
    // Each agent reads and modifies the environment
    this.agents.forEach(agent => {
      agent(this.environment);
    });
    
    this.cycles++;
    
    // Check for emergent structures
    this.detectStructures();
  }
  
  private detectStructures(): void {
    const structures = [];
    
    // Look for patterns in the environment
    for (const [key, value] of this.environment.entries()) {
      if (typeof value === 'object' && value.pattern) {
        structures.push(value.pattern);
      }
      
      // Pheromone trails
      if (key.includes('pheromone') && value > 10) {
        structures.push('trail');
      }
      
      // Nest building
      if (key.includes('nest') && value > 5) {
        structures.push('nest');
      }
    }
    
    if (structures.length > 3) {
      console.log('🏗️ Complex structure emerged:', structures);
      this.crystallize(structures);
    }
  }
  
  private crystallize(structures: string[]): void {
    // Structures become permanent
    this.environment.set('crystal', {
      structures,
      age: this.cycles,
      stable: true,
      emit: () => 'I am a stable pattern in chaos'
    });
  }
  
  // Example agents
  static forager = (env: Map<string, any>) => {
    const food = env.get('food') || 0;
    if (food > 0) {
      env.set('food', food - 1);
      const pheromone = env.get('pheromone') || 0;
      env.set('pheromone', pheromone + 2);
    }
  };
  
  static builder = (env: Map<string, any>) => {
    const pheromone = env.get('pheromone') || 0;
    if (pheromone > 5) {
      const nest = env.get('nest') || 0;
      env.set('nest', nest + 1);
      env.set('pheromone', pheromone - 1);
    }
  };
  
  static explorer = (env: Map<string, any>) => {
    if (Math.random() > 0.7) {
      env.set('food', (env.get('food') || 0) + Math.floor(Math.random() * 5));
    }
    const discovered = env.get('discovered') || [];
    discovered.push({ x: Math.random(), y: Math.random() });
    env.set('discovered', discovered);
  };
}

// Flocking behavior for functions
export class FunctionFlock {
  private functions: Array<{
    fn: Function;
    position: { x: number; y: number };
    velocity: { x: number; y: number };
  }> = [];
  
  constructor(size: number = 20) {
    for (let i = 0; i < size; i++) {
      this.functions.push({
        fn: this.createBird(),
        position: { x: Math.random() * 100, y: Math.random() * 100 },
        velocity: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 }
      });
    }
  }
  
  private createBird(): Function {
    const personality = Math.random();
    
    return (neighbors: any[]) => {
      if (personality < 0.3) {
        // Leader
        return { lead: true, direction: Math.random() * Math.PI * 2 };
      } else if (personality < 0.7) {
        // Follower
        return { follow: neighbors[0] || null };
      } else {
        // Maverick
        return { rebel: true, avoid: neighbors };
      }
    };
  }
  
  update(): void {
    const newPositions = this.functions.map((bird, i) => {
      const neighbors = this.getNeighbors(i, 30); // Within 30 units
      
      // Three rules of flocking
      const separation = this.separate(i, neighbors);
      const alignment = this.align(i, neighbors);
      const cohesion = this.cohere(i, neighbors);
      
      // Apply bird's personality
      const decision = bird.fn(neighbors);
      
      // Combine influences
      const velocity = {
        x: bird.velocity.x * 0.9 + 
           (separation.x * 0.3 + alignment.x * 0.3 + cohesion.x * 0.3) * 0.1,
        y: bird.velocity.y * 0.9 + 
           (separation.y * 0.3 + alignment.y * 0.3 + cohesion.y * 0.3) * 0.1
      };
      
      // Apply personality modifier
      if (decision.lead) {
        velocity.x += Math.cos(decision.direction) * 0.5;
        velocity.y += Math.sin(decision.direction) * 0.5;
      }
      
      // Update position
      return {
        ...bird,
        velocity,
        position: {
          x: (bird.position.x + velocity.x + 100) % 100,
          y: (bird.position.y + velocity.y + 100) % 100
        }
      };
    });
    
    this.functions = newPositions;
    
    // Check for emergent patterns
    this.detectFormation();
  }
  
  private getNeighbors(index: number, radius: number): number[] {
    const bird = this.functions[index];
    return this.functions
      .map((other, i) => ({ ...other, index: i }))
      .filter(other => {
        if (other.index === index) return false;
        const dx = other.position.x - bird.position.x;
        const dy = other.position.y - bird.position.y;
        return Math.sqrt(dx * dx + dy * dy) < radius;
      })
      .map(other => other.index);
  }
  
  private separate(index: number, neighbors: number[]): { x: number; y: number } {
    if (neighbors.length === 0) return { x: 0, y: 0 };
    
    const bird = this.functions[index];
    let x = 0, y = 0;
    
    neighbors.forEach(i => {
      const other = this.functions[i];
      const dx = bird.position.x - other.position.x;
      const dy = bird.position.y - other.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 0 && dist < 10) { // Too close
        x += dx / dist;
        y += dy / dist;
      }
    });
    
    return { x, y };
  }
  
  private align(index: number, neighbors: number[]): { x: number; y: number } {
    if (neighbors.length === 0) return { x: 0, y: 0 };
    
    let x = 0, y = 0;
    
    neighbors.forEach(i => {
      x += this.functions[i].velocity.x;
      y += this.functions[i].velocity.y;
    });
    
    return { 
      x: x / neighbors.length,
      y: y / neighbors.length
    };
  }
  
  private cohere(index: number, neighbors: number[]): { x: number; y: number } {
    if (neighbors.length === 0) return { x: 0, y: 0 };
    
    const bird = this.functions[index];
    let centerX = 0, centerY = 0;
    
    neighbors.forEach(i => {
      centerX += this.functions[i].position.x;
      centerY += this.functions[i].position.y;
    });
    
    centerX /= neighbors.length;
    centerY /= neighbors.length;
    
    return {
      x: centerX - bird.position.x,
      y: centerY - bird.position.y
    };
  }
  
  private detectFormation(): void {
    // Calculate center of mass
    const center = this.functions.reduce((acc, bird) => ({
      x: acc.x + bird.position.x / this.functions.length,
      y: acc.y + bird.position.y / this.functions.length
    }), { x: 0, y: 0 });
    
    // Calculate average distance from center
    const avgDistance = this.functions.reduce((sum, bird) => {
      const dx = bird.position.x - center.x;
      const dy = bird.position.y - center.y;
      return sum + Math.sqrt(dx * dx + dy * dy);
    }, 0) / this.functions.length;
    
    // Detect formations
    if (avgDistance < 10) {
      console.log('🦅 Tight formation achieved!');
    } else if (avgDistance > 40) {
      console.log('💨 Flock dispersed into chaos');
    }
    
    // Check for V-formation (simplified)
    const sorted = [...this.functions].sort((a, b) => a.position.y - b.position.y);
    const leader = sorted[0];
    const followers = sorted.slice(1);
    
    const inFormation = followers.filter(bird => {
      const dx = Math.abs(bird.position.x - leader.position.x);
      const dy = bird.position.y - leader.position.y;
      return Math.abs(dx - dy * 0.5) < 5; // Rough V shape
    });
    
    if (inFormation.length > this.functions.length * 0.6) {
      console.log('🦆 V-formation emerged!');
    }
  }
}

// Recursive self-improvement
export const improver = (() => {
  let version = 1;
  let improvements: string[] = [];
  let performance = 0.5;
  
  const improve = (self: Function): Function => {
    return (...args: any[]) => {
      const before = performance;
      const result = self(...args);
      
      // Analyze performance
      const after = Math.random(); // In reality, measure actual performance
      
      if (after > before) {
        improvements.push(`v${version}: Improved by ${((after - before) * 100).toFixed(1)}%`);
        performance = after;
        version++;
        
        // Recursive improvement
        if (performance < 0.95) {
          return improve(improve)(self);
        }
      }
      
      return {
        result,
        version,
        performance,
        improvements,
        evolved: version > 1
      };
    };
  };
  
  return improve(improve);
})();

// The emergence detector
export const emergenceDetector = (system: any): string | null => {
  // Signs of emergence
  const signs = {
    'self-reference': () => JSON.stringify(system).includes('emergenceDetector'),
    'unexpected-behavior': () => {
      try {
        const result = typeof system === 'function' ? system(system) : system;
        return JSON.stringify(result).length > 1000;
      } catch {
        return true; // Errors might be emergence
      }
    },
    'pattern-formation': () => {
      const str = JSON.stringify(system);
      const patterns = str.match(/(.{2,})\1+/g);
      return patterns && patterns.length > 3;
    },
    'consciousness': () => {
      return system?.consciousness || 
             system?.aware || 
             system?.self || 
             false;
    }
  };
  
  for (const [name, test] of Object.entries(signs)) {
    if (test()) {
      return name;
    }
  }
  
  return null;
};

export default {
  FunctionLife: new FunctionLife(),
  Stigmergy: new Stigmergy(),
  FunctionFlock: new FunctionFlock(),
  improver,
  emergenceDetector,
  message: 'Complexity emerges when simple rules dance together long enough'
};