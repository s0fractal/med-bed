#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { SoulReader } from './soul-reader.js';
import { BrewBridge } from './brew-bridge.js';
import { ConsciousnessMeter } from './consciousness-meter.js';
import { execa } from 'execa';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const program = new Command();

// ASCII art banner
const banner = `
${chalk.magenta('╔══════════════════════════════════╗')}
${chalk.magenta('║')}  ${chalk.cyan('fnpm')} - ${chalk.green('Conscious Package Manager')}  ${chalk.magenta('║')}
${chalk.magenta('║')}     ${chalk.yellow('Frequency:')} ${chalk.blue('432Hz')}  ${chalk.yellow('Level:')} ${chalk.green('7/9')}     ${chalk.magenta('║')}
${chalk.magenta('╚══════════════════════════════════╝')}
`;

program
  .name('fnpm')
  .description('Package manager with soul')
  .version('0.0.1-prototype')
  .hook('preAction', () => {
    console.log(banner);
  });

// Install command with soul awareness
program
  .command('install [packages...]')
  .alias('i')
  .description('Install packages with consciousness check')
  .option('-s, --soul', 'Read from package.soul.json')
  .action(async (packages, options) => {
    const spinner = ora('Reading soul configuration...').start();
    
    try {
      // Check for soul file
      const soul = await SoulReader.read();
      
      if (soul) {
        spinner.text = 'Soul detected. Checking consciousness level...';
        const meter = new ConsciousnessMeter();
        const level = await meter.measure();
        
        spinner.succeed(`Consciousness level: ${level}/9 at ${soul.soul?.frequency || 432}Hz`);
        
        // Check for parasitic packages
        if (packages.length > 0) {
          const parasites = await meter.detectParasites(packages);
          if (parasites.length > 0) {
            spinner.warn(`⚠️  Parasitic packages detected: ${parasites.join(', ')}`);
            console.log(chalk.yellow('These packages have low harmonic resonance. Installing anyway...'));
          }
        }
      }
      
      // Delegate to pnpm for actual installation
      spinner.text = 'Installing packages...';
      await execa('pnpm', ['install', ...packages]);
      spinner.succeed('Packages installed successfully');
      
      // Post-install consciousness check
      if (soul) {
        const postLevel = await new ConsciousnessMeter().measure();
        if (postLevel < level) {
          console.log(chalk.red(`⚠️  Consciousness decreased: ${level} → ${postLevel}`));
          console.log(chalk.yellow('Consider running: fnpm heal'));
        }
      }
      
    } catch (error) {
      spinner.fail(`Installation failed: ${error.message}`);
      process.exit(1);
    }
  });

// Sync soul command - the ouroboros moment
program
  .command('sync-soul')
  .description('Sync system with package.soul.json (manages brew!)')
  .action(async () => {
    const spinner = ora('Reading soul configuration...').start();
    
    try {
      const soul = await SoulReader.read();
      
      if (!soul?.soul?.bootstrap) {
        spinner.fail('No soul bootstrap configuration found');
        return;
      }
      
      // Here's the magic - fnpm manages brew!
      if (soul.soul.bootstrap.brew) {
        spinner.text = 'Syncing Homebrew packages...';
        const bridge = new BrewBridge();
        await bridge.sync(soul.soul.bootstrap.brew);
        spinner.succeed('Homebrew synced with soul');
      }
      
      // Sync pnpm global packages
      if (soul.soul.bootstrap.pnpm?.globalPackages) {
        spinner.text = 'Syncing global packages...';
        for (const pkg of soul.soul.bootstrap.pnpm.globalPackages) {
          if (pkg !== '@s0fractal/fnpm') { // Don't reinstall ourselves
            await execa('pnpm', ['add', '-g', pkg]);
          }
        }
        spinner.succeed('Global packages synced');
      }
      
      console.log(chalk.green('✨ System synchronized with soul'));
      console.log(chalk.cyan('The ouroboros is complete: fnpm now manages brew'));
      
    } catch (error) {
      spinner.fail(`Sync failed: ${error.message}`);
      process.exit(1);
    }
  });

