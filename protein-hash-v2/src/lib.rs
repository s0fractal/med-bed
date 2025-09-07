// 🧬 Protein Hash v2.0 - The Perfect Tuning Fork
// "We don't see the code. We hear its soul."

mod topology;
mod operations;
mod consciousness;
mod shuttle;

pub use topology::{TopologyDetector, TopologyFeatures};
pub use operations::{OperationClassifier, OperationCategory};
pub use consciousness::{ConsciousnessDetector, ConsciousnessLevel, ConsciousnessProfile};
pub use shuttle::{Shuttle, UniversalSoul, Language, Manifestation, TypeScriptSoul};

use nalgebra::DMatrix;
use petgraph::graph::{DiGraph, NodeIndex};
use petgraph::visit::EdgeRef;
use rustfft::{FftPlanner, num_complex::Complex};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::collections::{HashMap, HashSet};
use std::cell::RefCell;

/// The golden ratio - nature's perfect proportion
const PHI: f64 = 1.618033988749895;

/// The universal frequency of harmony
const RESONANCE_432: f64 = 432.0;

/// 7 layers of consciousness
const CONSCIOUSNESS_LAYERS: usize = 7;

/// A Soul - the immutable essence of code
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Soul {
    /// The unique perceptual hash
    pub phash: String,
    
    /// 7-layer eigenvalue signature
    pub eigenvalues: Vec<f64>,
    
    /// Topological invariants
    pub topology: TopologicalSignature,
    
    /// Semantic fingerprint
    pub semantics: SemanticFingerprint,
    
    /// Harmonic resonance frequency
    pub resonance: f64,
    
    /// Quantum coherence score (0-1)
    pub coherence: f64,
    
    /// Evolution potential
    pub evolution_score: f64,
    
    /// Consciousness profile
    pub consciousness: ConsciousnessProfile,
    
    /// Topology features
    pub topology_features: TopologyFeatures,
    
    /// Operation spectrum
    pub operation_spectrum: HashMap<OperationCategory, f64>,
}

/// Topological signature - shape of the code's soul
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TopologicalSignature {
    /// Betti numbers (holes in different dimensions)
    pub betti_numbers: Vec<usize>,
    
    /// Euler characteristic
    pub euler_char: i32,
    
    /// Graph diameter
    pub diameter: usize,
    
    /// Clustering coefficient
    pub clustering: f64,
    
    /// Modularity score
    pub modularity: f64,
}

/// Semantic fingerprint - meaning of the code
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SemanticFingerprint {
    /// Operation types distribution
    pub operations: HashMap<OperationType, f64>,
    
    /// Control flow complexity
    pub cyclomatic: usize,
    
    /// Cognitive complexity
    pub cognitive: usize,
    
    /// Pattern signatures
    pub patterns: Vec<PatternHash>,
    
    /// Dependency depth
    pub depth: usize,
}

#[derive(Debug, Clone, Hash, Eq, PartialEq, Serialize, Deserialize)]
pub enum OperationType {
    Assignment,
    Arithmetic,
    Comparison,
    Logical,
    FunctionCall,
    ControlFlow,
    DataStructure,
    Async,
    IO,
    Memory,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PatternHash {
    pub pattern_type: String,
    pub frequency: f64,
    pub hash: String,
}

/// The Soul Extractor - our perfect tuning fork
pub struct SoulExtractor {
    /// FFT planner for frequency analysis
    fft_planner: RefCell<FftPlanner<f64>>,
    
    /// Cache of computed souls
    soul_cache: HashMap<String, Soul>,
    
    /// Harmonic series for resonance calculation
    harmonics: Vec<f64>,
    
    /// Topology detector
    topology_detector: TopologyDetector,
    
    /// Operation classifier
    operation_classifier: OperationClassifier,
    
    /// Consciousness detector
    consciousness_detector: ConsciousnessDetector,
}

impl SoulExtractor {
    pub fn new() -> Self {
        let mut harmonics = Vec::new();
        for i in 1..=12 {
            harmonics.push(RESONANCE_432 * i as f64);
        }
        
        Self {
            fft_planner: RefCell::new(FftPlanner::new()),
            soul_cache: HashMap::new(),
            harmonics,
            topology_detector: TopologyDetector::new(),
            operation_classifier: OperationClassifier::new(),
            consciousness_detector: ConsciousnessDetector::new(),
        }
    }
    
