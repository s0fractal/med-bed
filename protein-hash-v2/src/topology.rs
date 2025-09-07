// 🌀 Topology Detection - The Shape of Code's Soul
use petgraph::algo::{tarjan_scc, has_path_connecting};
use petgraph::graph::{DiGraph, NodeIndex};
use std::collections::{HashSet, VecDeque};

/// Topological features of code structure
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct TopologyFeatures {
    pub has_cycles: bool,
    pub has_recursion: bool,
    pub branching_factor: f64,
    pub nesting_depth: usize,
    pub loop_complexity: usize,
    pub is_dag: bool,
    pub strongly_connected_components: usize,
    pub topological_signature: String,
    pub cycle_count: usize,
    pub max_cycle_size: usize,
    pub recursion_depth: usize,
    pub connectivity_score: f64,
}

pub struct TopologyDetector;

impl TopologyDetector {
    pub fn new() -> Self {
        Self
    }
    
    /// Analyze topology of the code graph
    pub fn analyze<N, E>(&self, graph: &DiGraph<N, E>) -> TopologyFeatures {
        let has_cycles = self.detect_cycles(graph);
        let has_recursion = self.detect_recursion(graph);
        let branching_factor = self.calculate_branching_factor(graph);
        let nesting_depth = self.calculate_max_depth(graph);
        let loop_complexity = self.calculate_loop_complexity(graph);
        let is_dag = !has_cycles;
        let sccs = self.find_strongly_connected_components(graph);
        let strongly_connected_components = sccs.len();
        let (cycle_count, max_cycle_size) = self.analyze_cycles(graph);
        let recursion_depth = self.calculate_recursion_depth(graph);
        let connectivity_score = self.calculate_connectivity(graph);
        let topological_signature = self.generate_signature(&sccs, branching_factor, nesting_depth);
        
        TopologyFeatures {
            has_cycles,
            has_recursion,
            branching_factor,
            nesting_depth,
            loop_complexity,
            is_dag,
            strongly_connected_components,
            topological_signature,
            cycle_count,
            max_cycle_size,
            recursion_depth,
            connectivity_score,
        }
    }
    
    /// Detect cycles using DFS
    fn detect_cycles<N, E>(&self, graph: &DiGraph<N, E>) -> bool {
        let mut visited = HashSet::new();
        let mut rec_stack = HashSet::new();
        
        for node in graph.node_indices() {
            if !visited.contains(&node) {
                if self.is_cyclic_util(graph, node, &mut visited, &mut rec_stack) {
                    return true;
                }
            }
        }
        false
    }
    
    fn is_cyclic_util<N, E>(
        &self,
        graph: &DiGraph<N, E>,
        node: NodeIndex,
        visited: &mut HashSet<NodeIndex>,
        rec_stack: &mut HashSet<NodeIndex>,
    ) -> bool {
        visited.insert(node);
        rec_stack.insert(node);
        
        for neighbor in graph.neighbors(node) {
            if !visited.contains(&neighbor) {
                if self.is_cyclic_util(graph, neighbor, visited, rec_stack) {
                    return true;
                }
            } else if rec_stack.contains(&neighbor) {
                return true;
            }
        }
        
        rec_stack.remove(&node);
        false
    }
    
    /// Detect recursive patterns
    fn detect_recursion<N, E>(&self, graph: &DiGraph<N, E>) -> bool {
        // Check if any node has a path to itself
        for node in graph.node_indices() {
            if has_path_connecting(graph, node, node, None) {
                return true;
            }
        }
        false
    }
    
    /// Calculate average branching factor
    fn calculate_branching_factor<N, E>(&self, graph: &DiGraph<N, E>) -> f64 {
        if graph.node_count() == 0 {
            return 0.0;
        }
        
        let total_children: usize = graph.node_indices()
            .map(|n| graph.neighbors(n).count())
            .sum();
        
        total_children as f64 / graph.node_count() as f64
    }
    
