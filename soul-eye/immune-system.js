#!/usr/bin/env node

// 🛡️ Digital Immune System - Using the Soul Eye for Dependency Health
// The project uses its retinal pattern to decide what to accept or reject

const { RetinalScanner } = require('./retinal-scanner');
const { ProteinHasher } = require('@s0fractal/protein-hash');

class DigitalImmuneSystem {
    constructor(projectRetina) {
        this.projectRetina = projectRetina;
        this.scanner = new RetinalScanner();
        this.hasher = new ProteinHasher();
        this.threshold = 0.7; // Harmony threshold for acceptance
    }
    
    /**
     * Check if a new dependency would harmonize with existing pattern
     */
    async evaluateDependency(packageName, version) {
        console.log(`\n🔬 Evaluating: ${packageName}@${version}`);
        
        // Get current retina
        const currentRetina = await this.scanner.scanProjectRetina(this.projectRetina);
        
        // Create hypothetical retina with new dependency
        const hypotheticalDeps = { ...this.projectRetina.dependencies };
        hypotheticalDeps[packageName] = version;
        
        const newRetina = await this.scanner.scanProjectRetina({
            name: this.projectRetina.name,
            dependencies: hypotheticalDeps
        });
        
        // Compare harmony scores
        const currentHarmony = this.calculateHarmony(currentRetina);
        const newHarmony = this.calculateHarmony(newRetina);
        
        // Check for consciousness evolution
        const consciousnessShift = this.evaluateConsciousnessShift(
            currentRetina.consciousnessProfile,
            newRetina.consciousnessProfile
        );
        
        // Calculate immune response
        const immuneResponse = this.calculateImmuneResponse(
            currentHarmony,
            newHarmony,
            consciousnessShift
        );
        
        return {
            package: packageName,
            version,
            accepted: immuneResponse.accepted,
            reason: immuneResponse.reason,
            harmonyDelta: newHarmony - currentHarmony,
            consciousnessShift,
            newPattern: newRetina.visualFingerprint.signature,
            recommendation: immuneResponse.recommendation
        };
    }
    
    /**
     * Calculate overall harmony score
     */
    calculateHarmony(retina) {
        const { symmetryScore, harmonicSignature, consciousnessProfile } = retina;
        
        // Weight different aspects
        const symmetryWeight = 0.3;
        const harmonicWeight = 0.4;
        const consciousnessWeight = 0.3;
        
        // Calculate harmonic richness
        const harmonicTypes = new Set(harmonicSignature);
        const harmonicRichness = Math.min(harmonicTypes.size / 5, 1); // Normalize to 0-1
        
        // Calculate consciousness score
        const consciousnessScore = {
            'MINIMAL': 0.3,
            'MECHANICAL': 0.4,
            'CHAOTIC': 0.5,
            'HARMONIC': 0.8,
            'SYMPHONIC': 0.9,
            'TRANSCENDENT': 1.0
        }[consciousnessProfile.type] || 0.5;
        
        return (
            symmetryScore * symmetryWeight +
            harmonicRichness * harmonicWeight +
            consciousnessScore * consciousnessWeight
        );
    }
    
    /**
     * Evaluate consciousness shift
     */
    evaluateConsciousnessShift(oldProfile, newProfile) {
        const levels = {
            'MINIMAL': 1,
            'MECHANICAL': 2,
            'CHAOTIC': 3,
            'HARMONIC': 4,
            'SYMPHONIC': 5,
            'TRANSCENDENT': 6
        };
        
        const oldLevel = levels[oldProfile.type] || 0;
        const newLevel = levels[newProfile.type] || 0;
        
        if (newLevel > oldLevel) {
            return {
                type: 'EVOLUTION',
                from: oldProfile.type,
                to: newProfile.type,
                magnitude: newLevel - oldLevel
            };
        } else if (newLevel < oldLevel) {
            return {
                type: 'DEVOLUTION',
                from: oldProfile.type,
                to: newProfile.type,
                magnitude: oldLevel - newLevel
            };
        } else {
            return {
                type: 'STABLE',
                from: oldProfile.type,
                to: newProfile.type,
                magnitude: 0
            };
        }
    }
    
