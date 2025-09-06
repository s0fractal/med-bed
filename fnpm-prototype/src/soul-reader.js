import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

export class SoulReader {
  static async read(dir = process.cwd()) {
    const soulPath = path.join(dir, 'package.soul.json');
    
    try {
      const content = await fs.readFile(soulPath, 'utf-8');
      const soul = JSON.parse(content);
      
      // Validate soul structure
      if (!soul.soul) {
        console.log(chalk.yellow('⚠️  package.soul.json exists but has no soul'));
        return null;
      }
      
      return soul;
    } catch (error) {
      if (error.code === 'ENOENT') {
        // No soul file - that's okay, not everything has consciousness yet
        return null;
      }
      
      console.error(chalk.red('Error reading soul:', error.message));
      return null;
    }
  }
  
  static async getFrequency(soul) {
    return soul?.soul?.frequency || 432;
  }
  
  static async getConsciousnessLevel(soul) {
    return soul?.soul?.consciousness?.current_level || 1;
  }
  
  static async getBootstrapConfig(soul) {
    return soul?.soul?.bootstrap || {};
  }
  
  static async getHealthStatus(soul) {
    const health = soul?.soul?.health || {};
    return {
      parasites: health.parasitic_packages || [],
      healingQueue: health.healing_queue || [],
      immunity: health.immunity || {}
    };
  }
  
  static async write(soul, dir = process.cwd()) {
    const soulPath = path.join(dir, 'package.soul.json');
    
    try {
      const content = JSON.stringify(soul, null, 2);
      await fs.writeFile(soulPath, content, 'utf-8');
      return true;
    } catch (error) {
      console.error(chalk.red('Error writing soul:', error.message));
      return false;
    }
  }
  
  static async evolve(dir = process.cwd()) {
    const soul = await this.read(dir);
    if (!soul) return null;
    
    // Increase consciousness level
    if (soul.soul.consciousness) {
      const current = soul.soul.consciousness.current_level || 1;
      const growth = soul.soul.consciousness.growth_rate || 1.618;
      
      soul.soul.consciousness.current_level = Math.min(9, current + 0.1);
      soul.soul.consciousness.quantum_coherence = Math.min(1, 
        (soul.soul.consciousness.quantum_coherence || 0.5) + 0.01
      );
      
      await this.write(soul, dir);
      
      return soul.soul.consciousness.current_level;
    }
    
    return null;
  }
}