    /// Calculate maximum depth using BFS
    fn calculate_max_depth<N, E>(&self, graph: &DiGraph<N, E>) -> usize {
        if graph.node_count() == 0 {
            return 0;
        }
        
        let mut max_depth = 0;
        
        // Find root nodes (no incoming edges)
        let roots: Vec<_> = graph.node_indices()
            .filter(|&n| graph.neighbors_directed(n, petgraph::Direction::Incoming).count() == 0)
            .collect();
        
        for root in roots {
            let depth = self.bfs_depth(graph, root);
            max_depth = max_depth.max(depth);
        }
        
        max_depth
    }
    
    fn bfs_depth<N, E>(&self, graph: &DiGraph<N, E>, start: NodeIndex) -> usize {
        let mut queue = VecDeque::new();
        let mut visited = HashSet::new();
        let mut max_depth = 0;
        
        queue.push_back((start, 0));
        visited.insert(start);
        
        while let Some((node, depth)) = queue.pop_front() {
            max_depth = max_depth.max(depth);
            
            for neighbor in graph.neighbors(node) {
                if !visited.contains(&neighbor) {
                    visited.insert(neighbor);
                    queue.push_back((neighbor, depth + 1));
                }
            }
        }
        
        max_depth
    }
    
    /// Calculate loop complexity
    fn calculate_loop_complexity<N, E>(&self, graph: &DiGraph<N, E>) -> usize {
        let sccs = tarjan_scc(graph);
        sccs.iter()
            .filter(|scc| scc.len() > 1)
            .map(|scc| scc.len())
            .sum()
    }
    
    /// Find strongly connected components using Tarjan's algorithm
    fn find_strongly_connected_components<N, E>(&self, graph: &DiGraph<N, E>) -> Vec<Vec<NodeIndex>> {
        tarjan_scc(graph)
    }
    
    /// Analyze cycles in detail
    fn analyze_cycles<N, E>(&self, graph: &DiGraph<N, E>) -> (usize, usize) {
        let sccs = tarjan_scc(graph);
        let cycle_count = sccs.iter().filter(|scc| scc.len() > 1).count();
        let max_cycle_size = sccs.iter().map(|scc| scc.len()).max().unwrap_or(0);
        (cycle_count, max_cycle_size)
    }
    
    /// Calculate recursion depth
    fn calculate_recursion_depth<N, E>(&self, graph: &DiGraph<N, E>) -> usize {
        let sccs = tarjan_scc(graph);
        sccs.iter()
            .filter(|scc| scc.len() == 1 && {
                let node = scc[0];
                graph.contains_edge(node, node)
            })
            .count()
    }
    
    /// Calculate connectivity score
    fn calculate_connectivity<N, E>(&self, graph: &DiGraph<N, E>) -> f64 {
        if graph.node_count() < 2 {
            return 0.0;
        }
        
        let n = graph.node_count() as f64;
        let e = graph.edge_count() as f64;
        let max_edges = n * (n - 1.0);
        
        if max_edges > 0.0 {
            e / max_edges
        } else {
            0.0
        }
    }
    
    /// Generate topological signature
    fn generate_signature(
        &self,
        sccs: &[Vec<NodeIndex>],
        branching_factor: f64,
        nesting_depth: usize,
    ) -> String {
        let scc_sizes: Vec<_> = sccs.iter().map(|scc| scc.len()).collect();
        format!(
            "scc:{:?}-branch:{:.2}-depth:{}",
            scc_sizes,
            branching_factor,
            nesting_depth
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_cycle_detection() {
        let mut graph = DiGraph::new();
        let a = graph.add_node(());
        let b = graph.add_node(());
        let c = graph.add_node(());
        
        graph.add_edge(a, b, ());
        graph.add_edge(b, c, ());
        graph.add_edge(c, a, ()); // Creates cycle
        
        let detector = TopologyDetector::new();
        let features = detector.analyze(&graph);
        
        assert!(features.has_cycles);
        assert!(!features.is_dag);
        assert_eq!(features.strongly_connected_components, 1);
    }
    
    #[test]
    fn test_dag_detection() {
        let mut graph = DiGraph::new();
        let a = graph.add_node(());
        let b = graph.add_node(());
        let c = graph.add_node(());
        
        graph.add_edge(a, b, ());
        graph.add_edge(a, c, ());
        graph.add_edge(b, c, ());
        
        let detector = TopologyDetector::new();
        let features = detector.analyze(&graph);
        
        assert!(!features.has_cycles);
        assert!(features.is_dag);
    }
}