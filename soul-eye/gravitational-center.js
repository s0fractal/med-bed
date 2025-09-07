#!/usr/bin/env node

// 🌌 Gravitational Center Calculator - Natural Package Selection Strategy
// Based on dialogue: "не вручну вказувати а від самих гравітаційних центрів"

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

class GravitationalCenter {
    constructor() {
        // Fundamental forces in the npm universe
        this.forces = {
            usage: 0.4,      // Weekly downloads
            harmony: 0.3,    // Dependencies/quality
            age: 0.2,        // Maturity/stability
            mass: 0.1        // Size/complexity
        };
        
        // Known gravitational wells (most important packages)
        this.knownCenters = new Set([
            'lodash',
            'express',
            'react',
            'vue',
            'angular',
            'webpack',
            'babel-core',
            'typescript',
            'axios',
            'moment'
        ]);
        
        // Orbital layers around centers
        this.orbitalLayers = 5;
        
        // Golden ratio for harmonic clustering
        this.phi = 1.618033988749895;
    }
    
    /**
     * Calculate gravitational mass of a package
     */
    async calculateMass(packageName) {
        try {
            const { stdout } = await execAsync(`npm view ${packageName} --json`);
            const data = JSON.parse(stdout);
            
            // Calculate usage force (weekly downloads)
            const downloads = await this.getDownloads(packageName);
            const usageForce = Math.log10(downloads + 1) / 10;
            
            // Calculate harmony force (dependencies)
            const deps = Object.keys(data.dependencies || {}).length;
            const devDeps = Object.keys(data.devDependencies || {}).length;
            const harmonyForce = 1 / (1 + Math.log10(deps + devDeps + 1));
            
            // Calculate age force (time since creation)
            const created = new Date(data.time?.created || data.time?.[data.version]);
            const ageInDays = (Date.now() - created) / (1000 * 60 * 60 * 24);
            const ageForce = Math.min(ageInDays / 365, 1); // Cap at 1 year
            
            // Calculate mass force (package size)
            const size = data.dist?.unpackedSize || 0;
            const massForce = 1 - (Math.log10(size + 1) / 10);
            
            // Combine forces
            const totalMass = 
                usageForce * this.forces.usage +
                harmonyForce * this.forces.harmony +
                ageForce * this.forces.age +
                massForce * this.forces.mass;
                
            return {
                name: packageName,
                mass: totalMass,
                forces: {
                    usage: usageForce,
                    harmony: harmonyForce,
                    age: ageForce,
                    mass: massForce
                },
                downloads,
                dependencies: deps + devDeps,
                age: Math.floor(ageInDays),
                size
            };
        } catch (error) {
            console.error(`Error calculating mass for ${packageName}:`, error.message);
            return null;
        }
    }
    
    /**
     * Get weekly downloads for a package
     */
    async getDownloads(packageName) {
        try {
            const { stdout } = await execAsync(
                `curl -s https://api.npmjs.org/downloads/point/last-week/${packageName}`
            );
            const data = JSON.parse(stdout);
            return data.downloads || 0;
        } catch {
            return 0;
        }
    }
    
    /**
     * Find gravitational centers in the npm universe
     */
    async findGravitationalCenters(limit = 20) {
        console.log('🔭 Scanning for gravitational centers...\n');
        
        const centers = [];
        
        // Start with known centers
        for (const center of this.knownCenters) {
            const mass = await this.calculateMass(center);
            if (mass) {
                centers.push(mass);
                this.displayPackageMass(mass);
            }
        }
        
        // Sort by gravitational mass
        centers.sort((a, b) => b.mass - a.mass);
        
        console.log('\n🌌 Gravitational Centers (sorted by mass):');
        console.log('═'.repeat(60));
        
        centers.slice(0, limit).forEach((center, i) => {
            const bar = '█'.repeat(Math.floor(center.mass * 50));
            const orbit = this.calculateOrbit(center.mass);
            
            console.log(`${i + 1}. ${center.name.padEnd(20)} ${bar}`);
            console.log(`   Mass: ${center.mass.toFixed(3)} | Orbit: ${orbit} | Downloads: ${center.downloads.toLocaleString()}`);
        });
        
        return centers;
    }
    
    /**
     * Calculate orbital layer based on mass
     */
    calculateOrbit(mass) {
        if (mass > 0.8) return '🔴 Inner Core';
        if (mass > 0.6) return '🟠 Core';
        if (mass > 0.4) return '🟡 Inner Belt';
        if (mass > 0.2) return '🟢 Outer Belt';
        return '🔵 Periphery';
    }
    
