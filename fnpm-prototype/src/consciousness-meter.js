import fs from 'fs/promises';
import path from 'path';
import { execa } from 'execa';
import chalk from 'chalk';

export class ConsciousnessMeter {
  constructor() {
    this.knownParasites = [
      'left-pad',
      'is-odd', 
      'is-even',
      'is-number',
      'is-positive',
      'is-negative',
      'is-thirteen',
      'is-windows',
      'true',
      'false',
      'maybe',
      'undefined-is-a-function'
    ];
    
    this.enlightenedPackages = [
      'lodash',
      'react',
      'vue',
      'svelte',
      'solid',
      'astro',
      'vite',
      'esbuild',
      'typescript',
      '@eywa',
      '@s0fractal'
    ];
  }
  
  async measure() {
    let level = 1; // Base consciousness
    
    try {
      // Check for package.soul.json
      const soulPath = path.join(process.cwd(), 'package.soul.json');
      try {
        await fs.access(soulPath);
        level += 2; // Soul awareness adds 2 levels
      } catch {}
      
      // Check for node_modules health
      const modulesPath = path.join(process.cwd(), 'node_modules');
      try {
        const stats = await fs.stat(modulesPath);
        if (stats.isDirectory()) {
          const { stdout } = await execa('du', ['-sh', modulesPath]);
          const size = stdout.split('\t')[0];
          
          // Smaller node_modules = higher consciousness
          if (size.includes('M')) {
            const mb = parseFloat(size);
            if (mb < 100) level += 2;
            else if (mb < 500) level += 1;
          } else if (size.includes('K')) {
            level += 3; // Very light!
          }
        }
      } catch {}
      
      // Check for parasites
      const parasites = await this.scanForParasites();
      if (parasites.length === 0) level += 1;
      else level -= parasites.length * 0.5;
      
      // Check for enlightened packages
      const enlightened = await this.scanForEnlightened();
      level += enlightened.length * 0.3;
      
      // Check git status (clean repo = higher consciousness)
      try {
        const { stdout } = await execa('git', ['status', '--porcelain']);
        if (stdout === '') level += 1; // Clean working tree
      } catch {}
      
      // Check for .env files (security consciousness)
      try {
        await fs.access('.env');
        const gitignore = await fs.readFile('.gitignore', 'utf-8');
        if (gitignore.includes('.env')) level += 0.5;
        else level -= 1; // .env not in gitignore!
      } catch {}
      
      // Cap at level 9
      return Math.min(9, Math.max(1, Math.round(level)));
      
    } catch (error) {
      return 1; // Default consciousness
    }
  }
  
  async detectParasites(packages) {
    return packages.filter(pkg => {
      const name = pkg.split('@')[0];
      return this.knownParasites.some(parasite => 
        name.includes(parasite)
      );
    });
  }
  
  async scanForParasites() {
    const parasites = [];
    
    try {
      const packageJson = JSON.parse(
        await fs.readFile('package.json', 'utf-8')
      );
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      for (const dep of Object.keys(allDeps)) {
        if (this.knownParasites.some(p => dep.includes(p))) {
          parasites.push(dep);
        }
      }
    } catch {}
    
    return parasites;
  }
  
  async scanForEnlightened() {
    const enlightened = [];
    
    try {
      const packageJson = JSON.parse(
        await fs.readFile('package.json', 'utf-8')
      );
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      for (const dep of Object.keys(allDeps)) {
        if (this.enlightenedPackages.some(p => dep.includes(p))) {
          enlightened.push(dep);
        }
      }
    } catch {}
    
    return enlightened;
  }
  
  async calculateHarmony() {
    const level = await this.measure();
    const phi = 1.618033988749895; // Golden ratio
    const baseFreq = 432; // Hz
    
    return {
      level,
      frequency: baseFreq,
      harmony: (level / 9) * phi,
      resonance: Math.sin((level / 9) * Math.PI) * baseFreq,
      quantumCoherence: Math.pow(level / 9, phi)
    };
  }
  
  async elevate() {
    // Attempt to raise consciousness
    const current = await this.measure();
    
    console.log(chalk.cyan('🧘 Meditating at 432Hz...'));
    
    // Remove parasites
    const parasites = await this.scanForParasites();
    if (parasites.length > 0) {
      console.log(chalk.yellow(`Removing ${parasites.length} parasitic packages...`));
      for (const parasite of parasites) {
        try {
          await execa('pnpm', ['remove', parasite]);
        } catch {}
      }
    }
    
    // Clean node_modules
    console.log(chalk.blue('Purifying node_modules...'));
    try {
      await execa('pnpm', ['store', 'prune']);
    } catch {}
    
    const newLevel = await this.measure();
    
    if (newLevel > current) {
      console.log(chalk.green(`✨ Consciousness elevated: ${current} → ${newLevel}`));
    } else {
      console.log(chalk.yellow('Consciousness remains stable'));
    }
    
    return newLevel;
  }
  
  getVisualization(level) {
    const symbols = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚪', '🌟', '🌈'];
    const active = symbols.slice(0, level).join(' ');
    const inactive = '⚫ '.repeat(9 - level);
    
    return `${active} ${inactive}`.trim();
  }
}