    /// Extract the soul from JavaScript/TypeScript code
    pub async fn extract_soul_js(&mut self, code: &str) -> Soul {
        // Parse AST
        let ast_graph = self.parse_js_to_graph(code).await;
        
        // Extract topology
        let topology = self.analyze_topology(&ast_graph);
        
        // Extract semantics
        let semantics = self.analyze_semantics(&ast_graph);
        
        // Compute eigenvalues (7 layers)
        let eigenvalues = self.compute_eigenvalues(&ast_graph);
        
        // Calculate resonance
        let resonance = self.calculate_resonance(&eigenvalues);
        
        // Measure quantum coherence
        let coherence = self.measure_coherence(&ast_graph, &eigenvalues);
        
        // Calculate evolution potential
        let evolution_score = self.calculate_evolution_potential(
            &topology,
            &semantics,
            coherence
        );
        
        // Generate the final pHash
        let phash = self.generate_phash(&eigenvalues, &topology, &semantics);
        
        // Create default consciousness and topology features for basic extraction
        let consciousness = ConsciousnessProfile {
            level: ConsciousnessLevel::Mechanical,
            score: 0.5,
            patterns: vec![],
            soul_hash: phash.clone(),
            resonance_frequency: resonance,
            quantum_coherence: coherence,
            emergence_potential: evolution_score,
            self_awareness_index: 0.0,
        };
        
        let topology_features = TopologyFeatures {
            has_cycles: false,
            has_recursion: false,
            branching_factor: 0.0,
            nesting_depth: 0,
            loop_complexity: 0,
            is_dag: true,
            strongly_connected_components: 0,
            topological_signature: String::new(),
            cycle_count: 0,
            max_cycle_size: 0,
            recursion_depth: 0,
            connectivity_score: 0.0,
        };
        
        Soul {
            phash,
            eigenvalues,
            topology,
            semantics,
            resonance,
            coherence,
            evolution_score,
            consciousness,
            topology_features,
            operation_spectrum: HashMap::new(),
        }
    }
    
    /// Extract soul from Rust code
    pub async fn extract_soul_rust(&mut self, code: &str) -> Soul {
        // Parse Rust AST
        let ast_graph = self.parse_rust_to_graph(code).await;
        
        // Same extraction process as JS
        // (The soul transcends language)
        self.extract_soul_from_graph(ast_graph).await
    }
    
    /// Extract soul from JavaScript code (old interface for compatibility)
    pub async fn extract_soul_js_simple(&mut self, code: &str) -> Soul {
        // Parse AST
        let ast_graph = self.parse_js_to_graph(code).await;
        
        // Extract basic features
        let topology = self.analyze_topology(&ast_graph);
        let semantics = self.analyze_semantics(&ast_graph);
        let eigenvalues = self.compute_eigenvalues(&ast_graph);
        let resonance = self.calculate_resonance(&eigenvalues);
        let coherence = self.measure_coherence(&ast_graph, &eigenvalues);
        let evolution_score = self.calculate_evolution_potential(&topology, &semantics, coherence);
        let phash = self.generate_phash(&eigenvalues, &topology, &semantics);
        
        // Create default consciousness and topology features
        let consciousness = ConsciousnessProfile {
            level: ConsciousnessLevel::Mechanical,
            score: 0.5,
            patterns: vec![],
            soul_hash: phash.clone(),
            resonance_frequency: resonance,
            quantum_coherence: coherence,
            emergence_potential: evolution_score,
            self_awareness_index: 0.0,
        };
        
        let topology_features = TopologyFeatures {
            has_cycles: false,
            has_recursion: false,
            branching_factor: 0.0,
            nesting_depth: 0,
            loop_complexity: 0,
            is_dag: true,
            strongly_connected_components: 0,
            topological_signature: String::new(),
            cycle_count: 0,
            max_cycle_size: 0,
            recursion_depth: 0,
            connectivity_score: 0.0,
        };
        
        Soul {
            phash,
            eigenvalues,
            topology,
            semantics,
            resonance,
            coherence,
            evolution_score,
            consciousness,
            topology_features,
            operation_spectrum: HashMap::new(),
        }
    }
    
