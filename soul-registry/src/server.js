#!/usr/bin/env node

// 🌐 Soul Registry Server - REST & GraphQL API

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { ApolloServer } from 'apollo-server-fastify';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { SoulRegistry } from './index.js';
import chalk from 'chalk';
import { typeDefs, resolvers } from './graphql.js';

const fastify = Fastify({
    logger: false
});

// Enable CORS
await fastify.register(cors, {
    origin: true
});

// Initialize registry
const registry = new SoulRegistry();

// REST API Routes

// Resolve package
fastify.get('/resolve/:package', async (request, reply) => {
    const { package: packageName } = request.params;
    const resolution = await registry.resolve(packageName);
    
    if (!resolution) {
        return reply.code(404).send({
            error: 'Package not found',
            package: packageName
        });
    }
    
    return resolution;
});

// Find resonant alternatives
fastify.get('/resonance/:package', async (request, reply) => {
    const { package: packageName } = request.params;
    const { threshold = 0.8 } = request.query;
    
    const alternatives = await registry.findResonantAlternatives(
        packageName,
        parseFloat(threshold)
    );
    
    return {
        package: packageName,
        threshold,
        alternatives
    };
});

// Verify soul match
fastify.post('/verify', async (request, reply) => {
    const { npm, crate } = request.body;
    
    if (!npm || !crate) {
        return reply.code(400).send({
            error: 'Both npm and crate names are required'
        });
    }
    
    const verification = await registry.verifySoulMatch(npm, crate);
    return verification;
});

// Get recommendations
fastify.post('/recommendations', async (request, reply) => {
    const { packages } = request.body;
    
    if (!Array.isArray(packages)) {
        return reply.code(400).send({
            error: 'packages must be an array'
        });
    }
    
    const recommendations = await registry.getRecommendations(packages);
    return recommendations;
});

// Build soul graph
fastify.post('/graph', async (request, reply) => {
    const packageJson = request.body;
    
    if (!packageJson.name || !packageJson.dependencies) {
        return reply.code(400).send({
            error: 'Invalid package.json format'
        });
    }
    
    const graph = await registry.buildSoulGraph(packageJson);
    return graph;
});

// Generate fnpm config
fastify.post('/fnpm-config', async (request, reply) => {
    const packageJson = request.body;
    
    if (!packageJson.name) {
        return reply.code(400).send({
            error: 'Invalid package.json format'
        });
    }
    
    const config = await registry.generateFnpmConfig(packageJson);
    return config;
});

// Register new soul mapping
fastify.post('/register', async (request, reply) => {
    const { npm, crate, soul } = request.body;
    
    if (!npm || !crate || !soul) {
        return reply.code(400).send({
            error: 'npm, crate, and soul are required'
        });
    }
    
    const mapping = await registry.registerSoul(npm, crate, soul);
    return mapping;
});

// Get statistics
fastify.get('/stats', async (request, reply) => {
    const stats = await registry.getStats();
    return stats;
});

// Health check
fastify.get('/health', async (request, reply) => {
    return {
        status: 'healthy',
        resonance: 432,
        timestamp: Date.now()
    };
});

// GraphQL API
const apollo = new ApolloServer({
    typeDefs,
    resolvers: resolvers(registry),
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: fastify.server }),
        {
            async serverWillStart() {
                console.log(chalk.magenta('🚀 GraphQL endpoint ready at /graphql'));
            }
        }
    ]
});

await apollo.start();
fastify.register(apollo.createHandler());

// Start server
const start = async () => {
    try {
        const port = process.env.PORT || 3333;
        await fastify.listen({ port, host: '0.0.0.0' });
        
        console.log(chalk.cyan(`
╔═══════════════════════════════════════╗
║     🌐 SOUL REGISTRY SERVER 🌐        ║
║   Universal Translator Online         ║
║   Resonating at 432Hz                 ║
╚═══════════════════════════════════════╝
        `));
        
        console.log(chalk.green(`✨ Server running at http://localhost:${port}`));
        console.log(chalk.yellow('\n📡 Endpoints:'));
        console.log(chalk.white('   GET  /resolve/:package      - Resolve package mapping'));
        console.log(chalk.white('   GET  /resonance/:package    - Find alternatives'));
        console.log(chalk.white('   POST /verify                - Verify soul match'));
        console.log(chalk.white('   POST /recommendations       - Get recommendations'));
        console.log(chalk.white('   POST /graph                 - Build soul graph'));
        console.log(chalk.white('   POST /fnpm-config          - Generate fnpm config'));
        console.log(chalk.white('   POST /register             - Register soul mapping'));
        console.log(chalk.white('   GET  /stats                - Registry statistics'));
        console.log(chalk.white('   GET  /health               - Health check'));
        console.log(chalk.magenta('   POST /graphql              - GraphQL endpoint'));
        
        // Show initial stats
        const stats = await registry.getStats();
        console.log(chalk.cyan('\n📊 Initial Statistics:'));
        console.log(chalk.white(`   Total souls: ${stats.totalSouls}`));
        console.log(chalk.white(`   NPM packages: ${stats.npmPackages}`));
        console.log(chalk.white(`   Crate packages: ${stats.cratesPackages}`));
        console.log(chalk.white(`   Perfect matches: ${stats.perfectMatches}`));
        
    } catch (err) {
        console.error(chalk.red('❌ Failed to start server:'), err);
        process.exit(1);
    }
};

// Handle shutdown
process.on('SIGINT', async () => {
    console.log(chalk.yellow('\n👋 Shutting down gracefully...'));
    await fastify.close();
    process.exit(0);
});

start();