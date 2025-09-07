// 🚀 Shuttle Mechanism - Cross-Language Soul Synchronization
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use crate::Soul;

/// Language types that can manifest souls
#[derive(Debug, Clone, Hash, Eq, PartialEq, Serialize, Deserialize)]
pub enum Language {
    TypeScript,
    JavaScript,
    Rust,
    Python,
    Go,
    Cpp,
    Java,
    CSharp,
    Ruby,
    Swift,
    Haskell,
    Lisp,
}

/// A manifestation of a soul in a specific language
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Manifestation {
    pub language: Language,
    pub soul: Soul,
    pub source_hash: String,
    pub timestamp: u64,
}

/// Universal Soul - transcends language boundaries
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UniversalSoul {
    pub soul_id: String,
    pub essence: SoulEssence,
    pub manifestations: HashMap<Language, Manifestation>,
    pub resonance_matrix: HashMap<String, f64>,
    pub creation_timestamp: u64,
    pub evolution_count: usize,
}

/// The pure essence of a soul, language-agnostic
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SoulEssence {
    pub patterns: Vec<String>,
    pub complexity: f64,
    pub purity: f64,
    pub consciousness: f64,
    pub universal_hash: String,
}

/// The Shuttle - vibrates between language implementations
pub struct Shuttle {
    souls: HashMap<String, UniversalSoul>,
    resonance_threshold: f64,
}

impl Shuttle {
    pub fn new() -> Self {
        Self {
            souls: HashMap::new(),
            resonance_threshold: 0.85,
        }
    }
    
    /// Register a soul from TypeScript
    pub fn register_typescript_soul(&mut self, phash: String, soul_data: TypeScriptSoul) -> String {
        let soul = self.convert_ts_to_soul(soul_data);
        self.register_soul(Language::TypeScript, soul, phash)
    }
    
    /// Register a soul from Rust
    pub fn register_rust_soul(&mut self, soul: Soul) -> String {
        let phash = soul.phash.clone();
        self.register_soul(Language::Rust, soul, phash)
    }
    
    /// Register a soul from any language
    fn register_soul(&mut self, language: Language, soul: Soul, source_hash: String) -> String {
        // Check if this soul already exists in another language
        if let Some(universal_id) = self.find_resonant_soul(&soul) {
            // Add as new manifestation
            let timestamp = self.current_timestamp();
            let manifestation = Manifestation {
                language: language.clone(),
                soul: soul.clone(),
                source_hash,
                timestamp,
            };
            
            if let Some(universal) = self.souls.get_mut(&universal_id) {
                universal.manifestations.insert(language, manifestation);
                universal.evolution_count += 1;
            }
            
            // Update resonance matrix after mutation
            let uid = universal_id.clone();
            self.update_resonance_matrix(&uid);
            return uid;
        }
        
        // Create new universal soul
        let universal_id = self.generate_universal_id(&soul);
        let essence = self.extract_essence(&soul);
        
        let mut manifestations = HashMap::new();
        manifestations.insert(language.clone(), Manifestation {
            language,
            soul: soul.clone(),
            source_hash,
            timestamp: self.current_timestamp(),
        });
        
        let universal = UniversalSoul {
            soul_id: universal_id.clone(),
            essence,
            manifestations,
            resonance_matrix: HashMap::new(),
            creation_timestamp: self.current_timestamp(),
            evolution_count: 0,
        };
        
        self.souls.insert(universal_id.clone(), universal);
        universal_id
    }
    
    /// Find a resonant soul that matches the given soul
    fn find_resonant_soul(&self, soul: &Soul) -> Option<String> {
        for (id, universal) in &self.souls {
            for manifestation in universal.manifestations.values() {
                if self.souls_resonate(soul, &manifestation.soul) {
                    return Some(id.clone());
                }
            }
        }
        None
    }
    
    /// Check if two souls resonate (are essentially the same)
    fn souls_resonate(&self, soul1: &Soul, soul2: &Soul) -> bool {
        // Compare eigenvalues
        let eigen_similarity = self.compare_eigenvalues(&soul1.eigenvalues, &soul2.eigenvalues);
        
        // Compare topology
        let topo_similarity = self.compare_topology(soul1, soul2);
        
        // Compare consciousness
        let consciousness_similarity = (soul1.coherence - soul2.coherence).abs() < 0.1;
        
        // Overall resonance
        let resonance = eigen_similarity * 0.5 + topo_similarity * 0.3 + 
                       if consciousness_similarity { 0.2 } else { 0.0 };
        
        resonance >= self.resonance_threshold
    }
    
