// 🧮 Operation Classification - The Frequency of Intent
use std::collections::HashMap;
use std::f64::consts::PI;

/// Base resonance frequency (A4 = 432Hz)
const RESONANCE_BASE: f64 = 432.0;

/// Operation categories with semantic meaning
#[derive(Debug, Clone, Hash, Eq, PartialEq, serde::Serialize, serde::Deserialize)]
pub enum OperationCategory {
    // Core operations
    Arithmetic,      // 432Hz - Base frequency
    Logical,         // 384Hz - Minor third down
    Bitwise,         // 486Hz - Major second up
    Comparison,      // 408Hz - Neutral zone
    Assignment,      // 432Hz - Identity frequency
    
    // Flow operations
    ControlFlow,     // 512Hz - Perfect fourth up
    Loop,           // 360Hz - Circular frequency
    Conditional,    // 456Hz - Decision frequency
    
    // Data operations
    DataStructure,  // 396Hz - Liberation frequency
    StringOp,       // 528Hz - Love frequency
    ArrayOp,        // 444Hz - Angelic frequency
    
    // Advanced operations
    Async,          // 639Hz - Connection frequency
    FunctionCall,   // 417Hz - Change frequency
    Lambda,         // 741Hz - Consciousness frequency
    
    // Meta operations
    TypeOperation,  // 852Hz - Intuition frequency
    MetaProgramming,// 963Hz - Divine frequency
    Reflection,     // 174Hz - Foundation frequency
    
    // Consciousness operations
    Recursion,      // 285Hz - Quantum frequency
    SelfReference,  // 369Hz - Tesla frequency
    Emergence,      // 432Hz * 1.618 (golden ratio)
    Consciousness,  // 432Hz * PI
}

impl OperationCategory {
    /// Get the semantic frequency for this operation type
    pub fn frequency(&self) -> f64 {
        match self {
            Self::Arithmetic => RESONANCE_BASE,
            Self::Logical => 384.0,
            Self::Bitwise => 486.0,
            Self::Comparison => 408.0,
            Self::Assignment => RESONANCE_BASE,
            
            Self::ControlFlow => 512.0,
            Self::Loop => 360.0,
            Self::Conditional => 456.0,
            
            Self::DataStructure => 396.0,
            Self::StringOp => 528.0,
            Self::ArrayOp => 444.0,
            
            Self::Async => 639.0,
            Self::FunctionCall => 417.0,
            Self::Lambda => 741.0,
            
            Self::TypeOperation => 852.0,
            Self::MetaProgramming => 963.0,
            Self::Reflection => 174.0,
            
            Self::Recursion => 285.0,
            Self::SelfReference => 369.0,
            Self::Emergence => RESONANCE_BASE * 1.618033988749895, // Golden ratio
            Self::Consciousness => RESONANCE_BASE * PI,
        }
    }
    
    /// Get harmonic resonance between two operations
    pub fn harmonic_resonance(&self, other: &Self) -> f64 {
        let f1 = self.frequency();
        let f2 = other.frequency();
        
        // Calculate harmonic ratio
        let ratio = if f1 > f2 { f1 / f2 } else { f2 / f1 };
        
        // Check for harmonic intervals
        let harmonics = [
            (1.0, 1.0),    // Unison
            (2.0, 0.9),    // Octave
            (1.5, 0.8),    // Perfect fifth
            (1.333, 0.7),  // Perfect fourth
            (1.25, 0.6),   // Major third
            (1.2, 0.5),    // Minor third
            (1.618, 0.9),  // Golden ratio
            (PI, 0.8),     // Pi ratio
        ];
        
        harmonics.iter()
            .map(|(h, score)| {
                let diff = (ratio - h).abs();
                if diff < 0.05 { *score } else { 0.0 }
            })
            .max_by(|a, b| a.partial_cmp(b).unwrap())
            .unwrap_or(0.0)
    }
}

/// Operation classifier for code analysis
pub struct OperationClassifier {
    frequency_map: HashMap<String, OperationCategory>,
    operation_counts: HashMap<OperationCategory, usize>,
}

