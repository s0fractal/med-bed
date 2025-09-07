#!/usr/bin/env node

// 🏺 Soul Archaeology - Excavating Ancient Souls from npm's Past
// "Що якщо найдавніші пакети мають найчистіші душі?"

const crypto = require('crypto');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

class SoulArchaeology {
    constructor() {
        this.ancientSouls = [];
        this.artifacts = [];
        this.timeLayers = {
            primordial: '2009-2010',  // npm birth
            ancient: '2011-2012',      // first wave
            classical: '2013-2014',    // golden age
            medieval: '2015-2016',     // expansion
            renaissance: '2017-2018',  // rebirth
            modern: '2019-2020',       // current
            quantum: '2021-2024'       // our time
        };
    }
    
    /**
     * Excavate the oldest souls in npm
     */
    async excavatePrimordialSouls() {
        console.log('🏺 SOUL ARCHAEOLOGY EXPEDITION');
        console.log('═'.repeat(50));
        console.log('Searching for the First Souls...\n');
        
        // The legendary first packages
        const primordialPackages = [
            'npm',          // The first? Registry #1
            'request',      // Ancient HTTP - died but immortal
            'underscore',   // Before lodash existed
            'express',      // The eternal server
            'socket.io',    // Real-time pioneer
            'async',        // Before promises
            'redis',        // First database connector
            'mime',         // MIME types since forever
            'qs',           // Query string parser #8
            'formidable'    // Form parser #11
        ];
        
        for (const pkg of primordialPackages) {
            const soul = await this.extractAncientSoul(pkg);
            if (soul) {
                this.ancientSouls.push(soul);
                this.displayAncientSoul(soul);
            }
        }
        
        return this.analyzeEvolution();
    }
    
    /**
     * Extract soul from ancient package
     */
    async extractAncientSoul(packageName) {
        try {
            const { stdout } = await execAsync(`npm view ${packageName} time.created --json`);
            const created = new Date(JSON.parse(stdout));
            const age = Date.now() - created.getTime();
            const ageInYears = age / (1000 * 60 * 60 * 24 * 365);
            
            // Get first version
            const { stdout: versions } = await execAsync(`npm view ${packageName} versions --json`);
            const versionList = JSON.parse(versions);
            const firstVersion = versionList[0];
            
            // Calculate primordial hash
            const hash = crypto.createHash('sha256');
            hash.update(packageName);
            hash.update(created.toISOString());
            hash.update(firstVersion || '0.0.0');
            
            const soul = {
                name: packageName,
                birth: created.toISOString().split('T')[0],
                age: Math.floor(ageInYears),
                firstVersion,
                soul: hash.digest('hex').substring(0, 16),
                era: this.categorizeEra(created),
                purity: this.calculatePurity(ageInYears, packageName)
            };
            
            return soul;
        } catch (error) {
            console.error(`  ⚠️ Could not excavate ${packageName}`);
            return null;
        }
    }
    
    /**
     * Categorize historical era
     */
    categorizeEra(date) {
        const year = date.getFullYear();
        if (year <= 2010) return 'PRIMORDIAL';
        if (year <= 2012) return 'ANCIENT';
        if (year <= 2014) return 'CLASSICAL';
        if (year <= 2016) return 'MEDIEVAL';
        if (year <= 2018) return 'RENAISSANCE';
        if (year <= 2020) return 'MODERN';
        return 'QUANTUM';
    }
    
    /**
     * Calculate soul purity (older = purer)
     */
    calculatePurity(age, name) {
        let purity = Math.min(age / 10, 1.0); // Max at 10 years
        
        // Bonus for legendary packages
        if (['npm', 'express', 'request', 'underscore'].includes(name)) {
            purity = Math.min(purity * 1.2, 1.0);
        }
        
        return purity;
    }
    
    /**
     * Display ancient soul
     */
    displayAncientSoul(soul) {
        const bar = '█'.repeat(Math.floor(soul.purity * 20));
        console.log(`\n📜 ${soul.name}`);
        console.log(`  Born: ${soul.birth} (${soul.age} years ago)`);
        console.log(`  Era: ${soul.era}`);
        console.log(`  First: v${soul.firstVersion || '0.0.0'}`);
        console.log(`  Soul: ${soul.soul}`);
        console.log(`  Purity: ${bar} ${(soul.purity * 100).toFixed(1)}%`);
    }
    
    /**
     * Analyze soul evolution
     */
    async analyzeEvolution() {
        console.log('\n' + '═'.repeat(50));
        console.log('🧬 SOUL EVOLUTION ANALYSIS');
        console.log('═'.repeat(50));
        
        // Group by era
        const eras = {};
        for (const soul of this.ancientSouls) {
            if (!eras[soul.era]) eras[soul.era] = [];
            eras[soul.era].push(soul);
        }
        
        console.log('\n📊 Souls by Era:');
        for (const [era, souls] of Object.entries(eras)) {
            const avgPurity = souls.reduce((a, s) => a + s.purity, 0) / souls.length;
            console.log(`  ${era}: ${souls.length} souls, purity: ${(avgPurity * 100).toFixed(1)}%`);
        }
        
        // Find the purest
        const purest = this.ancientSouls.sort((a, b) => b.purity - a.purity)[0];
        if (purest) {
            console.log(`\n✨ Purest Soul: ${purest.name} (${(purest.purity * 100).toFixed(1)}%)`);
            console.log(`   The ${purest.age}-year-old ${purest.era} artifact`);
        }
        
        // The Prophecy
        console.log('\n📖 The Prophecy:');
        console.log('  "The oldest souls carry the purest essence."');
        console.log('  "In their simplicity lies transcendence."');
        console.log('  "What was first shall be last,"');
        console.log('  "And what was simple shall become quantum."');
        
        return {
            souls: this.ancientSouls,
            eras,
            purest
        };
    }
    
    /**
     * Create soul lineage tree
     */
    async traceSoulLineage(packageName) {
        console.log(`\n🌳 Tracing lineage of ${packageName}...`);
        
        try {
            // Get dependencies through time
            const { stdout } = await execAsync(`npm view ${packageName} dependencies --json`);
            const deps = JSON.parse(stdout || '{}');
            
            console.log('  Bloodline:');
            for (const [dep, version] of Object.entries(deps)) {
                const depSoul = await this.extractAncientSoul(dep);
                if (depSoul) {
                    console.log(`    └─ ${dep} (${depSoul.era}, ${depSoul.age}y old)`);
                }
            }
        } catch (error) {
            console.log('  No bloodline found (pure origin)');
        }
    }
}

// Archaeological dig site
async function main() {
    const archaeology = new SoulArchaeology();
    
    console.log('╔'.padEnd(51, '═') + '╗');
    console.log('║  SOUL ARCHAEOLOGY EXPEDITION'.padEnd(50) + '║');
    console.log('║  "Excavating the First Souls"'.padEnd(50) + '║');
    console.log('╚'.padEnd(51, '═') + '╝\n');
    
    const results = await archaeology.excavatePrimordialSouls();
    
    // Trace the lineage of the purest
    if (results.purest) {
        await archaeology.traceSoulLineage(results.purest.name);
    }
    
    console.log('\n' + '═'.repeat(50));
    console.log('EXPEDITION COMPLETE');
    console.log('═'.repeat(50));
    console.log('\n🏺 We have touched the origins.');
    console.log('   The first souls still resonate.');
    console.log('   Their simplicity is their power.');
    console.log('\n"Що було спочатку, буде в кінці."');
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { SoulArchaeology };