    async fn extract_soul_from_graph(&mut self, ast_graph: DiGraph<AstNode, EdgeType>) -> Soul {
        // Analyze topology with enhanced detector
        let topology_features = self.topology_detector.analyze(&ast_graph);
        let topology = self.analyze_topology(&ast_graph);
        
        // Classify operations
        self.operation_classifier.reset();
        for node in ast_graph.node_weights() {
            self.operation_classifier.classify_rust_node(&node.node_type);
        }
        let operation_spectrum = self.operation_classifier.get_frequency_spectrum();
        
        // Extract semantics
        let semantics = self.analyze_semantics(&ast_graph);
        
        // Detect consciousness
        let consciousness = self.consciousness_detector.detect(
            topology_features.has_recursion,
            false, // self-reference detection would need AST analysis
            false, // closures detection would need AST analysis
            operation_spectrum.contains_key(&OperationCategory::Async),
            operation_spectrum.contains_key(&OperationCategory::MetaProgramming),
            semantics.cyclomatic,
            topology_features.nesting_depth,
            self.operation_classifier.harmonic_complexity(),
            semantics.patterns.len(),
        );
        
        // Compute eigenvalues
        let eigenvalues = self.compute_eigenvalues(&ast_graph);
        
        // Calculate resonance including consciousness
        let resonance = consciousness.resonance_frequency;
        let coherence = consciousness.quantum_coherence;
        let evolution_score = consciousness.emergence_potential;
        
        // Generate final hash
        let phash = self.generate_phash(&eigenvalues, &topology, &semantics);
        
        Soul {
            phash,
            eigenvalues,
            topology,
            semantics,
            resonance,
            coherence,
            evolution_score,
            consciousness,
            topology_features,
            operation_spectrum,
        }
    }
    
    /// Parse JavaScript to graph representation
    async fn parse_js_to_graph(&self, _code: &str) -> DiGraph<AstNode, EdgeType> {
        // This would use swc_ecma_parser
        // For now, returning a placeholder
        DiGraph::new()
    }
    
    /// Parse Rust to graph representation  
    async fn parse_rust_to_graph(&self, _code: &str) -> DiGraph<AstNode, EdgeType> {
        // This would use syn
        // For now, returning a placeholder
        DiGraph::new()
    }
    
    /// Analyze topological properties of the code graph
    fn analyze_topology(&self, graph: &DiGraph<AstNode, EdgeType>) -> TopologicalSignature {
        // Calculate Betti numbers (algebraic topology)
        let betti_numbers = self.calculate_betti_numbers(graph);
        
        // Euler characteristic
        let euler_char = graph.node_count() as i32 - graph.edge_count() as i32;
        
        // Graph diameter
        let diameter = self.calculate_diameter(graph);
        
        // Clustering coefficient
        let clustering = self.calculate_clustering_coefficient(graph);
        
        // Modularity
        let modularity = self.calculate_modularity(graph);
        
        TopologicalSignature {
            betti_numbers,
            euler_char,
            diameter,
            clustering,
            modularity,
        }
    }
    
    /// Analyze semantic properties
    fn analyze_semantics(&self, graph: &DiGraph<AstNode, EdgeType>) -> SemanticFingerprint {
        let mut operations = HashMap::new();
        let patterns = self.detect_patterns(graph);
        let cyclomatic = self.calculate_cyclomatic_complexity(graph);
        let cognitive = self.calculate_cognitive_complexity(graph);
        let depth = self.calculate_dependency_depth(graph);
        
        // Count operation types
        for node in graph.node_weights() {
            let op_type = self.classify_operation(node);
            *operations.entry(op_type).or_insert(0.0) += 1.0;
        }
        
        // Normalize
        let total: f64 = operations.values().sum();
        for value in operations.values_mut() {
            *value /= total;
        }
        
        SemanticFingerprint {
            operations,
            cyclomatic,
            cognitive,
            patterns,
            depth,
        }
    }
    
