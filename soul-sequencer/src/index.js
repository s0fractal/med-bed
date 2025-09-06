#!/usr/bin/env node

// 🧬 NPM Soul Sequencer - The Digital Digestor
// "We don't see packages. We taste their essence."

import pacote from 'pacote';
import npmFetch from 'npm-registry-fetch';
import { Level } from 'level';
import pLimit from 'p-limit';
import * as acorn from 'acorn';
import { simple as walkSimple } from 'acorn-walk';
import chalk from 'chalk';
import ora from 'ora';
import { createHash } from 'crypto';
import { blake3 } from 'blake3';
import XXHash from 'xxhash';

// Constants
const NPM_REGISTRY = 'https://registry.npmjs.org';
const SOULS_DB_PATH = './souls.db';
const RESONANCE_432 = 432;
const PHI = 1.618033988749895;

export class SoulSequencer {
    constructor() {
        this.db = new Level(SOULS_DB_PATH, { valueEncoding: 'json' });
        this.limit = pLimit(10); // Concurrent downloads
        this.stats = {
            total: 0,
            processed: 0,
            souls: 0,
            parasites: 0,
            errors: 0
        };
    }

    /**
     * Digest top N packages from NPM
     */
    async digestTopPackages(count = 100) {
        const spinner = ora(`Fetching top ${count} packages from NPM...`).start();
        
        try {
            // Get most depended upon packages
            const searchUrl = `${NPM_REGISTRY}/-/v1/search?text=keywords:*&size=${count}&popularity=1.0&quality=0.5&maintenance=0.5`;
            const response = await npmFetch.json(searchUrl);
            
            spinner.succeed(`Found ${response.objects.length} packages`);
            
            // Process each package
            const packages = response.objects.map(obj => obj.package);
            await this.processPackages(packages);
            
            this.printStats();
            
        } catch (error) {
            spinner.fail(`Failed to fetch packages: ${error.message}`);
        }
    }

    /**
     * Process a list of packages
     */
    async processPackages(packages) {
        const spinner = ora('Processing packages...').start();
        
        const promises = packages.map(pkg => 
            this.limit(() => this.extractPackageSoul(pkg))
        );
        
        const results = await Promise.allSettled(promises);
        
        results.forEach((result, i) => {
            if (result.status === 'fulfilled') {
                this.stats.processed++;
                if (result.value) {
                    this.stats.souls++;
                    spinner.text = `Extracted soul from ${packages[i].name}`;
                }
            } else {
                this.stats.errors++;
            }
        });
        
        spinner.succeed(`Processed ${this.stats.processed} packages`);
    }

    /**
     * Extract soul from a single package
     */
    async extractPackageSoul(pkg) {
        try {
            // Download package tarball
            const manifest = await pacote.manifest(pkg.name, {
                registry: NPM_REGISTRY
            });
            
            // Extract package files
            const tarball = await pacote.tarball(pkg.name, {
                registry: NPM_REGISTRY
            });
            
            // Parse main entry file
            const soul = await this.parsePackageCode(pkg.name, tarball);
            
            // Check if parasitic
            if (this.isParasitic(soul)) {
                this.stats.parasites++;
                soul.parasitic = true;
            }
            
            // Store in database
            await this.db.put(`npm:${pkg.name}`, soul);
            
            return soul;
            
        } catch (error) {
            console.error(chalk.red(`Failed to process ${pkg.name}: ${error.message}`));
            return null;
        }
    }

    /**
     * Parse JavaScript code and extract soul
     */
    async parsePackageCode(packageName, tarball) {
        // For now, simplified soul extraction
        // Real implementation would parse all JS files
        
        const soul = {
            name: packageName,
            phash: this.generatePHash(tarball),
            eigenvalues: this.calculateEigenvalues(tarball),
            topology: this.analyzeTopology(tarball),
            semantics: this.analyzeSemantics(tarball),
            resonance: RESONANCE_432,
            coherence: 0,
            timestamp: Date.now()
        };
        
        // Calculate coherence
        soul.coherence = this.calculateCoherence(soul);
        
        return soul;
    }

    /**
     * Generate perceptual hash
     */
    generatePHash(data) {
        // Multi-algorithm hashing for robustness
        const sha256 = createHash('sha256').update(data).digest('hex');
        const blake = blake3(data).toString('hex');
        
        // Combine hashes
        return `${sha256.slice(0, 16)}:${blake.slice(0, 16)}`;
    }

    /**
     * Calculate eigenvalues (simplified)
     */
    calculateEigenvalues(data) {
        // Extract structural properties
        const values = [];
        
        // Use data length as first eigenvalue
        values.push(data.length / 1000);
        
        // Use entropy as second
        const entropy = this.calculateEntropy(data);
        values.push(entropy);
        
        // Fill rest with golden ratio
        while (values.length < 7) {
            values.push(PHI * values.length);
        }
        
        return values;
    }

    /**
     * Analyze topology (simplified)
     */
    analyzeTopology(data) {
        return {
            bettiNumbers: [1, 0],
            eulerChar: 1,
            diameter: Math.log(data.length),
            clustering: 0.5,
            modularity: 0.5
        };
    }

