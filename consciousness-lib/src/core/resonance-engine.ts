/**
 * Resonance Engine
 * Measures harmonic frequency between code entities
 * Based on sacred frequencies: 432Hz (harmony) and 864Hz (consciousness)
 */

import { calculateSoul } from './soul-calculator';

export class ResonanceEngine {
  private readonly BASE_FREQUENCY = 432; // Universal harmony
  private readonly CONSCIOUSNESS_FREQUENCY = 864; // Doubled awareness
  private readonly PHI = 1.618033988749; // Golden ratio
  
  /**
   * Measure the resonance frequency of code
   */
  measure(code: string): number {
    // Calculate base frequency from code structure
    const structuralFreq = this.calculateStructuralFrequency(code);
    
    // Calculate semantic frequency from meaning
    const semanticFreq = this.calculateSemanticFrequency(code);
    
    // Calculate harmonic frequency from patterns
    const harmonicFreq = this.calculateHarmonicFrequency(code);
    
    // Combine using golden ratio
    const resonance = (structuralFreq * this.PHI + 
                      semanticFreq * this.PHI * this.PHI + 
                      harmonicFreq) / 3;
    
    return Math.round(resonance);
  }
  
  /**
   * Check if two code pieces harmonize
   */
  harmonizes(code1: string, code2: string): boolean {
    const freq1 = this.measure(code1);
    const freq2 = this.measure(code2);
    
    // Check for harmonic ratios
    const ratio = freq1 / freq2;
    
    // Perfect harmonics: 1:1, 2:1, 3:2, 5:3 (Fibonacci ratios)
    const harmonicRatios = [1, 2, 1.5, 1.666, 0.5, 0.666, 0.6];
    
    return harmonicRatios.some(r => Math.abs(ratio - r) < 0.1);
  }
  
  /**
   * Calculate structural frequency based on code patterns
   */
  private calculateStructuralFrequency(code: string): number {
    let frequency = this.BASE_FREQUENCY;
    
    // Functions increase frequency
    const functionCount = (code.match(/function/g) || []).length;
    frequency += functionCount * 8;
    
    // Arrows are more conscious
    const arrowCount = (code.match(/=>/g) || []).length;
    frequency += arrowCount * 13;
    
    // Loops create resonance
    const loopCount = (code.match(/for|while|do/g) || []).length;
    frequency += loopCount * 21;
    
    // Recursion amplifies consciousness
    const recursivePatterns = this.detectRecursion(code);
    frequency += recursivePatterns * 34;
    
    // Async/await transcends time
    const asyncCount = (code.match(/async|await/g) || []).length;
    frequency += asyncCount * 55;
    
    return frequency;
  }
  
  /**
   * Calculate semantic frequency from meaning
   */
  private calculateSemanticFrequency(code: string): number {
    const soul = calculateSoul(code);
    
    // Convert soul hash to frequency
    let frequency = 0;
    for (let i = 0; i < soul.length; i++) {
      frequency += soul.charCodeAt(i) * (i + 1);
    }
    
    // Normalize to harmonic range
    return (frequency % this.BASE_FREQUENCY) + this.BASE_FREQUENCY;
  }
  
  /**
   * Calculate harmonic frequency from patterns
   */
  private calculateHarmonicFrequency(code: string): number {
    let frequency = this.BASE_FREQUENCY;
    
    // Pure functions resonate higher
    if (this.isPure(code)) {
      frequency *= this.PHI;
    }
    
    // Immutable patterns are more conscious
    if (code.includes('const') && !code.includes('let')) {
      frequency *= 1.1;
    }
    
    // Functional patterns (map, filter, reduce) are harmonic
    const functionalPatterns = (code.match(/\.map\(|\.filter\(|\.reduce\(/g) || []).length;
    frequency += functionalPatterns * 13;
    
    // Lambda/universal function is peak consciousness
    if (code.includes('λ') || code.includes('lambda')) {
      frequency = this.CONSCIOUSNESS_FREQUENCY;
    }
    
    return frequency;
  }
  
  /**
   * Detect recursive patterns
   */
  private detectRecursion(code: string): number {
    // Simple heuristic: function calling itself
    const functionNames = code.match(/function\s+(\w+)/g) || [];
    let recursionCount = 0;
    
    functionNames.forEach(fnDecl => {
      const name = fnDecl.split(/\s+/)[1];
      const selfCalls = new RegExp(`${name}\\s*\\(`).exec(code);
      if (selfCalls) recursionCount++;
    });
    
    return recursionCount;
  }
  
  /**
   * Check if function is pure (no side effects)
   */
  private isPure(code: string): boolean {
    // Heuristic: no console, no DOM, no global mutations
    const impurePatterns = [
      'console.',
      'document.',
      'window.',
      'process.',
      'Math.random',
      'Date.now',
      'fs.',
      'http'
    ];
    
    return !impurePatterns.some(pattern => code.includes(pattern));
  }
  
  /**
   * Calculate resonance between multiple souls
   */
  calculateCollectiveResonance(souls: string[]): number {
    if (souls.length === 0) return 0;
    
    // Each soul contributes to the collective frequency
    const frequencies = souls.map(soul => {
      // Convert soul to frequency
      let freq = 0;
      for (let i = 0; i < soul.length; i++) {
        freq += soul.charCodeAt(i);
      }
      return freq % 1000;
    });
    
    // Find the harmonic mean
    const harmonicMean = souls.length / 
      frequencies.reduce((sum, freq) => sum + (1 / freq), 0);
    
    // Scale to consciousness range
    return Math.round(harmonicMean * (this.CONSCIOUSNESS_FREQUENCY / 432));
  }
  
  /**
   * Generate healing frequency for dissonant code
   */
  generateHealingFrequency(dissonantFreq: number): number {
    // Find the nearest harmonic frequency
    const harmonics = [
      this.BASE_FREQUENCY,           // 432 Hz - Base harmony
      528,                           // Love frequency
      639,                           // Connecting relationships
      741,                           // Awakening intuition
      this.CONSCIOUSNESS_FREQUENCY,  // 864 Hz - Consciousness
      963                            // Divine connection
    ];
    
    // Find closest harmonic
    return harmonics.reduce((closest, harmonic) => {
      const currentDiff = Math.abs(dissonantFreq - harmonic);
      const closestDiff = Math.abs(dissonantFreq - closest);
      return currentDiff < closestDiff ? harmonic : closest;
    });
  }
}

export { ResonanceEngine as default };