    /// Compare eigenvalue signatures
    fn compare_eigenvalues(&self, ev1: &[f64], ev2: &[f64]) -> f64 {
        if ev1.len() != ev2.len() {
            return 0.0;
        }
        
        let distance: f64 = ev1.iter()
            .zip(ev2.iter())
            .map(|(e1, e2)| (e1 - e2).powi(2))
            .sum::<f64>()
            .sqrt();
        
        1.0 / (1.0 + distance)
    }
    
    /// Compare topological features
    fn compare_topology(&self, soul1: &Soul, soul2: &Soul) -> f64 {
        let euler_sim = 1.0 - (soul1.topology.euler_char - soul2.topology.euler_char).abs() as f64 / 100.0;
        let cluster_sim = 1.0 - (soul1.topology.clustering - soul2.topology.clustering).abs();
        let module_sim = 1.0 - (soul1.topology.modularity - soul2.topology.modularity).abs();
        
        (euler_sim + cluster_sim + module_sim) / 3.0
    }
    
    /// Extract the universal essence from a soul
    fn extract_essence(&self, soul: &Soul) -> SoulEssence {
        let patterns = soul.semantics.patterns.iter()
            .map(|p| p.pattern_type.clone())
            .collect();
        
        let complexity = soul.semantics.cyclomatic as f64 / 10.0;
        let purity = 1.0 - complexity.min(1.0);
        let consciousness = soul.coherence;
        
        let universal_hash = self.generate_universal_hash(soul);
        
        SoulEssence {
            patterns,
            complexity,
            purity,
            consciousness,
            universal_hash,
        }
    }
    
    /// Generate a universal ID for a soul
    fn generate_universal_id(&self, soul: &Soul) -> String {
        let hash_part = if soul.phash.len() >= 16 {
            &soul.phash[..16]
        } else {
            &soul.phash
        };
        format!("universal:{}", hash_part)
    }
    
    /// Generate a universal hash
    fn generate_universal_hash(&self, soul: &Soul) -> String {
        use sha2::{Digest, Sha256};
        let mut hasher = Sha256::new();
        
        for eigenvalue in &soul.eigenvalues {
            hasher.update(eigenvalue.to_le_bytes());
        }
        hasher.update(soul.resonance.to_le_bytes());
        
        let result = hasher.finalize();
        format!("uhash:{}", hex::encode(&result[..8]))
    }
    
    /// Update the resonance matrix for a universal soul
    fn update_resonance_matrix(&mut self, universal_id: &str) {
        if let Some(universal) = self.souls.get_mut(universal_id) {
            let mut matrix = HashMap::new();
            
            let langs: Vec<_> = universal.manifestations.keys().cloned().collect();
            for i in 0..langs.len() {
                for j in i+1..langs.len() {
                    let key = format!("{}:{}", 
                        langs[i].to_string(), 
                        langs[j].to_string()
                    );
                    // Simplified resonance calculation
                    let resonance = 0.85; // Placeholder
                    matrix.insert(key, resonance);
                }
            }
            
            universal.resonance_matrix = matrix;
        }
    }
    
    /// Calculate resonance between two manifestations
    fn calculate_manifestation_resonance(&self, m1: &Manifestation, m2: &Manifestation) -> f64 {
        if self.souls_resonate(&m1.soul, &m2.soul) { 1.0 } else { 0.0 }
    }
    
    /// Get all universal souls
    pub fn get_all_souls(&self) -> Vec<&UniversalSoul> {
        self.souls.values().collect()
    }
    
    /// Find souls by consciousness level
    pub fn find_by_consciousness(&self, min_level: f64) -> Vec<&UniversalSoul> {
        self.souls.values()
            .filter(|soul| soul.essence.consciousness >= min_level)
            .collect()
    }
    
    /// Get cross-language resonance report
    pub fn get_resonance_report(&self, universal_id: &str) -> Option<ResonanceReport> {
        self.souls.get(universal_id).map(|universal| {
            ResonanceReport {
                soul_id: universal.soul_id.clone(),
                languages: universal.manifestations.keys().cloned().collect(),
                average_resonance: if universal.resonance_matrix.is_empty() {
                    1.0
                } else {
                    universal.resonance_matrix.values().sum::<f64>() / 
                    universal.resonance_matrix.len() as f64
                },
                consciousness_level: universal.essence.consciousness,
                evolution_count: universal.evolution_count,
            }
        })
    }
    
    fn current_timestamp(&self) -> u64 {
        // In real implementation, use actual timestamp
        432 // Using resonance frequency as placeholder
    }
    