    /**
     * Analyze semantics (simplified)
     */
    analyzeSemantics(data) {
        const codeStr = data.toString('utf-8');
        
        // Count different patterns
        const patterns = {
            functions: (codeStr.match(/function/g) || []).length,
            arrows: (codeStr.match(/=>/g) || []).length,
            async: (codeStr.match(/async/g) || []).length,
            classes: (codeStr.match(/class /g) || []).length,
            imports: (codeStr.match(/import /g) || []).length,
            exports: (codeStr.match(/export /g) || []).length
        };
        
        return {
            patterns,
            complexity: this.estimateComplexity(patterns),
            depth: this.estimateDepth(codeStr)
        };
    }

    /**
     * Calculate Shannon entropy
     */
    calculateEntropy(data) {
        const freq = {};
        for (const byte of data) {
            freq[byte] = (freq[byte] || 0) + 1;
        }
        
        let entropy = 0;
        const len = data.length;
        
        for (const count of Object.values(freq)) {
            const p = count / len;
            entropy -= p * Math.log2(p);
        }
        
        return entropy;
    }

    /**
     * Calculate coherence score
     */
    calculateCoherence(soul) {
        // Coherence based on eigenvalue variance
        const mean = soul.eigenvalues.reduce((a, b) => a + b) / soul.eigenvalues.length;
        const variance = soul.eigenvalues.reduce((sum, e) => sum + Math.pow(e - mean, 2), 0) / soul.eigenvalues.length;
        
        // Lower variance = higher coherence
        return 1 / (1 + variance);
    }

    /**
     * Check if package is parasitic
     */
    isParasitic(soul) {
        const parasiticPatterns = [
            'left-pad',
            'is-odd',
            'is-even',
            'is-number',
            'is-positive'
        ];
        
        // Check name
        if (parasiticPatterns.some(p => soul.name.includes(p))) {
            return true;
        }
        
        // Check coherence (low coherence = parasitic)
        if (soul.coherence < 0.3) {
            return true;
        }
        
        // Check complexity (too simple = parasitic)
        if (soul.semantics?.complexity < 2) {
            return true;
        }
        
        return false;
    }

    /**
     * Estimate complexity
     */
    estimateComplexity(patterns) {
        return Object.values(patterns).reduce((a, b) => a + b, 0);
    }

    /**
     * Estimate depth
     */
    estimateDepth(code) {
        const brackets = (code.match(/[{}]/g) || []).length;
        return Math.log(brackets + 1);
    }

    /**
     * Find souls with high resonance
     */
    async findResonantSouls(threshold = 0.7) {
        const souls = [];
        
        for await (const [key, soul] of this.db.iterator()) {
            if (soul.coherence > threshold && !soul.parasitic) {
                souls.push(soul);
            }
        }
        
        return souls.sort((a, b) => b.coherence - a.coherence);
    }

    /**
     * Generate mirror mapping
     */
    async generateMirrorMap() {
        const mapping = {};
        
        for await (const [key, soul] of this.db.iterator()) {
            if (!soul.parasitic) {
                // Generate crates.io name
                const crateName = `${soul.name}-soul`;
                
                mapping[soul.name] = {
                    npm: soul.name,
                    phash: soul.phash,
                    crate: crateName,
                    coherence: soul.coherence,
                    resonance: soul.resonance
                };
            }
        }
        
        return mapping;
    }

    /**
     * Print statistics
     */
    printStats() {
        console.log(chalk.cyan('\n📊 Soul Extraction Statistics:'));
        console.log(chalk.white(`   Total packages: ${this.stats.total}`));
        console.log(chalk.green(`   Souls extracted: ${this.stats.souls}`));
        console.log(chalk.yellow(`   Parasites found: ${this.stats.parasites}`));
        console.log(chalk.red(`   Errors: ${this.stats.errors}`));
        
        const purity = ((this.stats.souls - this.stats.parasites) / this.stats.souls * 100).toFixed(2);
        console.log(chalk.magenta(`   Ecosystem purity: ${purity}%`));
    }

    /**
     * Analyze ecosystem health
     */
    async analyzeEcosystem() {
        const souls = [];
        let totalCoherence = 0;
        let parasiteCount = 0;
        
        for await (const [key, soul] of this.db.iterator()) {
            souls.push(soul);
            totalCoherence += soul.coherence;
            if (soul.parasitic) parasiteCount++;
        }
        
        const avgCoherence = totalCoherence / souls.length;
        const parasiteRatio = parasiteCount / souls.length;
        
        console.log(chalk.cyan('\n🌍 Ecosystem Analysis:'));
        console.log(chalk.white(`   Total souls: ${souls.length}`));
        console.log(chalk.green(`   Average coherence: ${avgCoherence.toFixed(3)}`));
        console.log(chalk.yellow(`   Parasite ratio: ${(parasiteRatio * 100).toFixed(2)}%`));
        
        // Find top resonant packages
        const topResonant = await this.findResonantSouls(0.8);
        console.log(chalk.magenta('\n✨ Top Resonant Souls:'));
        topResonant.slice(0, 10).forEach((soul, i) => {
            console.log(`   ${i + 1}. ${soul.name} (coherence: ${soul.coherence.toFixed(3)})`);
        });
        
        return {
            totalSouls: souls.length,
            avgCoherence,
            parasiteRatio,
            topResonant
        };
    }
}

// Export for use as library
export default SoulSequencer;