// GraphQL Schema and Resolvers for Soul Registry

export const typeDefs = `
  type Soul {
    phash: String!
    eigenvalues: [Float!]!
    topology: Topology
    semantics: Semantics
    resonance: Float!
    coherence: Float!
  }
  
  type Topology {
    bettiNumbers: [Int!]!
    eulerChar: Int!
    diameter: Int!
    clustering: Float!
    modularity: Float!
  }
  
  type Semantics {
    operations: String
    cyclomatic: Int!
    cognitive: Int!
    depth: Int!
  }
  
  type Package {
    name: String!
    version: String!
    registry: String!
    soul: String!
  }
  
  type SoulMapping {
    npm: Package
    crate: Package
    soul: Soul!
    resonance: Float!
    coherence: Float!
    verified: Boolean!
    timestamp: String!
  }
  
  type Alternative {
    npm: Package!
    crate: Package
    soul: Soul!
    resonanceScore: Float!
  }
  
  type Recommendation {
    name: String!
    type: RecommendationType!
    coherence: Float
    alternatives: [Alternative!]
    reason: String
  }
  
  enum RecommendationType {
    REPLACE
    UPGRADE
    TRANSMUTE
    PERFECT
  }
  
  type GraphNode {
    id: String!
    label: String!
    depth: Int!
    coherence: Float!
    hasRustTwin: Boolean!
    isParasitic: Boolean!
  }
  
  type GraphEdge {
    source: String!
    target: String!
    resonance: Float!
  }
  
  type SoulGraph {
    nodes: [GraphNode!]!
    edges: [GraphEdge!]!
    stats: GraphStats!
  }
  
  type GraphStats {
    totalPackages: Int!
    resonantPackages: Int!
    parasites: Int!
    averageCoherence: Float!
  }
  
  type RegistryStats {
    totalSouls: Int!
    npmPackages: Int!
    cratesPackages: Int!
    perfectMatches: Int!
    resonantPairs: Int!
    parasites: Int!
    verifiedMappings: Int!
  }
  
  type FnpmConfig {
    soulMappings: String!
    autoTransmute: [String!]!
    parasiteReplacements: String!
    stats: ConfigStats!
  }
  
  type ConfigStats {
    mapped: Int!
    toTransmute: Int!
    parasites: Int!
  }
  
  type VerificationResult {
    verified: Boolean!
    resonance: Float
    npmSoul: String
    crateSoul: String
    reason: String
  }
  
  type Query {
    resolve(packageName: String!): SoulMapping
    findResonantAlternatives(packageName: String!, threshold: Float = 0.8): [Alternative!]!
    verifySoulMatch(npmName: String!, crateName: String!): VerificationResult!
    getRecommendations(packages: [String!]!): [Recommendation!]!
    buildSoulGraph(packageJson: String!): SoulGraph!
    generateFnpmConfig(packageJson: String!): FnpmConfig!
    getStats: RegistryStats!
    searchSouls(query: String!, limit: Int = 10): [SoulMapping!]!
  }
  
  type Mutation {
    registerSoul(npm: PackageInput!, crate: PackageInput!, soul: SoulInput!): SoulMapping!
    updateVerification(npmName: String!, crateName: String!, verified: Boolean!): VerificationResult!
    purgeSoul(phash: String!): Boolean!
  }
  
  input PackageInput {
    name: String!
    version: String!
  }
  
  input SoulInput {
    phash: String!
    eigenvalues: [Float!]!
    resonance: Float!
    coherence: Float!
  }
  
  type Subscription {
    soulRegistered: SoulMapping!
    verificationUpdated: VerificationResult!
  }
`;

export const resolvers = (registry) => ({
    Query: {
        resolve: async (_, { packageName }) => {
            return await registry.resolve(packageName);
        },
        
        findResonantAlternatives: async (_, { packageName, threshold }) => {
            return await registry.findResonantAlternatives(packageName, threshold);
        },
        
        verifySoulMatch: async (_, { npmName, crateName }) => {
            return await registry.verifySoulMatch(npmName, crateName);
        },
        
        getRecommendations: async (_, { packages }) => {
            const recs = await registry.getRecommendations(packages);
            const formatted = [];
            
            for (const [type, items] of Object.entries(recs)) {
                for (const item of items) {
                    formatted.push({
                        ...item,
                        type: type.toUpperCase()
                    });
                }
            }
            
            return formatted;
        },
        
        buildSoulGraph: async (_, { packageJson }) => {
            const parsed = JSON.parse(packageJson);
            return await registry.buildSoulGraph(parsed);
        },
        
        generateFnpmConfig: async (_, { packageJson }) => {
            const parsed = JSON.parse(packageJson);
            const config = await registry.generateFnpmConfig(parsed);
            
            return {
                soulMappings: JSON.stringify(config.soulMappings),
                autoTransmute: config.autoTransmute,
                parasiteReplacements: JSON.stringify(config.parasiteReplacements),
                stats: config.stats
            };
        },
        
        getStats: async () => {
            return await registry.getStats();
        },
        
        searchSouls: async (_, { query, limit }) => {
            const results = [];
            let count = 0;
            
            for await (const [key, value] of registry.db.iterator()) {
                if (count >= limit) break;
                
                if (key.includes(query) || 
                    value.npm?.name?.includes(query) || 
                    value.crate?.name?.includes(query)) {
                    results.push(value);
                    count++;
                }
            }
            
            return results;
        }
    },
    
    Mutation: {
        registerSoul: async (_, { npm, crate, soul }) => {
            return await registry.registerSoul(npm, crate, soul);
        },
        
        updateVerification: async (_, { npmName, crateName, verified }) => {
            // Update verification status
            const result = await registry.verifySoulMatch(npmName, crateName);
            
            if (verified !== result.verified) {
                // Update in database
                const npmMapping = await registry.db.get(`npm:${npmName}`);
                const crateMapping = await registry.db.get(`crate:${crateName}`);
                
                npmMapping.verified = verified;
                crateMapping.verified = verified;
                
                await registry.db.put(`npm:${npmName}`, npmMapping);
                await registry.db.put(`crate:${crateName}`, crateMapping);
            }
            
            return { ...result, verified };
        },
        
        purgeSoul: async (_, { phash }) => {
            try {
                await registry.db.del(`soul:${phash}`);
                return true;
            } catch {
                return false;
            }
        }
    },
    
    Subscription: {
        soulRegistered: {
            subscribe: () => {
                // Would implement with GraphQL subscriptions
                return registry.on('soul-registered');
            }
        },
        
        verificationUpdated: {
            subscribe: () => {
                return registry.on('verification-updated');
            }
        }
    }
});