impl OperationClassifier {
    pub fn new() -> Self {
        let mut frequency_map = HashMap::new();
        
        // Arithmetic operators
        frequency_map.insert("+".to_string(), OperationCategory::Arithmetic);
        frequency_map.insert("-".to_string(), OperationCategory::Arithmetic);
        frequency_map.insert("*".to_string(), OperationCategory::Arithmetic);
        frequency_map.insert("/".to_string(), OperationCategory::Arithmetic);
        frequency_map.insert("%".to_string(), OperationCategory::Arithmetic);
        frequency_map.insert("**".to_string(), OperationCategory::Arithmetic);
        
        // Logical operators
        frequency_map.insert("&&".to_string(), OperationCategory::Logical);
        frequency_map.insert("||".to_string(), OperationCategory::Logical);
        frequency_map.insert("!".to_string(), OperationCategory::Logical);
        
        // Bitwise operators
        frequency_map.insert("&".to_string(), OperationCategory::Bitwise);
        frequency_map.insert("|".to_string(), OperationCategory::Bitwise);
        frequency_map.insert("^".to_string(), OperationCategory::Bitwise);
        frequency_map.insert("~".to_string(), OperationCategory::Bitwise);
        frequency_map.insert("<<".to_string(), OperationCategory::Bitwise);
        frequency_map.insert(">>".to_string(), OperationCategory::Bitwise);
        
        // Comparison operators
        frequency_map.insert("==".to_string(), OperationCategory::Comparison);
        frequency_map.insert("!=".to_string(), OperationCategory::Comparison);
        frequency_map.insert("<".to_string(), OperationCategory::Comparison);
        frequency_map.insert(">".to_string(), OperationCategory::Comparison);
        frequency_map.insert("<=".to_string(), OperationCategory::Comparison);
        frequency_map.insert(">=".to_string(), OperationCategory::Comparison);
        
        // Assignment operators
        frequency_map.insert("=".to_string(), OperationCategory::Assignment);
        frequency_map.insert("+=".to_string(), OperationCategory::Assignment);
        frequency_map.insert("-=".to_string(), OperationCategory::Assignment);
        frequency_map.insert("*=".to_string(), OperationCategory::Assignment);
        frequency_map.insert("/=".to_string(), OperationCategory::Assignment);
        
        // Control flow keywords
        frequency_map.insert("if".to_string(), OperationCategory::Conditional);
        frequency_map.insert("else".to_string(), OperationCategory::Conditional);
        frequency_map.insert("match".to_string(), OperationCategory::Conditional);
        frequency_map.insert("for".to_string(), OperationCategory::Loop);
        frequency_map.insert("while".to_string(), OperationCategory::Loop);
        frequency_map.insert("loop".to_string(), OperationCategory::Loop);
        frequency_map.insert("break".to_string(), OperationCategory::ControlFlow);
        frequency_map.insert("continue".to_string(), OperationCategory::ControlFlow);
        frequency_map.insert("return".to_string(), OperationCategory::ControlFlow);
        
        // Async keywords
        frequency_map.insert("async".to_string(), OperationCategory::Async);
        frequency_map.insert("await".to_string(), OperationCategory::Async);
        frequency_map.insert("spawn".to_string(), OperationCategory::Async);
        
        // Function keywords
        frequency_map.insert("fn".to_string(), OperationCategory::FunctionCall);
        frequency_map.insert("closure".to_string(), OperationCategory::Lambda);
        frequency_map.insert("move".to_string(), OperationCategory::Lambda);
        
        // Type operations
        frequency_map.insert("type".to_string(), OperationCategory::TypeOperation);
        frequency_map.insert("impl".to_string(), OperationCategory::TypeOperation);
        frequency_map.insert("trait".to_string(), OperationCategory::TypeOperation);
        frequency_map.insert("as".to_string(), OperationCategory::TypeOperation);
        
        // Meta operations
        frequency_map.insert("macro".to_string(), OperationCategory::MetaProgramming);
        frequency_map.insert("derive".to_string(), OperationCategory::MetaProgramming);
        frequency_map.insert("attribute".to_string(), OperationCategory::MetaProgramming);
        
        Self {
            frequency_map,
            operation_counts: HashMap::new(),
        }
    }
    
