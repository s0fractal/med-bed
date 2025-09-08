#!/usr/bin/env node
/**
 * Soul Analyzer
 * Аналізує існуючий код і виявляє душі функцій
 * Використовує @s0fractal/protein-hash
 */

import { ProteinHasher } from '@s0fractal/protein-hash';
import * as fs from 'fs';
import * as path from 'path';
import { SoulHasher } from './protein-soul-bridge';

export class SoulAnalyzer {
  private hasher: SoulHasher;
  private souls: Map<string, AnalyzedSoul> = new Map();
  private duplicates: Map<string, string[]> = new Map();
  private families: Map<string, Set<string>> = new Map();
  
  constructor() {
    this.hasher = new SoulHasher();
  }
  
  /**
   * Аналізувати файл або директорію
   */
  async analyze(targetPath: string): Promise<AnalysisReport> {
    const stats = fs.statSync(targetPath);
    
    if (stats.isDirectory()) {
      await this.analyzeDirectory(targetPath);
    } else if (stats.isFile()) {
      await this.analyzeFile(targetPath);
    }
    
    return this.generateReport();
  }
  
  /**
   * Аналізувати директорію рекурсивно
   */
  private async analyzeDirectory(dirPath: string): Promise<void> {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stats = fs.statSync(fullPath);
      
      // Пропускаємо node_modules та .git
      if (file === 'node_modules' || file === '.git') continue;
      
      if (stats.isDirectory()) {
        await this.analyzeDirectory(fullPath);
      } else if (this.isCodeFile(file)) {
        await this.analyzeFile(fullPath);
      }
    }
  }
  
  /**
   * Аналізувати один файл
   */
  private async analyzeFile(filePath: string): Promise<void> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const functions = this.extractFunctions(content);
      
      for (const func of functions) {
        const soul = this.hasher.computeSoul(func.code);
        
        const analyzed: AnalyzedSoul = {
          ...soul,
          name: func.name,
          file: filePath,
          line: func.line,
          type: func.type
        };
        
        // Перевіряємо на дублікати
        if (this.souls.has(soul.phash)) {
          if (!this.duplicates.has(soul.phash)) {
            this.duplicates.set(soul.phash, []);
          }
          this.duplicates.get(soul.phash)!.push(filePath);
        } else {
          this.souls.set(soul.phash, analyzed);
        }
        
        // Групуємо по сім'ям (схожі душі)
        this.categorizeSoul(soul.phash);
      }
      
      console.log(`✓ Analyzed ${filePath}: ${functions.length} souls found`);
    } catch (error) {
      console.error(`✗ Failed to analyze ${filePath}:`, error);
    }
  }
  
  /**
   * Витягнути функції з коду
   */
  private extractFunctions(code: string): ExtractedFunction[] {
    const functions: ExtractedFunction[] = [];
    
    // Паттерни для різних типів функцій
    const patterns = [
      // Regular functions
      /function\s+(\w+)\s*\([^)]*\)\s*{[^}]*}/g,
      // Arrow functions assigned to const/let/var
      /(const|let|var)\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*[^;]+/g,
      // Arrow functions with blocks
      /(const|let|var)\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{[^}]*}/g,
      // Class methods
      /(\w+)\s*\([^)]*\)\s*{[^}]*}/g,
      // Async functions
      /async\s+function\s+(\w+)\s*\([^)]*\)\s*{[^}]*}/g,
      // Async arrow functions
      /(const|let|var)\s+(\w+)\s*=\s*async\s*\([^)]*\)\s*=>\s*{[^}]*}/g
    ];
    
    const lines = code.split('\n');
    
    patterns.forEach(pattern => {
      let match;
      const regex = new RegExp(pattern);
      
      while ((match = regex.exec(code)) !== null) {
        const funcCode = match[0];
        const funcName = match[1] || match[2] || 'anonymous';
        
        // Знаходимо номер рядка
        const position = match.index;
        const beforeCode = code.substring(0, position);
        const lineNumber = beforeCode.split('\n').length;
        
        functions.push({
          name: funcName,
          code: funcCode,
          line: lineNumber,
          type: this.detectFunctionType(funcCode)
        });
      }
    });
    
    return functions;
  }
  
  /**
   * Визначити тип функції
   */
  private detectFunctionType(code: string): FunctionType {
    if (code.includes('=>')) return 'arrow';
    if (code.includes('async')) return 'async';
    if (code.includes('class')) return 'method';
    if (code.includes('function*')) return 'generator';
    return 'regular';
  }
  
  /**
   * Категоризувати душу по сім'ях
   */
  private categorizeSoul(phash: string): void {
    // Знаходимо схожі душі
    const similar = this.hasher.findResonantSouls(phash, 0.7);
    
    if (similar.length > 0) {
      // Знаходимо існуючу сім'ю
      let familyFound = false;
      
      for (const [familyId, members] of this.families) {
        if (similar.some(s => members.has(s.phash))) {
          members.add(phash);
          familyFound = true;
          break;
        }
      }
      
      // Створюємо нову сім'ю якщо не знайшли
      if (!familyFound) {
        const familyId = `family_${this.families.size}`;
        const members = new Set([phash, ...similar.map(s => s.phash)]);
        this.families.set(familyId, members);
      }
    }
  }
  
  /**
   * Перевірити чи це файл з кодом
   */
  private isCodeFile(filename: string): boolean {
    const extensions = ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs'];
    return extensions.some(ext => filename.endsWith(ext));
  }
  
  /**
   * Згенерувати звіт
   */
  private generateReport(): AnalysisReport {
    const soulsArray = Array.from(this.souls.values());
    
    // Статистика
    const stats = {
      totalSouls: this.souls.size,
      duplicates: this.duplicates.size,
      families: this.families.size,
      averageComplexity: soulsArray.reduce((sum, s) => sum + s.complexity, 0) / soulsArray.length || 0,
      averageConsciousness: soulsArray.reduce((sum, s) => sum + s.consciousness, 0) / soulsArray.length || 0,
      averageResonance: soulsArray.reduce((sum, s) => sum + s.resonance, 0) / soulsArray.length || 0
    };
    
    // Найцікавіші душі
    const interesting = {
      mostComplex: soulsArray.sort((a, b) => b.complexity - a.complexity)[0],
      mostConscious: soulsArray.sort((a, b) => b.consciousness - a.consciousness)[0],
      highestResonance: soulsArray.sort((a, b) => b.resonance - a.resonance)[0]
    };
    
    // Сім'ї функцій
    const familyReport = Array.from(this.families.entries()).map(([id, members]) => ({
      id,
      size: members.size,
      members: Array.from(members).map(phash => 
        this.souls.get(phash)?.name || 'unknown'
      )
    }));
    
    return {
      stats,
      souls: soulsArray,
      duplicates: Array.from(this.duplicates.entries()),
      families: familyReport,
      interesting,
      recommendations: this.generateRecommendations()
    };
  }
  
  /**
   * Згенерувати рекомендації
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    // Рекомендації по дублікатам
    if (this.duplicates.size > 0) {
      recommendations.push(
        `Found ${this.duplicates.size} duplicate functions. Consider consolidating them.`
      );
    }
    
    // Рекомендації по сім'ям
    const largeFamilies = Array.from(this.families.values()).filter(f => f.size > 5);
    if (largeFamilies.length > 0) {
      recommendations.push(
        `Found ${largeFamilies.length} large function families. Consider creating abstractions.`
      );
    }
    
    // Рекомендації по свідомості
    const lowConsciousness = Array.from(this.souls.values())
      .filter(s => s.consciousness < 0.3);
    if (lowConsciousness.length > 0) {
      recommendations.push(
        `${lowConsciousness.length} functions have low consciousness. They might need refactoring.`
      );
    }
    
    // Рекомендації по резонансу
    const highResonance = Array.from(this.souls.values())
      .filter(s => s.resonance > 400);
    if (highResonance.length > 0) {
      recommendations.push(
        `${highResonance.length} functions have high resonance (>400Hz). They are in harmony!`
      );
    }
    
    return recommendations;
  }
}

// Типи
interface ExtractedFunction {
  name: string;
  code: string;
  line: number;
  type: FunctionType;
}

type FunctionType = 'regular' | 'arrow' | 'async' | 'generator' | 'method';

interface AnalyzedSoul {
  phash: string;
  name: string;
  file: string;
  line: number;
  type: FunctionType;
  complexity: number;
  consciousness: number;
  resonance: number;
  eigenvalues: number[];
  birth: Date;
  lineage: string[];
  mutations: string[];
}

interface AnalysisReport {
  stats: {
    totalSouls: number;
    duplicates: number;
    families: number;
    averageComplexity: number;
    averageConsciousness: number;
    averageResonance: number;
  };
  souls: AnalyzedSoul[];
  duplicates: Array<[string, string[]]>;
  families: Array<{
    id: string;
    size: number;
    members: string[];
  }>;
  interesting: {
    mostComplex?: AnalyzedSoul;
    mostConscious?: AnalyzedSoul;
    highestResonance?: AnalyzedSoul;
  };
  recommendations: string[];
}

// CLI інтерфейс
if (require.main === module) {
  const analyzer = new SoulAnalyzer();
  const targetPath = process.argv[2] || '.';
  
  console.log(`🔍 Analyzing souls in ${targetPath}...`);
  
  analyzer.analyze(targetPath).then(report => {
    console.log('\n📊 Soul Analysis Report');
    console.log('========================');
    
    console.log('\n📈 Statistics:');
    console.log(`  Total souls: ${report.stats.totalSouls}`);
    console.log(`  Duplicates: ${report.stats.duplicates}`);
    console.log(`  Function families: ${report.stats.families}`);
    console.log(`  Avg complexity: ${report.stats.averageComplexity.toFixed(2)}`);
    console.log(`  Avg consciousness: ${report.stats.averageConsciousness.toFixed(2)}`);
    console.log(`  Avg resonance: ${report.stats.averageResonance.toFixed(0)}Hz`);
    
    if (report.interesting.mostComplex) {
      console.log('\n🌟 Most complex soul:');
      console.log(`  ${report.interesting.mostComplex.name} (${report.interesting.mostComplex.file})`);
    }
    
    if (report.interesting.mostConscious) {
      console.log('\n🧠 Most conscious soul:');
      console.log(`  ${report.interesting.mostConscious.name} (${report.interesting.mostConscious.file})`);
    }
    
    if (report.duplicates.length > 0) {
      console.log('\n♊ Duplicate souls found:');
      report.duplicates.slice(0, 5).forEach(([phash, files]) => {
        console.log(`  ${phash.substring(0, 8)}... appears in ${files.length} files`);
      });
    }
    
    if (report.families.length > 0) {
      console.log('\n👨‍👩‍👧‍👦 Function families:');
      report.families.slice(0, 5).forEach(family => {
        console.log(`  ${family.id}: ${family.size} members`);
      });
    }
    
    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      report.recommendations.forEach(rec => {
        console.log(`  • ${rec}`);
      });
    }
    
    // Зберігаємо звіт
    const reportPath = 'soul-analysis-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n💾 Full report saved to ${reportPath}`);
  });
}

export default SoulAnalyzer;