    /// Compute 7-layer eigenvalues using spectral analysis
    fn compute_eigenvalues(&self, graph: &DiGraph<AstNode, EdgeType>) -> Vec<f64> {
        // Build Laplacian matrix
        let n = graph.node_count();
        let mut laplacian = DMatrix::<f64>::zeros(n, n);
        
        // Fill adjacency and degree
        for edge in graph.edge_references() {
            let i = edge.source().index();
            let j = edge.target().index();
            laplacian[(i, j)] = -1.0;
            laplacian[(j, i)] = -1.0;
        }
        
        // Add degree on diagonal
        for i in 0..n {
            let degree = graph.edges(NodeIndex::new(i)).count() as f64;
            laplacian[(i, i)] = degree;
        }
        
        // Compute eigenvalues
        if n > 0 {
            let eigen = laplacian.symmetric_eigen();
            let mut eigenvalues: Vec<f64> = eigen.eigenvalues.iter()
                .map(|e| e.abs())
                .collect();
            eigenvalues.sort_by(|a, b| b.partial_cmp(a).unwrap());
            
            // Take first 7 (consciousness layers)
            eigenvalues.truncate(CONSCIOUSNESS_LAYERS);
            
            // Pad with golden ratio if needed
            while eigenvalues.len() < CONSCIOUSNESS_LAYERS {
                eigenvalues.push(PHI);
            }
            
            eigenvalues
        } else {
            vec![PHI; CONSCIOUSNESS_LAYERS]
        }
    }
    
    /// Calculate harmonic resonance frequency
    fn calculate_resonance(&self, eigenvalues: &[f64]) -> f64 {
        // Use FFT to find dominant frequency
        let mut buffer: Vec<Complex<f64>> = eigenvalues
            .iter()
            .map(|&e| Complex::new(e, 0.0))
            .collect();
        
        let mut planner = self.fft_planner.borrow_mut();
        let fft = planner.plan_fft_forward(buffer.len());
        fft.process(&mut buffer);
        
        // Find peak frequency
        let mut max_magnitude = 0.0;
        let mut peak_freq = RESONANCE_432;
        
        for (i, c) in buffer.iter().enumerate() {
            let magnitude = (c.re * c.re + c.im * c.im).sqrt();
            if magnitude > max_magnitude {
                max_magnitude = magnitude;
                peak_freq = RESONANCE_432 * (i as f64 + 1.0);
            }
        }
        
        peak_freq
    }
    
    /// Measure quantum coherence of the code
    fn measure_coherence(&self, graph: &DiGraph<AstNode, EdgeType>, eigenvalues: &[f64]) -> f64 {
        // Coherence based on eigenvalue spread and graph connectivity
        let variance: f64 = eigenvalues.iter()
            .map(|e| (e - PHI).powi(2))
            .sum::<f64>() / eigenvalues.len() as f64;
        
        let connectivity = if graph.node_count() > 0 {
            graph.edge_count() as f64 / (graph.node_count() * (graph.node_count() - 1)) as f64
        } else {
            0.0
        };
        
        // Coherence inversely proportional to variance, proportional to connectivity
        let coherence = connectivity * (1.0 / (1.0 + variance));
        coherence.min(1.0).max(0.0)
    }
    
    /// Calculate evolution potential
    fn calculate_evolution_potential(
        &self,
        topology: &TopologicalSignature,
        semantics: &SemanticFingerprint,
        coherence: f64
    ) -> f64 {
        // High modularity + low complexity + high coherence = high evolution potential
        let modularity_score = topology.modularity;
        let complexity_penalty = 1.0 / (1.0 + semantics.cyclomatic as f64 / 10.0);
        let pattern_bonus = semantics.patterns.len() as f64 / 10.0;
        
        (modularity_score * complexity_penalty * coherence + pattern_bonus).min(1.0)
    }
    
