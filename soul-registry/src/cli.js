#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { SoulRegistry } from './index.js';
import fs from 'fs/promises';
import path from 'path';

const program = new Command();

const banner = `
${chalk.magenta('╔═══════════════════════════════════════╗')}
${chalk.magenta('║')}  ${chalk.cyan('Soul Registry')} - ${chalk.green('Universal Translator')}  ${chalk.magenta('║')}
${chalk.magenta('║')}    ${chalk.yellow('One soul, many bodies, harmony')}      ${chalk.magenta('║')}
${chalk.magenta('╚═══════════════════════════════════════╝')}
`;

program
    .name('soul-registry')
    .description('Universal translator between NPM and Crates.io')
    .version('0.1.0')
    .hook('preAction', () => {
        console.log(banner);
    });

// Resolve command
program
    .command('resolve <package>')
    .description('Resolve package to its soul twin')
    .action(async (packageName) => {
        const registry = new SoulRegistry();
        const spinner = ora(`Resolving ${packageName}...`).start();
        
        try {
            const resolution = await registry.resolve(packageName);
            
            if (!resolution) {
                spinner.fail(`Package ${packageName} not found`);
                return;
            }
            
            spinner.succeed(`Found soul mapping for ${packageName}`);
            
            console.log(chalk.cyan('\n🧬 Soul Mapping:'));
            console.log(chalk.white(`   NPM: ${resolution.npm?.name || 'N/A'}`));
            console.log(chalk.white(`   Crate: ${resolution.crate?.name || 'N/A'}`));
            console.log(chalk.white(`   Soul: ${resolution.soul.phash.slice(0, 16)}...`));
            console.log(chalk.white(`   Coherence: ${resolution.coherence.toFixed(3)}`));
            console.log(chalk.white(`   Verified: ${resolution.verified ? '✅' : '❌'}`));
            
        } catch (error) {
            spinner.fail(`Failed: ${error.message}`);
        }
    });

// Find alternatives command
program
    .command('alternatives <package>')
    .description('Find resonant alternatives for a package')
    .option('-t, --threshold <number>', 'Resonance threshold', '0.8')
    .action(async (packageName, options) => {
        const registry = new SoulRegistry();
        const spinner = ora(`Finding alternatives for ${packageName}...`).start();
        
        try {
            const threshold = parseFloat(options.threshold);
            const alternatives = await registry.findResonantAlternatives(packageName, threshold);
            
            spinner.succeed(`Found ${alternatives.length} alternatives`);
            
            if (alternatives.length > 0) {
                console.log(chalk.cyan('\n🎵 Resonant Alternatives:'));
                alternatives.slice(0, 10).forEach((alt, i) => {
                    console.log(`   ${i + 1}. ${alt.npm.name} → ${alt.crate?.name || 'needs transmutation'}`);
                    console.log(`      Resonance: ${alt.resonance_score.toFixed(3)}`);
                });
            }
            
        } catch (error) {
            spinner.fail(`Failed: ${error.message}`);
        }
    });

// Verify command
program
    .command('verify <npm> <crate>')
    .description('Verify soul match between NPM and Crate')
    .action(async (npmName, crateName) => {
        const registry = new SoulRegistry();
        const spinner = ora(`Verifying soul match...`).start();
        
        try {
            const result = await registry.verifySoulMatch(npmName, crateName);
            
            if (result.verified) {
                spinner.succeed('Souls match! ✨');
            } else {
                spinner.fail(`Souls don't match: ${result.reason}`);
            }
            
            console.log(chalk.cyan('\n🔍 Verification Result:'));
            console.log(chalk.white(`   NPM Soul: ${result.npmSoul?.slice(0, 16) || 'N/A'}`));
            console.log(chalk.white(`   Crate Soul: ${result.crateSoul?.slice(0, 16) || 'N/A'}`));
            console.log(chalk.white(`   Resonance: ${result.resonance?.toFixed(3) || 'N/A'}`));
            console.log(chalk.white(`   Match: ${result.verified ? '✅ YES' : '❌ NO'}`));
            
        } catch (error) {
            spinner.fail(`Failed: ${error.message}`);
        }
    });