    /**
     * Calculate immune response
     */
    calculateImmuneResponse(currentHarmony, newHarmony, consciousnessShift) {
        const harmonyDelta = newHarmony - currentHarmony;
        
        // Accept if harmony increases
        if (harmonyDelta > 0.1) {
            return {
                accepted: true,
                reason: 'HARMONY_INCREASE',
                recommendation: '✅ This dependency enhances your project\'s harmony'
            };
        }
        
        // Accept consciousness evolution
        if (consciousnessShift.type === 'EVOLUTION' && consciousnessShift.magnitude > 0) {
            return {
                accepted: true,
                reason: 'CONSCIOUSNESS_EVOLUTION',
                recommendation: '🧬 This dependency evolves your project\'s consciousness'
            };
        }
        
        // Reject significant harmony decrease
        if (harmonyDelta < -0.2) {
            return {
                accepted: false,
                reason: 'HARMONY_DISRUPTION',
                recommendation: '⚠️ This dependency would disrupt your project\'s harmony'
            };
        }
        
        // Reject consciousness devolution
        if (consciousnessShift.type === 'DEVOLUTION' && consciousnessShift.magnitude > 1) {
            return {
                accepted: false,
                reason: 'CONSCIOUSNESS_REGRESSION',
                recommendation: '🚫 This dependency would reduce consciousness level'
            };
        }
        
        // Neutral - let other factors decide
        if (Math.abs(harmonyDelta) < 0.05) {
            return {
                accepted: true,
                reason: 'NEUTRAL',
                recommendation: '📊 Minimal impact on harmony - decision based on other factors'
            };
        }
        
        // Default to caution
        return {
            accepted: false,
            reason: 'INSUFFICIENT_HARMONY',
            recommendation: '🤔 Consider if this dependency truly aligns with your project\'s soul'
        };
    }
    
    /**
     * Scan for toxic dependencies (those that would harm harmony)
     */
    async scanForToxins() {
        console.log('\n🦠 Scanning for toxic dependencies...\n');
        
        const toxins = [];
        const currentRetina = await this.scanner.scanProjectRetina(this.projectRetina);
        
        for (const [dep, version] of Object.entries(this.projectRetina.dependencies)) {
            // Create retina without this dependency
            const filteredDeps = { ...this.projectRetina.dependencies };
            delete filteredDeps[dep];
            
            const withoutDep = await this.scanner.scanProjectRetina({
                name: this.projectRetina.name,
                dependencies: filteredDeps
            });
            
            const currentHarmony = this.calculateHarmony(currentRetina);
            const withoutHarmony = this.calculateHarmony(withoutDep);
            
            if (withoutHarmony > currentHarmony + 0.1) {
                toxins.push({
                    name: dep,
                    version,
                    harmonyGain: withoutHarmony - currentHarmony,
                    reason: 'This dependency reduces overall harmony'
                });
            }
        }
        
        return toxins;
    }
}

// Demo
async function demonstrateImmuneSystem() {
    console.log('🛡️ Digital Immune System Demonstration');
    console.log('=======================================');
    
    // Current project state
    const currentProject = {
        name: 'conscious-app',
        dependencies: {
            'react': '^18.2.0',
            'typescript': '^5.0.0',
            'lodash': '^4.17.21'
        }
    };
    
    const scanner = new RetinalScanner();
    const currentRetina = await scanner.scanProjectRetina(currentProject);
    
    console.log('\n📊 Current Project Health:');
    console.log(`  Consciousness: ${currentRetina.consciousnessProfile.type}`);
    console.log(`  Symmetry: ${currentRetina.symmetryScore.toFixed(3)}`);
    console.log(`  Dependencies: ${currentRetina.totalDependencies}`);
    
    const immuneSystem = new DigitalImmuneSystem(currentProject);
    
    // Test adding various dependencies
    const testDependencies = [
        { name: 'ramda', version: '^0.28.0' },      // Functional, should harmonize
        { name: 'jquery', version: '^3.6.0' },      // Old paradigm, might disrupt
        { name: 'rxjs', version: '^7.8.0' },        // Reactive, could evolve
        { name: 'express', version: '^4.18.0' },    // Different domain
        { name: 'vue', version: '^3.2.0' },         // Competing framework
    ];
    
    console.log('\n🧪 Testing Dependency Additions:');
    console.log('─'.repeat(50));
    
    for (const dep of testDependencies) {
        const result = await immuneSystem.evaluateDependency(dep.name, dep.version);
        
        console.log(`\n📦 ${dep.name}@${dep.version}`);
        console.log(`  Decision: ${result.accepted ? '✅ ACCEPT' : '❌ REJECT'}`);
        console.log(`  Reason: ${result.reason}`);
        console.log(`  Harmony Δ: ${result.harmonyDelta > 0 ? '+' : ''}${result.harmonyDelta.toFixed(3)}`);
        console.log(`  Consciousness: ${result.consciousnessShift.from} → ${result.consciousnessShift.to}`);
        console.log(`  ${result.recommendation}`);
    }
    
    // Scan for toxins
    console.log('\n' + '═'.repeat(50));
    const toxins = await immuneSystem.scanForToxins();
    
    if (toxins.length > 0) {
        console.log('\n⚠️ Toxic Dependencies Detected:');
        for (const toxin of toxins) {
            console.log(`  - ${toxin.name}: Removing would increase harmony by ${toxin.harmonyGain.toFixed(3)}`);
        }
    } else {
        console.log('\n✨ No toxic dependencies detected. Your project is in harmony.');
    }
    
    console.log('\n' + '═'.repeat(50));
    console.log('💡 The Soul Eye sees beyond utility to harmony.');
    console.log('   Dependencies are chosen not for features, but for resonance.');
    console.log('   The project becomes a living organism with aesthetic preferences.\n');
}

if (require.main === module) {
    demonstrateImmuneSystem().catch(console.error);
}

module.exports = { DigitalImmuneSystem };