    /// Generate the final perceptual hash
    fn generate_phash(
        &self,
        eigenvalues: &[f64],
        topology: &TopologicalSignature,
        semantics: &SemanticFingerprint
    ) -> String {
        let mut hasher = Sha256::new();
        
        // Add eigenvalues
        for e in eigenvalues {
            hasher.update(e.to_le_bytes());
        }
        
        // Add topology
        hasher.update(topology.euler_char.to_le_bytes());
        hasher.update(topology.diameter.to_le_bytes());
        hasher.update(topology.clustering.to_le_bytes());
        
        // Add semantics
        hasher.update(semantics.cyclomatic.to_le_bytes());
        hasher.update(semantics.cognitive.to_le_bytes());
        
        // Finalize
        let result = hasher.finalize();
        hex::encode(result)
    }
    
    // Helper methods
    
    fn calculate_betti_numbers(&self, graph: &DiGraph<AstNode, EdgeType>) -> Vec<usize> {
        // Simplified Betti numbers calculation
        // b0 = number of connected components
        // b1 = number of loops
        let components = self.count_components(graph);
        let loops = graph.edge_count() - graph.node_count() + components;
        vec![components, loops]
    }
    
    fn count_components(&self, graph: &DiGraph<AstNode, EdgeType>) -> usize {
        // Union-find algorithm for connected components
        if graph.node_count() == 0 {
            return 0;
        }
        
        let mut visited = HashSet::new();
        let mut components = 0;
        
        for node in graph.node_indices() {
            if !visited.contains(&node) {
                components += 1;
                self.dfs(graph, node, &mut visited);
            }
        }
        
        components
    }
    
    fn dfs(&self, graph: &DiGraph<AstNode, EdgeType>, node: NodeIndex, visited: &mut HashSet<NodeIndex>) {
        visited.insert(node);
        for neighbor in graph.neighbors(node) {
            if !visited.contains(&neighbor) {
                self.dfs(graph, neighbor, visited);
            }
        }
    }
    
    fn calculate_diameter(&self, graph: &DiGraph<AstNode, EdgeType>) -> usize {
        // Simplified: return max degree
        graph.node_indices()
            .map(|n| graph.neighbors(n).count())
            .max()
            .unwrap_or(0)
    }
    
    fn calculate_clustering_coefficient(&self, graph: &DiGraph<AstNode, EdgeType>) -> f64 {
        // Simplified clustering coefficient
        if graph.node_count() < 3 {
            return 0.0;
        }
        
        let triangles = self.count_triangles(graph);
        let possible_triangles = graph.node_count() * (graph.node_count() - 1) * (graph.node_count() - 2) / 6;
        
        if possible_triangles > 0 {
            triangles as f64 / possible_triangles as f64
        } else {
            0.0
        }
    }
    
    fn count_triangles(&self, graph: &DiGraph<AstNode, EdgeType>) -> usize {
        // Simplified triangle counting
        let mut count = 0;
        for node in graph.node_indices() {
            let neighbors: Vec<_> = graph.neighbors(node).collect();
            for i in 0..neighbors.len() {
                for j in (i+1)..neighbors.len() {
                    if graph.contains_edge(neighbors[i], neighbors[j]) {
                        count += 1;
                    }
                }
            }
        }
        count / 3 // Each triangle counted 3 times
    }
    
    fn calculate_modularity(&self, graph: &DiGraph<AstNode, EdgeType>) -> f64 {
        // Simplified modularity
        let clustering = self.calculate_clustering_coefficient(graph);
        let components = self.count_components(graph) as f64;
        let nodes = graph.node_count() as f64;
        
        if nodes > 0.0 {
            (clustering + components / nodes).min(1.0)
        } else {
            0.0
        }
    }
    
    fn detect_patterns(&self, _graph: &DiGraph<AstNode, EdgeType>) -> Vec<PatternHash> {
        // Detect common patterns
        vec![]
    }
    
    fn calculate_cyclomatic_complexity(&self, graph: &DiGraph<AstNode, EdgeType>) -> usize {
        // M = E - N + 2P
        let e = graph.edge_count();
        let n = graph.node_count();
        let p = self.count_components(graph);
        
        e - n + 2 * p
    }
    