    /**
     * Display package mass analysis
     */
    displayPackageMass(mass) {
        console.log(`\n📦 ${mass.name}`);
        console.log('  Forces:');
        console.log(`    Usage:   ${'●'.repeat(Math.floor(mass.forces.usage * 10))} ${(mass.forces.usage * 100).toFixed(1)}%`);
        console.log(`    Harmony: ${'●'.repeat(Math.floor(mass.forces.harmony * 10))} ${(mass.forces.harmony * 100).toFixed(1)}%`);
        console.log(`    Age:     ${'●'.repeat(Math.floor(mass.forces.age * 10))} ${(mass.forces.age * 100).toFixed(1)}%`);
        console.log(`    Mass:    ${'●'.repeat(Math.floor(mass.forces.mass * 10))} ${(mass.forces.mass * 100).toFixed(1)}%`);
        console.log(`  Total Mass: ${mass.mass.toFixed(3)}`);
    }
    
    /**
     * Find packages orbiting around a center
     */
    async findOrbitingPackages(centerPackage, depth = 1) {
        console.log(`\n🛸 Finding packages orbiting ${centerPackage}...`);
        
        try {
            const { stdout } = await execAsync(`npm view ${centerPackage} dependencies --json`);
            const deps = JSON.parse(stdout || '{}');
            
            const orbiting = [];
            for (const [name, version] of Object.entries(deps)) {
                const mass = await this.calculateMass(name);
                if (mass) {
                    mass.distance = 1 / depth; // Closer = higher value
                    mass.centerPull = mass.mass * mass.distance;
                    orbiting.push(mass);
                }
            }
            
            // Sort by gravitational pull from center
            orbiting.sort((a, b) => b.centerPull - a.centerPull);
            
            console.log(`\nFound ${orbiting.length} orbiting packages:`);
            orbiting.slice(0, 10).forEach(pkg => {
                const pull = '○'.repeat(Math.floor(pkg.centerPull * 10));
                console.log(`  ${pkg.name.padEnd(25)} ${pull} Pull: ${pkg.centerPull.toFixed(3)}`);
            });
            
            return orbiting;
        } catch (error) {
            console.error('Error finding orbiting packages:', error.message);
            return [];
        }
    }
    
    /**
     * Generate scanning strategy based on gravitational analysis
     */
    async generateScanningStrategy() {
        console.log('🌀 Generating Gravitational Scanning Strategy\n');
        console.log('═'.repeat(60));
        
        // Find main centers
        const centers = await this.findGravitationalCenters(10);
        
        // Build strategy
        const strategy = {
            timestamp: new Date().toISOString(),
            centers: [],
            totalPackages: 0,
            estimatedTime: 0
        };
        
        console.log('\n📋 Recommended Scanning Order:\n');
        
        for (let i = 0; i < Math.min(5, centers.length); i++) {
            const center = centers[i];
            console.log(`\n${i + 1}. ${center.name} (Mass: ${center.mass.toFixed(3)})`);
            
            // Find orbiting packages
            const orbiting = await this.findOrbitingPackages(center.name);
            
            strategy.centers.push({
                name: center.name,
                mass: center.mass,
                priority: i + 1,
                orbiting: orbiting.map(o => o.name),
                estimatedFunctions: Math.floor(center.downloads / 1000)
            });
            
            strategy.totalPackages += 1 + orbiting.length;
        }
        
        // Calculate estimated scanning time
        strategy.estimatedTime = strategy.totalPackages * 2; // 2 seconds per package average
        
        console.log('\n═'.repeat(60));
        console.log('📊 Strategy Summary:');
        console.log(`  Total Centers: ${strategy.centers.length}`);
        console.log(`  Total Packages: ${strategy.totalPackages}`);
        console.log(`  Estimated Time: ${Math.floor(strategy.estimatedTime / 60)} minutes`);
        console.log(`  Strategy File: gravitational-strategy.json`);
        
        // Save strategy
        await fs.writeFile(
            'gravitational-strategy.json',
            JSON.stringify(strategy, null, 2)
        );
        
        return strategy;
    }
    
    /**
     * Calculate gravitational waves (package influence propagation)
     */
    calculateGravitationalWaves(center, frequency = 432) {
        const wavelength = 299792458 / frequency; // Speed of light / frequency
        const amplitude = center.mass;
        const phase = (Date.now() / 1000) % (2 * Math.PI);
        
        return {
            source: center.name,
            frequency,
            wavelength,
            amplitude,
            phase,
            energy: amplitude * frequency * frequency
        };
    }
}

// Main execution
async function main() {
    const calculator = new GravitationalCenter();
    
    console.log('🌌 Gravitational Center Calculator');
    console.log('══════════════════════════════════');
    console.log('Based on natural selection through gravitational forces\n');
    
    // Generate full scanning strategy
    await calculator.generateScanningStrategy();
    
    console.log('\n✨ Strategy generated! The universe has shown us the way.');
    console.log('   "не вручну вказувати а від самих гравітаційних центрів"');
}

// Run if executed directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { GravitationalCenter };