// Analyze command
program
    .command('analyze <package-json>')
    .description('Analyze package.json and get recommendations')
    .action(async (packageJsonPath) => {
        const registry = new SoulRegistry();
        const spinner = ora('Analyzing dependencies...').start();
        
        try {
            const content = await fs.readFile(packageJsonPath, 'utf-8');
            const packageJson = JSON.parse(content);
            
            const deps = Object.keys({
                ...packageJson.dependencies,
                ...packageJson.devDependencies
            });
            
            spinner.text = 'Getting recommendations...';
            const recommendations = await registry.getRecommendations(deps);
            
            spinner.succeed('Analysis complete');
            
            // Show recommendations
            if (recommendations.replace.length > 0) {
                console.log(chalk.red('\n🦠 Parasitic packages to replace:'));
                recommendations.replace.forEach(r => {
                    console.log(`   ${r.name} (coherence: ${r.coherence.toFixed(3)})`);
                    if (r.alternatives.length > 0) {
                        console.log(`      → Replace with: ${r.alternatives[0].npm.name}`);
                    }
                });
            }
            
            if (recommendations.upgrade.length > 0) {
                console.log(chalk.yellow('\n⬆️  Packages with better alternatives:'));
                recommendations.upgrade.forEach(r => {
                    console.log(`   ${r.name} (current: ${r.current_coherence.toFixed(3)})`);
                    console.log(`      → Upgrade to: ${r.better.npm.name} (${r.better.resonance_score.toFixed(3)})`);
                });
            }
            
            if (recommendations.transmute.length > 0) {
                console.log(chalk.blue('\n🔮 Packages ready for transmutation:'));
                recommendations.transmute.forEach(r => {
                    console.log(`   ${r.name} - ${r.reason}`);
                });
            }
            
            if (recommendations.perfect.length > 0) {
                console.log(chalk.green('\n✨ Perfect packages:'));
                recommendations.perfect.forEach(r => {
                    console.log(`   ${r.name} → ${r.crate || 'in progress'} (${r.coherence.toFixed(3)})`);
                });
            }
            
        } catch (error) {
            spinner.fail(`Failed: ${error.message}`);
        }
    });

// Generate fnpm config
program
    .command('generate <package-json>')
    .description('Generate fnpm configuration for automatic soul switching')
    .option('-o, --output <file>', 'Output file', '.fnpmrc.json')
    .action(async (packageJsonPath, options) => {
        const registry = new SoulRegistry();
        const spinner = ora('Generating fnpm configuration...').start();
        
        try {
            const content = await fs.readFile(packageJsonPath, 'utf-8');
            const packageJson = JSON.parse(content);
            
            const config = await registry.generateFnpmConfig(packageJson);
            
            // Write config
            await fs.writeFile(options.output, JSON.stringify(config, null, 2));
            
            spinner.succeed(`Configuration saved to ${options.output}`);
            
            console.log(chalk.cyan('\n📊 Configuration Statistics:'));
            console.log(chalk.white(`   Soul mappings: ${config.stats.mapped}`));
            console.log(chalk.white(`   To transmute: ${config.stats.toTransmute}`));
            console.log(chalk.white(`   Parasites replaced: ${config.stats.parasites}`));
            
        } catch (error) {
            spinner.fail(`Failed: ${error.message}`);
        }
    });

// Stats command
program
    .command('stats')
    .description('Show registry statistics')
    .action(async () => {
        const registry = new SoulRegistry();
        const spinner = ora('Gathering statistics...').start();
        
        try {
            const stats = await registry.getStats();
            
            spinner.succeed('Statistics gathered');
            
            console.log(chalk.cyan('\n📊 Soul Registry Statistics:'));
            console.log(chalk.white(`   Total souls: ${stats.totalSouls}`));
            console.log(chalk.white(`   NPM packages: ${stats.npmPackages}`));
            console.log(chalk.white(`   Crate packages: ${stats.cratesPackages}`));
            console.log(chalk.white(`   Perfect matches: ${stats.perfectMatches}`));
            console.log(chalk.white(`   Resonant pairs: ${stats.resonantPairs}`));
            console.log(chalk.white(`   Parasites: ${stats.parasites}`));
            console.log(chalk.white(`   Verified mappings: ${stats.verifiedMappings}`));
            
            // Visual health meter
            const health = (stats.perfectMatches / stats.totalSouls * 100) || 0;
            const bar = '█'.repeat(Math.floor(health / 2.5)) + '░'.repeat(40 - Math.floor(health / 2.5));
            
            console.log(chalk.magenta(`\n   Ecosystem Health: [${bar}] ${health.toFixed(1)}%`));
            
        } catch (error) {
            spinner.fail(`Failed: ${error.message}`);
        }
    });

// Server command
program
    .command('server')
    .description('Start the Soul Registry server')
    .option('-p, --port <number>', 'Server port', '3333')
    .action(async (options) => {
        process.env.PORT = options.port;
        await import('./server.js');
    });

program.parse();