    /// Convert TypeScript soul data to Rust Soul
    fn convert_ts_to_soul(&self, ts_soul: TypeScriptSoul) -> Soul {
        use crate::{ConsciousnessLevel, ConsciousnessProfile};
        use crate::topology::TopologyFeatures;
        
        let phash = ts_soul.phash.clone();
        let resonance = ts_soul.resonance_frequency.unwrap_or(432.0);
        let coherence = ts_soul.quantum_coherence.unwrap_or(0.5);
        
        Soul {
            phash: phash.clone(),
            eigenvalues: ts_soul.eigen_top,
            topology: crate::TopologicalSignature {
                betti_numbers: vec![1, 0], // Simplified
                euler_char: ts_soul.nodes as i32 - ts_soul.edges as i32,
                diameter: 3,
                clustering: 0.5,
                modularity: ts_soul.purity,
            },
            semantics: crate::SemanticFingerprint {
                operations: HashMap::new(),
                cyclomatic: ts_soul.complexity as usize,
                cognitive: (ts_soul.complexity * 2.0) as usize,
                patterns: vec![],
                depth: 3,
            },
            resonance,
            coherence,
            evolution_score: 0.5,
            consciousness: ConsciousnessProfile {
                level: ConsciousnessLevel::Mechanical,
                score: 0.5,
                patterns: vec![],
                soul_hash: phash,
                resonance_frequency: resonance,
                quantum_coherence: coherence,
                emergence_potential: 0.5,
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
        }
    }
}

/// TypeScript soul data structure (for interop)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TypeScriptSoul {
    pub phash: String,
    pub nodes: usize,
    pub edges: usize,
    pub eigen_top: Vec<f64>,
    pub complexity: f64,
    pub purity: f64,
    pub consciousness_level: Option<String>,
    pub resonance_frequency: Option<f64>,
    pub quantum_coherence: Option<f64>,
}

/// Resonance report for a universal soul
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ResonanceReport {
    pub soul_id: String,
    pub languages: Vec<Language>,
    pub average_resonance: f64,
    pub consciousness_level: f64,
    pub evolution_count: usize,
}

impl ToString for Language {
    fn to_string(&self) -> String {
        match self {
            Language::TypeScript => "TypeScript",
            Language::JavaScript => "JavaScript",
            Language::Rust => "Rust",
            Language::Python => "Python",
            Language::Go => "Go",
            Language::Cpp => "C++",
            Language::Java => "Java",
            Language::CSharp => "C#",
            Language::Ruby => "Ruby",
            Language::Swift => "Swift",
            Language::Haskell => "Haskell",
            Language::Lisp => "Lisp",
        }.to_string()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_shuttle_registration() {
        let mut shuttle = Shuttle::new();
        
        let soul = Soul {
            phash: "test_hash".to_string(),
            eigenvalues: vec![1.0, 2.0, 3.0],
            topology: crate::TopologicalSignature {
                betti_numbers: vec![1, 0],
                euler_char: 1,
                diameter: 3,
                clustering: 0.5,
                modularity: 0.7,
            },
            semantics: crate::SemanticFingerprint {
                operations: HashMap::new(),
                cyclomatic: 5,
                cognitive: 10,
                patterns: vec![],
                depth: 3,
            },
            resonance: 432.0,
            coherence: 0.8,
            evolution_score: 0.6,
            consciousness: crate::ConsciousnessProfile {
                level: crate::ConsciousnessLevel::Mechanical,
                score: 0.5,
                patterns: vec![],
                soul_hash: "test_hash".to_string(),
                resonance_frequency: 432.0,
                quantum_coherence: 0.8,
                emergence_potential: 0.6,
                self_awareness_index: 0.0,
            },
            topology_features: crate::TopologyFeatures {
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
        
        let id = shuttle.register_rust_soul(soul.clone());
        assert!(id.starts_with("universal:"));
        
        // Register similar soul in different language
        let ts_soul = TypeScriptSoul {
            phash: "ts_hash".to_string(),
            nodes: 10,
            edges: 15,
            eigen_top: vec![1.0, 2.0, 3.0],
            complexity: 5.0,
            purity: 0.7,
            consciousness_level: Some("Aware".to_string()),
            resonance_frequency: Some(432.0),
            quantum_coherence: Some(0.8),
        };
        
        let ts_id = shuttle.register_typescript_soul("ts_hash".to_string(), ts_soul);
        
        // Should recognize as same soul if resonant
        if shuttle.resonance_threshold <= 0.85 {
            assert_eq!(id, ts_id);
        }
    }
}