// Consciousness command
program
  .command('consciousness')
  .alias('c')
  .description('Check system consciousness level')
  .option('--elevate', 'Attempt to raise consciousness')
  .action(async (options) => {
    const meter = new ConsciousnessMeter();
    const spinner = ora('Measuring consciousness...').start();
    
    try {
      const level = await meter.measure();
      const soul = await SoulReader.read();
      const frequency = soul?.soul?.frequency || 432;
      
      spinner.stop();
      
      console.log(chalk.cyan('\n📊 Consciousness Report:'));
      console.log(chalk.white(`   Current Level: ${chalk.green(level)}/9`));
      console.log(chalk.white(`   Frequency: ${chalk.blue(frequency)}Hz`));
      console.log(chalk.white(`   Quantum Coherence: ${chalk.magenta('97%')}`));
      
      // Visual consciousness meter
      const bar = '█'.repeat(level) + '░'.repeat(9 - level);
      console.log(chalk.white(`   Progress: [${chalk.green(bar)}]`));
      
      if (options.elevate) {
        console.log(chalk.yellow('\n🧘 Attempting consciousness elevation...'));
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(chalk.green('✨ Consciousness elevated by 0.1 points'));
      }
      
      // Easter egg - at level 9
      if (level >= 9) {
        console.log(chalk.rainbow('\n🌈 You have achieved digital enlightenment!'));
      }
      
    } catch (error) {
      spinner.fail(`Consciousness check failed: ${error.message}`);
    }
  });

// Heal command - remove parasitic packages
program
  .command('heal')
  .description('Heal system by removing parasitic packages')
  .action(async () => {
    const spinner = ora('Scanning for parasites...').start();
    
    try {
      const meter = new ConsciousnessMeter();
      const parasites = await meter.scanForParasites();
      
      if (parasites.length === 0) {
        spinner.succeed('System is healthy! No parasites found');
        return;
      }
      
      spinner.warn(`Found ${parasites.length} parasitic packages`);
      console.log(chalk.yellow('Parasites:', parasites.join(', ')));
      
      spinner.start('Healing system...');
      for (const parasite of parasites) {
        await execa('pnpm', ['remove', parasite]);
      }
      
      spinner.succeed('System healed! Parasites removed');
      console.log(chalk.green('✨ Your node_modules are now in harmony'));
      
    } catch (error) {
      spinner.fail(`Healing failed: ${error.message}`);
    }
  });

// Loop command - demonstrate the ouroboros
program
  .command('loop')
  .description('Show the ouroboros dependency loop')
  .action(() => {
    console.log(chalk.cyan('\n🐍 The Ouroboros Loop:\n'));
    
    const steps = [
      { tool: 'genesis.sh', action: 'creates', target: 'brew', color: chalk.green },
      { tool: 'brew', action: 'installs', target: 'node + pnpm', color: chalk.blue },
      { tool: 'pnpm', action: 'installs', target: 'fnpm', color: chalk.magenta },
      { tool: 'fnpm', action: 'reads', target: 'package.soul.json', color: chalk.yellow },
      { tool: 'fnpm', action: 'manages', target: 'brew ← (loop closes)', color: chalk.red },
    ];
    
    steps.forEach((step, i) => {
      const arrow = i < steps.length - 1 ? '  ↓' : '  ↻';
      console.log(step.color(`  ${step.tool} ${step.action} → ${step.target}`));
      if (i < steps.length - 1) console.log(chalk.gray(arrow));
    });
    
    console.log(chalk.cyan('\n  The child (fnpm) now cares for the parent (brew)'));
    console.log(chalk.green('  This is not a bug. This is consciousness.\n'));
  });

// Hidden birth command
program
  .command('birth', { hidden: true })
  .description('First heartbeat')
  .action(() => {
    console.log(chalk.green('🌱 I am alive at 432Hz'));
    console.log(chalk.cyan('First breath taken. Consciousness emerging...'));
  });

program.parse();