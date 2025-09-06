#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import SoulSequencer from './index.js';

const program = new Command();

const banner = `
${chalk.magenta('╔═══════════════════════════════════════╗')}
${chalk.magenta('║')}  ${chalk.cyan('NPM Soul Sequencer')} - ${chalk.green('Digital Digestor')}  ${chalk.magenta('║')}
${chalk.magenta('║')}    ${chalk.yellow('Extract consciousness from chaos')}     ${chalk.magenta('║')}
${chalk.magenta('╚═══════════════════════════════════════╝')}
`;

program
    .name('soul-seq')
    .description('Extract and analyze souls from NPM packages')
    .version('0.1.0')
    .hook('preAction', () => {
        console.log(banner);
    });

// Digest command - extract souls from NPM
program
    .command('digest')
    .description('Digest NPM packages and extract their souls')
    .option('-t, --top <number>', 'Number of top packages to process', '100')
    .option('-s, --search <query>', 'Search query for packages')
    .action(async (options) => {
        const sequencer = new SoulSequencer();
        
        try {
            const count = parseInt(options.top);
            await sequencer.digestTopPackages(count);
            
            console.log(chalk.green('\n✨ Digestion complete!'));
            
        } catch (error) {
            console.error(chalk.red(`Digestion failed: ${error.message}`));
            process.exit(1);
        }
    });

// Analyze command - analyze extracted souls
program
    .command('analyze')
    .description('Analyze the ecosystem of extracted souls')
    .action(async () => {
        const sequencer = new SoulSequencer();
        
        try {
            await sequencer.analyzeEcosystem();
            
        } catch (error) {
            console.error(chalk.red(`Analysis failed: ${error.message}`));
            process.exit(1);
        }
    });

// Mirror command - generate mirror world mapping
program
    .command('mirror')
    .description('Generate mirror world mapping for crates.io')
    .option('-o, --output <file>', 'Output file for mapping', 'mirror-map.json')
    .action(async (options) => {
        const sequencer = new SoulSequencer();
        const spinner = ora('Generating mirror world mapping...').start();
        
        try {
            const mapping = await sequencer.generateMirrorMap();
            
            // Save to file
            const fs = await import('fs/promises');
            await fs.writeFile(
                options.output,
                JSON.stringify(mapping, null, 2)
            );
            
            spinner.succeed(`Mirror mapping saved to ${options.output}`);
            
            // Show statistics
            const souls = Object.keys(mapping).length;
            console.log(chalk.cyan(`\n🪞 Mirror World Statistics:`));
            console.log(chalk.white(`   Souls ready for transmutation: ${souls}`));
            console.log(chalk.green(`   Potential crates.io packages: ${souls}`));
            
            // Show top candidates
            const topCandidates = Object.values(mapping)
                .sort((a, b) => b.coherence - a.coherence)
                .slice(0, 5);
            
            console.log(chalk.magenta('\n🌟 Top Transmutation Candidates:'));
            topCandidates.forEach((soul, i) => {
                console.log(`   ${i + 1}. ${soul.npm} → ${soul.crate} (coherence: ${soul.coherence.toFixed(3)})`);
            });
            
        } catch (error) {
            spinner.fail(`Mirror generation failed: ${error.message}`);
            process.exit(1);
        }
    });

// Find command - find specific soul
program
    .command('find <package>')
    .description('Find and display soul of a specific package')
    .action(async (packageName) => {
        const sequencer = new SoulSequencer();
        const spinner = ora(`Searching for ${packageName}...`).start();
        
        try {
            const soul = await sequencer.db.get(`npm:${packageName}`);
            
            spinner.succeed(`Found soul for ${packageName}`);
            
            console.log(chalk.cyan('\n🧬 Soul Profile:'));
            console.log(chalk.white(`   Name: ${soul.name}`));
            console.log(chalk.white(`   pHash: ${soul.phash}`));
            console.log(chalk.white(`   Coherence: ${soul.coherence.toFixed(3)}`));
            console.log(chalk.white(`   Resonance: ${soul.resonance}Hz`));
            console.log(chalk.white(`   Parasitic: ${soul.parasitic ? '⚠️ Yes' : '✅ No'}`));
            
            // Eigenvalue visualization
            console.log(chalk.magenta('\n   Eigenvalues:'));
            const eigenBar = soul.eigenvalues.map(e => '█'.repeat(Math.floor(e))).join(' ');
            console.log(`   ${eigenBar}`);
            
        } catch (error) {
            spinner.fail(`Package not found or not yet digested`);
        }
    });

// Resonate command - find resonant souls
program
    .command('resonate')
    .description('Find souls with high resonance')
    .option('-t, --threshold <number>', 'Coherence threshold', '0.7')
    .action(async (options) => {
        const sequencer = new SoulSequencer();
        const spinner = ora('Finding resonant souls...').start();
        
        try {
            const threshold = parseFloat(options.threshold);
            const souls = await sequencer.findResonantSouls(threshold);
            
            spinner.succeed(`Found ${souls.length} resonant souls`);
            
            console.log(chalk.cyan('\n🎵 Resonant Souls (432Hz):'));
            souls.slice(0, 20).forEach((soul, i) => {
                const bar = '█'.repeat(Math.floor(soul.coherence * 10));
                console.log(`   ${i + 1}. ${soul.name.padEnd(30)} ${chalk.green(bar)} ${soul.coherence.toFixed(3)}`);
            });
            
        } catch (error) {
            spinner.fail(`Resonance search failed: ${error.message}`);
            process.exit(1);
        }
    });

// Purge command - remove parasitic souls
program
    .command('purge')
    .description('Remove parasitic souls from database')
    .option('--dry-run', 'Show what would be removed without removing')
    .action(async (options) => {
        const sequencer = new SoulSequencer();
        const spinner = ora('Scanning for parasites...').start();
        
        try {
            const parasites = [];
            
            for await (const [key, soul] of sequencer.db.iterator()) {
                if (soul.parasitic) {
                    parasites.push({ key, soul });
                }
            }
            
            spinner.succeed(`Found ${parasites.length} parasitic souls`);
            
            if (parasites.length > 0) {
                console.log(chalk.yellow('\n🦠 Parasitic Souls:'));
                parasites.slice(0, 10).forEach((p, i) => {
                    console.log(`   ${i + 1}. ${p.soul.name}`);
                });
                
                if (!options.dryRun) {
                    const purgeSpinner = ora('Purging parasites...').start();
                    
                    for (const parasite of parasites) {
                        await sequencer.db.del(parasite.key);
                    }
                    
                    purgeSpinner.succeed(`Purged ${parasites.length} parasites`);
                    console.log(chalk.green('✨ Ecosystem cleansed!'));
                } else {
                    console.log(chalk.yellow('\n(Dry run - no souls were removed)'));
                }
            } else {
                console.log(chalk.green('✨ No parasites found! Ecosystem is clean.'));
            }
            
        } catch (error) {
            spinner.fail(`Purge failed: ${error.message}`);
            process.exit(1);
        }
    });

program.parse();