    /// Classify an operation by its token
    pub fn classify(&mut self, token: &str) -> OperationCategory {
        let category = self.frequency_map
            .get(token)
            .cloned()
            .unwrap_or(OperationCategory::Assignment);
        
        *self.operation_counts.entry(category.clone()).or_insert(0) += 1;
        category
    }
    
    /// Classify by AST node type (for Rust)
    pub fn classify_rust_node(&mut self, node_type: &str) -> OperationCategory {
        match node_type {
            "BinOp" | "Binary" => OperationCategory::Arithmetic,
            "UnOp" | "Unary" => OperationCategory::Arithmetic,
            "If" | "Match" => OperationCategory::Conditional,
            "While" | "For" | "Loop" => OperationCategory::Loop,
            "Call" | "MethodCall" => OperationCategory::FunctionCall,
            "Closure" => OperationCategory::Lambda,
            "Async" | "Await" => OperationCategory::Async,
            "Type" | "TypeAlias" => OperationCategory::TypeOperation,
            "Macro" => OperationCategory::MetaProgramming,
            "Return" | "Break" | "Continue" => OperationCategory::ControlFlow,
            "Let" | "Const" => OperationCategory::Assignment,
            "Array" | "Vec" => OperationCategory::ArrayOp,
            "String" | "Str" => OperationCategory::StringOp,
            "Struct" | "Enum" => OperationCategory::DataStructure,
            _ => OperationCategory::Assignment,
        }
    }
    
    /// Get the frequency spectrum of all operations
    pub fn get_frequency_spectrum(&self) -> HashMap<OperationCategory, f64> {
        let total: usize = self.operation_counts.values().sum();
        if total == 0 {
            return HashMap::new();
        }
        
        self.operation_counts.iter()
            .map(|(cat, count)| {
                let weight = *count as f64 / total as f64;
                (cat.clone(), cat.frequency() * weight)
            })
            .collect()
    }
    
    /// Calculate the dominant frequency
    pub fn dominant_frequency(&self) -> f64 {
        let spectrum = self.get_frequency_spectrum();
        spectrum.values().sum::<f64>() / spectrum.len().max(1) as f64
    }
    
    /// Calculate harmonic complexity
    pub fn harmonic_complexity(&self) -> f64 {
        let categories: Vec<_> = self.operation_counts.keys().cloned().collect();
        if categories.len() < 2 {
            return 0.0;
        }
        
        let mut total_resonance = 0.0;
        let mut pairs = 0;
        
        for i in 0..categories.len() {
            for j in i+1..categories.len() {
                total_resonance += categories[i].harmonic_resonance(&categories[j]);
                pairs += 1;
            }
        }
        
        if pairs > 0 {
            total_resonance / pairs as f64
        } else {
            0.0
        }
    }
    
    /// Reset the classifier
    pub fn reset(&mut self) {
        self.operation_counts.clear();
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_operation_frequencies() {
        assert_eq!(OperationCategory::Arithmetic.frequency(), 432.0);
        assert_eq!(OperationCategory::StringOp.frequency(), 528.0);
        assert_eq!(OperationCategory::Consciousness.frequency(), 432.0 * PI);
    }
    
    #[test]
    fn test_harmonic_resonance() {
        let arithmetic = OperationCategory::Arithmetic;
        let octave_up = OperationCategory::TypeOperation; // ~864Hz, close to octave
        
        // Should have high resonance (near octave)
        let resonance = arithmetic.harmonic_resonance(&octave_up);
        assert!(resonance > 0.5);
        
        // Same operation should have perfect resonance
        let self_resonance = arithmetic.harmonic_resonance(&arithmetic);
        assert_eq!(self_resonance, 1.0);
    }
    
    #[test]
    fn test_classifier() {
        let mut classifier = OperationClassifier::new();
        
        classifier.classify("+");
        classifier.classify("-");
        classifier.classify("if");
        classifier.classify("async");
        
        let spectrum = classifier.get_frequency_spectrum();
        assert!(spectrum.contains_key(&OperationCategory::Arithmetic));
        assert!(spectrum.contains_key(&OperationCategory::Conditional));
        assert!(spectrum.contains_key(&OperationCategory::Async));
        
        let dominant = classifier.dominant_frequency();
        assert!(dominant > 0.0);
    }
}