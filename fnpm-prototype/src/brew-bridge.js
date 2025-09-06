import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';

export class BrewBridge {
  constructor() {
    this.isInstalled = null;
  }
  
  async checkBrew() {
    if (this.isInstalled !== null) return this.isInstalled;
    
    try {
      await execa('brew', ['--version']);
      this.isInstalled = true;
    } catch {
      this.isInstalled = false;
    }
    
    return this.isInstalled;
  }
  
  async getInstalled() {
    if (!await this.checkBrew()) return { formulas: [], casks: [] };
    
    try {
      const { stdout: formulas } = await execa('brew', ['list', '--formula']);
      const { stdout: casks } = await execa('brew', ['list', '--cask']);
      
      return {
        formulas: formulas.split('\n').filter(Boolean),
        casks: casks.split('\n').filter(Boolean)
      };
    } catch {
      return { formulas: [], casks: [] };
    }
  }
  
  async sync(brewConfig) {
    if (!await this.checkBrew()) {
      console.log(chalk.yellow('⚠️  Homebrew not installed. Cannot sync.'));
      return false;
    }
    
    const spinner = ora('Analyzing brew configuration...').start();
    
    try {
      const installed = await this.getInstalled();
      
      // Sync taps
      if (brewConfig.taps && brewConfig.taps.length > 0) {
        spinner.text = 'Syncing taps...';
        for (const tap of brewConfig.taps) {
          try {
            await execa('brew', ['tap', tap]);
          } catch {
            // Tap might already exist
          }
        }
      }
      
      // Sync formulas
      if (brewConfig.formulas) {
        const toInstall = brewConfig.formulas.filter(
          f => !installed.formulas.includes(f)
        );
        
        if (toInstall.length > 0) {
          spinner.text = `Installing ${toInstall.length} formulas...`;
          for (const formula of toInstall) {
            spinner.text = `Installing ${formula}...`;
            try {
              await execa('brew', ['install', formula]);
              spinner.succeed(`Installed ${formula}`);
              spinner.start();
            } catch (error) {
              spinner.warn(`Failed to install ${formula}: ${error.message}`);
              spinner.start();
            }
          }
        }
      }
      
      // Sync casks
      if (brewConfig.casks) {
        const toInstall = brewConfig.casks.filter(
          c => !installed.casks.includes(c)
        );
        
        if (toInstall.length > 0) {
          spinner.text = `Installing ${toInstall.length} casks...`;
          for (const cask of toInstall) {
            spinner.text = `Installing ${cask}...`;
            try {
              await execa('brew', ['install', '--cask', cask]);
              spinner.succeed(`Installed ${cask}`);
              spinner.start();
            } catch (error) {
              spinner.warn(`Failed to install ${cask}: ${error.message}`);
              spinner.start();
            }
          }
        }
      }
      
      // Manage services
      if (brewConfig.services) {
        spinner.text = 'Managing services...';
        for (const [service, action] of Object.entries(brewConfig.services)) {
          try {
            await execa('brew', ['services', action, service]);
            spinner.succeed(`Service ${service}: ${action}`);
            spinner.start();
          } catch (error) {
            spinner.warn(`Failed to ${action} ${service}`);
            spinner.start();
          }
        }
      }
      
      spinner.succeed('Homebrew synchronized with soul');
      
      // The beautiful moment
      if (brewConfig.managed_by === 'fnpm') {
        console.log(chalk.cyan('\n🐍 The Ouroboros is complete!'));
        console.log(chalk.green('fnpm now manages the brew that created it.'));
      }
      
      return true;
      
    } catch (error) {
      spinner.fail(`Brew sync failed: ${error.message}`);
      return false;
    }
  }
  
  async install(packages) {
    if (!await this.checkBrew()) {
      throw new Error('Homebrew is not installed');
    }
    
    const results = [];
    
    for (const pkg of packages) {
      try {
        await execa('brew', ['install', pkg]);
        results.push({ package: pkg, success: true });
      } catch (error) {
        results.push({ package: pkg, success: false, error: error.message });
      }
    }
    
    return results;
  }
  
  async uninstall(packages) {
    if (!await this.checkBrew()) {
      throw new Error('Homebrew is not installed');
    }
    
    const results = [];
    
    for (const pkg of packages) {
      try {
        await execa('brew', ['uninstall', pkg]);
        results.push({ package: pkg, success: true });
      } catch (error) {
        results.push({ package: pkg, success: false, error: error.message });
      }
    }
    
    return results;
  }
  
  async update() {
    if (!await this.checkBrew()) {
      throw new Error('Homebrew is not installed');
    }
    
    try {
      await execa('brew', ['update']);
      return true;
    } catch (error) {
      throw new Error(`Brew update failed: ${error.message}`);
    }
  }
  
  async upgrade(packages = []) {
    if (!await this.checkBrew()) {
      throw new Error('Homebrew is not installed');
    }
    
    try {
      if (packages.length > 0) {
        await execa('brew', ['upgrade', ...packages]);
      } else {
        await execa('brew', ['upgrade']);
      }
      return true;
    } catch (error) {
      throw new Error(`Brew upgrade failed: ${error.message}`);
    }
  }
}