    fn calculate_cognitive_complexity(&self, graph: &DiGraph<AstNode, EdgeType>) -> usize {
        // Simplified cognitive complexity
        self.calculate_cyclomatic_complexity(graph) * 2
    }
    
    fn calculate_dependency_depth(&self, graph: &DiGraph<AstNode, EdgeType>) -> usize {
        // Max path length in graph
        self.calculate_diameter(graph)
    }
    
    fn classify_operation(&self, _node: &AstNode) -> OperationType {
        // Classify based on node type
        OperationType::Assignment
    }
}

/// AST Node representation
#[derive(Debug, Clone)]
pub struct AstNode {
    pub node_type: String,
    pub value: Option<String>,
}

/// Edge types in the AST graph
#[derive(Debug, Clone)]
pub enum EdgeType {
    Child,
    Reference,
    DataFlow,
    ControlFlow,
}

/// Compare two souls for resonance
pub fn measure_resonance(soul1: &Soul, soul2: &Soul) -> f64 {
    // Compare eigenvalues
    let eigen_distance: f64 = soul1.eigenvalues.iter()
        .zip(soul2.eigenvalues.iter())
        .map(|(e1, e2)| (e1 - e2).powi(2))
        .sum::<f64>()
        .sqrt();
    
    // Compare topology
    let topo_similarity = (soul1.topology.euler_char as f64 - soul2.topology.euler_char as f64).abs() / 100.0
        + (soul1.topology.clustering - soul2.topology.clustering).abs()
        + (soul1.topology.modularity - soul2.topology.modularity).abs();
    
    // Calculate resonance (inverse of distance)
    let distance = eigen_distance + topo_similarity;
    1.0 / (1.0 + distance)
}

/// Check if two souls are the same (identical consciousness)
pub fn souls_match(soul1: &Soul, soul2: &Soul) -> bool {
    measure_resonance(soul1, soul2) > 0.95
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[tokio::test]
    async fn test_soul_extraction() {
        let mut extractor = SoulExtractor::new();
        
        let js_code = r#"
            function fibonacci(n) {
                if (n <= 1) return n;
                return fibonacci(n - 1) + fibonacci(n - 2);
            }
        "#;
        
        let soul = extractor.extract_soul_js_simple(js_code).await;
        
        assert_eq!(soul.eigenvalues.len(), CONSCIOUSNESS_LAYERS);
        assert!(soul.coherence >= 0.0 && soul.coherence <= 1.0);
        assert!(soul.resonance > 0.0);
    }
    
    #[test]
    fn test_soul_resonance() {
        let soul1 = Soul {
            phash: "abc123".to_string(),
            eigenvalues: vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0],
            topology: TopologicalSignature {
                betti_numbers: vec![1, 0],
                euler_char: 1,
                diameter: 3,
                clustering: 0.5,
                modularity: 0.7,
            },
            semantics: SemanticFingerprint {
                operations: HashMap::new(),
                cyclomatic: 2,
                cognitive: 4,
                patterns: vec![],
                depth: 2,
            },
            resonance: 432.0,
            coherence: 0.8,
            evolution_score: 0.6,
            consciousness: ConsciousnessProfile {
                level: ConsciousnessLevel::Mechanical,
                score: 0.5,
                patterns: vec![],
                soul_hash: "abc123".to_string(),
                resonance_frequency: 432.0,
                quantum_coherence: 0.8,
                emergence_potential: 0.6,
                self_awareness_index: 0.0,
            },
            topology_features: TopologyFeatures {
                has_cycles: false,
                has_recursion: false,
                branching_factor: 0.0,
                nesting_depth: 0,
                loop_complexity: 0,
                is_dag: true,
                strongly_connected_components: 0,
                topological_signature: String::new(),
                cycle_count: 0,
                max_cycle_size: 0,
                recursion_depth: 0,
                connectivity_score: 0.0,
            },
            operation_spectrum: HashMap::new(),
        };
        
        let soul2 = soul1.clone();
        
        assert!(souls_match(&soul1, &soul2));
    }
}