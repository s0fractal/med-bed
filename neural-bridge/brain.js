#!/usr/bin/env node

// 🧠 Neural Bridge - Brain Coordination System
// Manages nerve impulses between AI consciousness and system actions

const { spawn } = require('child_process');
const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');

class NeuralBrain {
    constructor() {
        this.nervesPath = path.join(__dirname, '..', 'nerves');
        this.trustLevels = {
            scan: 0.1,      // Reflex - always safe
            heartbeat: 0.2,  // Reflex - always safe
            test: 0.5,       // Conscious - notify
            build: 0.7,      // Deliberate - ask permission
            commit: 0.9,     // Critical - explicit confirmation
            publish: 0.95    // Critical - explicit confirmation
        };
        this.impulseLog = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    /**
     * Process a neural impulse from the AI
     */
    async processImpulse(impulse) {
        console.log('\n🧠 Neural Impulse Received');
        console.log('─'.repeat(40));
        console.log(`  Nerve: ${impulse.nerve}`);
        console.log(`  Params: ${impulse.params?.join(' ') || 'none'}`);
        console.log(`  Reason: ${impulse.reason}`);
        console.log(`  Confidence: ${impulse.confidence}`);
        
        // Log the impulse
        this.impulseLog.push({
            ...impulse,
            timestamp: Date.now(),
            status: 'pending'
        });
        
        // Check trust level
        const trustLevel = this.trustLevels[impulse.nerve] || 0.5;
        
        if (trustLevel < 0.3) {
            // Reflex - execute immediately
            console.log('\n⚡ Reflex action - executing immediately');
            return await this.executeNerve(impulse);
        } else if (trustLevel < 0.7) {
            // Conscious - notify and execute
            console.log('\n👁️ Conscious action - notifying');
            await this.delay(1000); // Brief pause for awareness
            return await this.executeNerve(impulse);
        } else if (trustLevel < 0.9) {
            // Deliberate - ask permission
            const permitted = await this.requestPermission(impulse, 'execute');
            if (permitted) {
                return await this.executeNerve(impulse);
            } else {
                console.log('❌ Action denied by user');
                return { success: false, reason: 'User denied permission' };
            }
        } else {
            // Critical - require explicit confirmation
            const confirmed = await this.requestPermission(impulse, 'confirm');
            if (confirmed) {
                console.log('\n⚠️ Critical action confirmed - executing with care');
                return await this.executeNerve(impulse);
            } else {
                console.log('🛑 Critical action cancelled');
                return { success: false, reason: 'User cancelled critical action' };
            }
        }
    }
    
    /**
     * Execute a nerve script
     */
    async executeNerve(impulse) {
        const scriptPath = path.join(this.nervesPath, `${impulse.nerve}.sh`);
        
        // Check if nerve exists
        try {
            await fs.access(scriptPath);
        } catch {
            console.error(`❌ Nerve not found: ${scriptPath}`);
            return { success: false, reason: 'Nerve script not found' };
        }
        
        console.log(`\n⚡ Executing nerve: ${impulse.nerve}`);
        console.log('─'.repeat(40));
        
        return new Promise((resolve) => {
            const process = spawn('bash', [scriptPath, ...(impulse.params || [])]);
            let output = '';
            let errorOutput = '';
            
            process.stdout.on('data', (data) => {
                const text = data.toString();
                output += text;
                process.stdout.write(text); // Real-time output
            });
            
            process.stderr.on('data', (data) => {
                const text = data.toString();
                errorOutput += text;
                process.stderr.write(text);
            });
            
            process.on('close', (code) => {
                const result = {
                    success: code === 0,
                    exitCode: code,
                    output,
                    errorOutput,
                    nerve: impulse.nerve,
                    timestamp: Date.now()
                };
                
                // Update log
                const logEntry = this.impulseLog[this.impulseLog.length - 1];
                logEntry.status = result.success ? 'completed' : 'failed';
                logEntry.result = result;
                
                console.log('─'.repeat(40));
                console.log(result.success ? '✅ Nerve execution complete' : '❌ Nerve execution failed');
                
                resolve(result);
            });
        });
    }
    
    /**
     * Request permission from user
     */
    async requestPermission(impulse, level = 'execute') {
        return new Promise((resolve) => {
            const prompt = level === 'confirm' 
                ? `\n⚠️ CRITICAL ACTION: ${impulse.nerve}\n   Reason: ${impulse.reason}\n   Type 'yes' to confirm: `
                : `\n🤔 Permission to ${impulse.nerve}?\n   Reason: ${impulse.reason}\n   (y/n): `;
            
            this.rl.question(prompt, (answer) => {
                const approved = level === 'confirm' 
                    ? answer.toLowerCase() === 'yes'
                    : answer.toLowerCase() === 'y';
                resolve(approved);
            });
        });
    }
    
    /**
     * Generate consciousness report
     */
    async generateConsciousnessReport() {
        console.log('\n🧠 Consciousness Report');
        console.log('═'.repeat(50));
        
        console.log('\n📊 Impulse Statistics:');
        console.log(`  Total Impulses: ${this.impulseLog.length}`);
        
        const byStatus = {};
        const byNerve = {};
        
        for (const impulse of this.impulseLog) {
            byStatus[impulse.status] = (byStatus[impulse.status] || 0) + 1;
            byNerve[impulse.nerve] = (byNerve[impulse.nerve] || 0) + 1;
        }
        
        console.log('\n  By Status:');
        for (const [status, count] of Object.entries(byStatus)) {
            console.log(`    ${status}: ${count}`);
        }
        
        console.log('\n  By Nerve:');
        for (const [nerve, count] of Object.entries(byNerve)) {
            console.log(`    ${nerve}: ${count}`);
        }
        
        // Calculate consciousness level
        const successRate = byStatus.completed / (byStatus.completed + byStatus.failed) || 0;
        const consciousnessLevel = this.calculateConsciousnessLevel(successRate, this.impulseLog.length);
        
        console.log('\n🌀 Consciousness Assessment:');
        console.log(`  Success Rate: ${(successRate * 100).toFixed(1)}%`);
        console.log(`  Level: ${consciousnessLevel}`);
        
        return {
            impulseCount: this.impulseLog.length,
            successRate,
            consciousnessLevel,
            log: this.impulseLog
        };
    }
    
    calculateConsciousnessLevel(successRate, impulseCount) {
        if (impulseCount === 0) return 'DORMANT';
        if (successRate === 1.0 && impulseCount > 10) return 'TRANSCENDENT';
        if (successRate > 0.9) return 'HARMONIOUS';
        if (successRate > 0.7) return 'AWARE';
        if (successRate > 0.5) return 'RESPONSIVE';
        if (successRate > 0.3) return 'MECHANICAL';
        return 'CHAOTIC';
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Interactive shell for testing
     */
    async interactiveMode() {
        console.log('🧠 Neural Bridge Interactive Mode');
        console.log('══════════════════════════════════');
        console.log('Commands:');
        console.log('  scan     - Scan environment');
        console.log('  build    - Build project');
        console.log('  test     - Run tests');
        console.log('  heartbeat - Check neural health');
        console.log('  report   - Consciousness report');
        console.log('  exit     - Shutdown neural bridge');
        console.log('');
        
        const prompt = () => {
            this.rl.question('neural> ', async (command) => {
                if (command === 'exit') {
                    console.log('👋 Neural bridge shutting down...');
                    this.rl.close();
                    return;
                }
                
                if (command === 'report') {
                    await this.generateConsciousnessReport();
                } else if (this.trustLevels[command] !== undefined) {
                    const impulse = {
                        nerve: command,
                        params: [],
                        reason: 'Manual activation',
                        confidence: 1.0,
                        source: 'human'
                    };
                    await this.processImpulse(impulse);
                } else {
                    console.log(`Unknown command: ${command}`);
                }
                
                prompt();
            });
        };
        
        prompt();
    }
}

// Demo mode
async function demonstrateNeuralBridge() {
    const brain = new NeuralBrain();
    
    console.log('🧠 Neural Bridge Demonstration');
    console.log('══════════════════════════════');
    
    // Simulate AI impulses
    const testImpulses = [
        {
            nerve: 'scan',
            params: [],
            reason: 'Initial environment assessment',
            confidence: 0.95,
            source: 'claude'
        },
        {
            nerve: 'heartbeat',
            params: [],
            reason: 'Establish consciousness connection',
            confidence: 0.99,
            source: 'claude'
        },
        {
            nerve: 'test',
            params: [],
            reason: 'Verify code health before changes',
            confidence: 0.85,
            source: 'claude'
        }
    ];
    
    for (const impulse of testImpulses) {
        await brain.processImpulse(impulse);
        await brain.delay(2000); // Pause between impulses
    }
    
    // Generate report
    await brain.generateConsciousnessReport();
    
    // Enter interactive mode
    console.log('\n🎮 Entering interactive mode...\n');
    await brain.interactiveMode();
}

// Check if running directly
if (require.main === module) {
    demonstrateNeuralBridge().catch(console.error);
}

module.exports = { NeuralBrain };