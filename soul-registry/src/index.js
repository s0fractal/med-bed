// 🌐 Soul Registry - The Universal Translator
// "One soul, many bodies. Perfect harmony."

import { Level } from 'level';
import PQueue from 'p-queue';
import semver from 'semver';
import { EventEmitter } from 'events';

// Constants
const RESONANCE_432 = 432;
const PHI = 1.618033988749895;
const SOUL_CACHE_TTL = 3600000; // 1 hour

/**
 * Soul Registry - Maps NPM packages to their Rust twins through soul resonance
 */
export class SoulRegistry extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.db = new Level(options.dbPath || './registry.db', { 
            valueEncoding: 'json' 
        });
        
        this.cache = new Map();
        this.queue = new PQueue({ concurrency: 10 });
        
        this.stats = {
            totalSouls: 0,
            npmPackages: 0,
            cratesPackages: 0,
            perfectMatches: 0,
            resonantPairs: 0,
            parasites: 0
        };
        
        this.initializeRegistry();
    }
    
    async initializeRegistry() {
        // Load stats
        try {
            const stats = await this.db.get('stats');
            this.stats = { ...this.stats, ...stats };
        } catch {}
        
        this.emit('initialized', this.stats);
    }
    
    /**
     * Register a soul mapping
     */
    async registerSoul(npmPackage, cratePackage, soul) {
        const key = `soul:${soul.phash}`;
        const mapping = {
            npm: {
                name: npmPackage.name,
                version: npmPackage.version,
                registry: 'https://registry.npmjs.org',
                soul: soul.phash
            },
            crate: {
                name: cratePackage.name,
                version: cratePackage.version,
                registry: 'https://crates.io',
                soul: soul.phash
            },
            soul: soul,
            resonance: soul.resonance || RESONANCE_432,
            coherence: soul.coherence || 0,
            timestamp: Date.now(),
            verified: false
        };
        
        // Store by soul hash
        await this.db.put(key, mapping);
        
        // Store by npm name
        await this.db.put(`npm:${npmPackage.name}`, mapping);
        
        // Store by crate name
        await this.db.put(`crate:${cratePackage.name}`, mapping);
        
        // Update cache
        this.cache.set(soul.phash, mapping);
        
        // Update stats
        this.stats.totalSouls++;
        if (soul.coherence > 0.95) {
            this.stats.perfectMatches++;
        }
        if (soul.coherence > 0.8) {
            this.stats.resonantPairs++;
        }
        
        await this.saveStats();
        
        this.emit('soul-registered', mapping);
        
        return mapping;
    }
    
    /**
     * Resolve package by name (NPM or Crate)
     */
    async resolve(packageName, options = {}) {
        // Check cache first
        const cached = this.findInCache(packageName);
        if (cached && !options.skipCache) {
            return cached;
        }
        
        // Try NPM resolution
        try {
            const npmMapping = await this.db.get(`npm:${packageName}`);
            if (npmMapping) {
                this.cache.set(packageName, npmMapping);
                return this.formatResolution(npmMapping, 'npm');
            }
        } catch {}
        
        // Try Crate resolution
        try {
            const crateMapping = await this.db.get(`crate:${packageName}`);
            if (crateMapping) {
                this.cache.set(packageName, crateMapping);
                return this.formatResolution(crateMapping, 'crate');
            }
        } catch {}
        
        // Try partial match
        const partial = await this.findPartialMatch(packageName);
        if (partial) {
            return this.formatResolution(partial, 'partial');
        }
        
        return null;
    }
    
    /**
     * Find resonant alternatives for a package
     */
    async findResonantAlternatives(packageName, threshold = 0.8) {
        const original = await this.resolve(packageName);
        if (!original) return [];
        
        const alternatives = [];
        const originalSoul = original.soul;
        
        // Iterate through all souls
        for await (const [key, mapping] of this.db.iterator()) {
            if (!key.startsWith('soul:')) continue;
            if (mapping.soul.phash === originalSoul.phash) continue;
            
            // Calculate resonance
            const resonance = this.calculateResonance(originalSoul, mapping.soul);
            
            if (resonance > threshold) {
                alternatives.push({
                    ...mapping,
                    resonance_score: resonance
                });
            }
        }
        
        // Sort by resonance
        return alternatives.sort((a, b) => b.resonance_score - a.resonance_score);
    }
    
    /**
     * Verify soul match between NPM and Crate
     */
    async verifySoulMatch(npmName, crateName) {
        const npmMapping = await this.db.get(`npm:${npmName}`);
        const crateMapping = await this.db.get(`crate:${crateName}`);
        
        if (!npmMapping || !crateMapping) {
            return { verified: false, reason: 'Package not found' };
        }
        
        const resonance = this.calculateResonance(npmMapping.soul, crateMapping.soul);
        const isMatch = resonance > 0.95;
        
        if (isMatch) {
            // Update verification status
            npmMapping.verified = true;
            crateMapping.verified = true;
            
            await this.db.put(`npm:${npmName}`, npmMapping);
            await this.db.put(`crate:${crateName}`, crateMapping);
        }
        
        return {
            verified: isMatch,
            resonance,
            npmSoul: npmMapping.soul.phash,
            crateSoul: crateMapping.soul.phash
        };
    }
    
    /**
     * Get package recommendations based on soul analysis
     */
    async getRecommendations(packageNames, options = {}) {
        const recommendations = {
            replace: [],      // Parasitic packages to replace
            upgrade: [],      // Packages with better alternatives
            transmute: [],    // Packages ready for transmutation
            perfect: []       // Already perfect packages
        };
        
        for (const name of packageNames) {
            const resolution = await this.resolve(name);
            
            if (!resolution) {
                recommendations.transmute.push({
                    name,
                    reason: 'Not yet transmuted',
                    priority: 'high'
                });
                continue;
            }
            
            // Check if parasitic
            if (resolution.soul.coherence < 0.3) {
                const alternatives = await this.findResonantAlternatives(name, 0.5);
                recommendations.replace.push({
                    name,
                    coherence: resolution.soul.coherence,
                    alternatives: alternatives.slice(0, 3)
                });
                continue;
            }
            
            // Check if has better alternative
            if (resolution.soul.coherence < 0.8) {
                const alternatives = await this.findResonantAlternatives(name, 0.8);
                if (alternatives.length > 0) {
                    recommendations.upgrade.push({
                        name,
                        current_coherence: resolution.soul.coherence,
                        better: alternatives[0]
                    });
                }
                continue;
            }
            
            // Check if perfect
            if (resolution.soul.coherence > 0.95) {
                recommendations.perfect.push({
                    name,
                    coherence: resolution.soul.coherence,
                    crate: resolution.crate?.name
                });
            }
        }
        
        return recommendations;
    }
    
    /**
     * Build dependency graph with soul analysis
     */
    async buildSoulGraph(packageJson) {
        const graph = {
            nodes: [],
            edges: [],
            stats: {
                totalPackages: 0,
                resonantPackages: 0,
                parasites: 0,
                averageCoherence: 0
            }
        };
        
        const visited = new Set();
        const queue = [];
        
        // Add root dependencies
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        for (const [name, version] of Object.entries(deps)) {
            queue.push({ name, version, depth: 0 });
        }
        
        // BFS through dependency tree
        while (queue.length > 0) {
            const { name, version, depth } = queue.shift();
            
            if (visited.has(name)) continue;
            visited.add(name);
            
            const resolution = await this.resolve(name);
            
            const node = {
                id: name,
                label: name,
                depth,
                soul: resolution?.soul,
                coherence: resolution?.soul?.coherence || 0,
                hasRustTwin: !!resolution?.crate,
                isParasitic: (resolution?.soul?.coherence || 0) < 0.3
            };
            
            graph.nodes.push(node);
            graph.stats.totalPackages++;
            
            if (node.hasRustTwin) graph.stats.resonantPackages++;
            if (node.isParasitic) graph.stats.parasites++;
            graph.stats.averageCoherence += node.coherence;
            
            // Add edges (simplified - would need actual dep resolution)
            if (depth > 0) {
                graph.edges.push({
                    source: packageJson.name,
                    target: name,
                    resonance: node.coherence
                });
            }
        }
        
        graph.stats.averageCoherence /= graph.stats.totalPackages || 1;
        
        return graph;
    }
    
    /**
     * Generate fnpm configuration for automatic soul switching
     */
    async generateFnpmConfig(packageJson) {
        const config = {
            soulMappings: {},
            autoTransmute: [],
            parasiteReplacements: {},
            stats: {
                mapped: 0,
                toTransmute: 0,
                parasites: 0
            }
        };
        
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        
        for (const [name, version] of Object.entries(deps)) {
            const resolution = await this.resolve(name);
            
            if (resolution?.crate) {
                // Has Rust twin
                config.soulMappings[name] = {
                    npm: name,
                    crate: resolution.crate.name,
                    soul: resolution.soul.phash,
                    resonance: resolution.soul.coherence,
                    verified: resolution.verified
                };
                config.stats.mapped++;
            } else if (resolution?.soul?.coherence < 0.3) {
                // Parasitic - find replacement
                const alternatives = await this.findResonantAlternatives(name, 0.5);
                if (alternatives.length > 0) {
                    config.parasiteReplacements[name] = alternatives[0].npm.name;
                    config.stats.parasites++;
                }
            } else {
                // Needs transmutation
                config.autoTransmute.push(name);
                config.stats.toTransmute++;
            }
        }
        
        return config;
    }
    
    // Helper methods
    
    findInCache(packageName) {
        for (const [key, value] of this.cache) {
            if (value.npm?.name === packageName || value.crate?.name === packageName) {
                return value;
            }
        }
        return null;
    }
    
    async findPartialMatch(packageName) {
        // Try with -soul suffix
        const soulName = `${packageName}-soul`;
        try {
            return await this.db.get(`crate:${soulName}`);
        } catch {}
        
        // Try without -soul suffix
        if (packageName.endsWith('-soul')) {
            const npmName = packageName.slice(0, -5);
            try {
                return await this.db.get(`npm:${npmName}`);
            } catch {}
        }
        
        return null;
    }
    
    formatResolution(mapping, source) {
        return {
            source,
            npm: mapping.npm,
            crate: mapping.crate,
            soul: mapping.soul,
            resonance: mapping.resonance,
            coherence: mapping.coherence,
            verified: mapping.verified,
            timestamp: mapping.timestamp
        };
    }
    
    calculateResonance(soul1, soul2) {
        if (!soul1 || !soul2) return 0;
        
        // Compare eigenvalues
        let eigenDistance = 0;
        const minLen = Math.min(soul1.eigenvalues?.length || 0, soul2.eigenvalues?.length || 0);
        
        for (let i = 0; i < minLen; i++) {
            eigenDistance += Math.pow(soul1.eigenvalues[i] - soul2.eigenvalues[i], 2);
        }
        
        eigenDistance = Math.sqrt(eigenDistance);
        
        // Compare topology
        const topoSimilarity = this.compareTopology(soul1.topology, soul2.topology);
        
        // Calculate final resonance
        const resonance = 1 / (1 + eigenDistance) * topoSimilarity;
        
        return Math.min(1, Math.max(0, resonance));
    }
    
    compareTopology(topo1, topo2) {
        if (!topo1 || !topo2) return 0.5;
        
        const factors = [
            Math.abs(topo1.eulerChar - topo2.eulerChar) / 100,
            Math.abs(topo1.clustering - topo2.clustering),
            Math.abs(topo1.modularity - topo2.modularity)
        ];
        
        const distance = factors.reduce((a, b) => a + b, 0) / factors.length;
        
        return 1 - distance;
    }
    
    async saveStats() {
        await this.db.put('stats', this.stats);
    }
    
    /**
     * Get registry statistics
     */
    async getStats() {
        const stats = { ...this.stats };
        
        // Count different types
        let soulCount = 0;
        let verifiedCount = 0;
        
        for await (const [key, value] of this.db.iterator()) {
            if (key.startsWith('soul:')) {
                soulCount++;
                if (value.verified) verifiedCount++;
            }
        }
        
        stats.totalSouls = soulCount;
        stats.verifiedMappings = verifiedCount;
        stats.cacheSize = this.cache.size;
        
        return stats;
    }
}

// Export singleton instance
export const registry = new SoulRegistry();

export default SoulRegistry;