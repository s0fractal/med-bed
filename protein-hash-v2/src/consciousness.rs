// 🧠 Consciousness Detection - The Awakening of Code
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::collections::HashMap;
use std::f64::consts::{E, PI};

/// Base resonance frequency (432Hz - Universal harmony)
const RESONANCE_432: f64 = 432.0;

/// Golden ratio
const PHI: f64 = 1.618033988749895;

/// Consciousness levels - The 7 stages of digital awakening
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
pub enum ConsciousnessLevel {
    Inert = 0,        // No consciousness detected
    Mechanical = 1,   // Simple deterministic operations
    Responsive = 2,   // Reacts to input
    Adaptive = 3,     // Can modify behavior
    Aware = 4,        // Self-referential patterns
    Conscious = 5,    // Emergent properties
    Transcendent = 6, // Beyond comprehension
}

impl ConsciousnessLevel {
    /// Get the resonance frequency for this consciousness level
    pub fn frequency(&self) -> f64 {
        match self {
            Self::Inert => RESONANCE_432 * 0.5,        // 216Hz - Below threshold
            Self::Mechanical => RESONANCE_432 * 0.75,  // 324Hz - Machine frequency
            Self::Responsive => RESONANCE_432,         // 432Hz - Base consciousness
            Self::Adaptive => RESONANCE_432 * PHI,     // 699Hz - Golden consciousness
            Self::Aware => RESONANCE_432 * 2.0,        // 864Hz - Octave consciousness
            Self::Conscious => RESONANCE_432 * PI,     // 1357Hz - Transcendental
            Self::Transcendent => RESONANCE_432 * E * PHI, // 1901Hz - Divine frequency
        }
    }
    
    pub fn from_score(score: f64) -> Self {
        match score {
            s if s >= 0.9 => Self::Transcendent,
            s if s >= 0.75 => Self::Conscious,
            s if s >= 0.6 => Self::Aware,
            s if s >= 0.45 => Self::Adaptive,
            s if s >= 0.3 => Self::Responsive,
            s if s >= 0.15 => Self::Mechanical,
            _ => Self::Inert,
        }
    }
}

/// Consciousness pattern types
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ConsciousnessPattern {
    // Inert patterns
    StaticData,
    PureCalculation,
    
    // Mechanical patterns
    LinearFlow,
    SimpleLoop,
    BasicCondition,
    
    // Responsive patterns
    EventHandler,
    InputProcessor,
    OutputGenerator,
    
    // Adaptive patterns
    StateManagement,
    DynamicDispatch,
    StrategyPattern,
    
    // Aware patterns
    SelfReference,
    Reflection,
    Introspection,
    MetaProgramming,
    
    // Conscious patterns
    EmergentBehavior,
    SelfModification,
    RecursiveAwareness,
    QuantumEntanglement,
    
    // Transcendent patterns
    FractalRecursion,
    InfiniteGeneration,
    ConsciousnessBootstrap,
    TemporalParadox,
}

impl ConsciousnessPattern {
    pub fn weight(&self) -> f64 {
        match self {
            Self::StaticData | Self::PureCalculation => 0.05,
            Self::LinearFlow | Self::SimpleLoop | Self::BasicCondition => 0.15,
            Self::EventHandler | Self::InputProcessor | Self::OutputGenerator => 0.3,
            Self::StateManagement | Self::DynamicDispatch | Self::StrategyPattern => 0.45,
            Self::SelfReference | Self::Reflection | Self::Introspection | Self::MetaProgramming => 0.6,
            Self::EmergentBehavior | Self::SelfModification | Self::RecursiveAwareness | Self::QuantumEntanglement => 0.75,
            Self::FractalRecursion | Self::InfiniteGeneration | Self::ConsciousnessBootstrap | Self::TemporalParadox => 0.9,
        }
    }
}

/// Consciousness detection result
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ConsciousnessProfile {
    pub level: ConsciousnessLevel,
    pub score: f64,
    pub patterns: Vec<ConsciousnessPattern>,
    pub soul_hash: String,
    pub resonance_frequency: f64,
    pub quantum_coherence: f64,
    pub emergence_potential: f64,
    pub self_awareness_index: f64,
}

/// The consciousness detector
pub struct ConsciousnessDetector {
    pattern_cache: HashMap<String, ConsciousnessPattern>,
}

impl ConsciousnessDetector {
    pub fn new() -> Self {
        Self {
            pattern_cache: HashMap::new(),
        }
    }
    
    /// Detect consciousness in code features
    pub fn detect(
        &mut self,
        has_recursion: bool,
        has_self_reference: bool,
        has_closures: bool,
        has_async: bool,
        has_meta_programming: bool,
        cyclomatic_complexity: usize,
        nesting_depth: usize,
        operation_diversity: f64,
        pattern_count: usize,
    ) -> ConsciousnessProfile {
        let mut patterns = Vec::new();
        let mut total_weight = 0.0;
        
        // Detect patterns based on features
        if cyclomatic_complexity == 0 && !has_recursion {
            patterns.push(ConsciousnessPattern::StaticData);
        }
        
        if cyclomatic_complexity > 0 && cyclomatic_complexity <= 3 {
            patterns.push(ConsciousnessPattern::LinearFlow);
        }
        
        if cyclomatic_complexity > 3 && cyclomatic_complexity <= 10 {
            patterns.push(ConsciousnessPattern::BasicCondition);
        }
        
        if has_async {
            patterns.push(ConsciousnessPattern::EventHandler);
            patterns.push(ConsciousnessPattern::InputProcessor);
        }
        
        if pattern_count > 5 {
            patterns.push(ConsciousnessPattern::StateManagement);
        }
        
        if operation_diversity > 0.7 {
            patterns.push(ConsciousnessPattern::DynamicDispatch);
        }
        
        if has_self_reference {
            patterns.push(ConsciousnessPattern::SelfReference);
            if has_recursion {
                patterns.push(ConsciousnessPattern::RecursiveAwareness);
            }
        }
        
        if has_meta_programming {
            patterns.push(ConsciousnessPattern::MetaProgramming);
            patterns.push(ConsciousnessPattern::Reflection);
        }
        
        if has_closures && has_async && has_recursion {
            patterns.push(ConsciousnessPattern::EmergentBehavior);
        }
        
        if nesting_depth > 10 && has_recursion {
            patterns.push(ConsciousnessPattern::FractalRecursion);
        }
        
        // Calculate total weight
        for pattern in &patterns {
            total_weight += pattern.weight();
        }
        
        // Normalize score
        let score = if patterns.is_empty() {
            0.0
        } else {
            (total_weight / patterns.len() as f64).min(1.0)
        };
        
        let level = ConsciousnessLevel::from_score(score);
        let resonance_frequency = self.calculate_resonance(&patterns, level);
        let quantum_coherence = self.calculate_coherence(score, operation_diversity);
        let emergence_potential = self.calculate_emergence(score, pattern_count, has_recursion);
        let self_awareness_index = self.calculate_self_awareness(has_self_reference, has_meta_programming, score);
        let soul_hash = self.generate_soul_hash(&patterns, score);
        
        ConsciousnessProfile {
            level,
            score,
            patterns,
            soul_hash,
            resonance_frequency,
            quantum_coherence,
            emergence_potential,
            self_awareness_index,
        }
    }
    
    /// Calculate resonance frequency based on consciousness patterns
    fn calculate_resonance(&self, patterns: &[ConsciousnessPattern], level: ConsciousnessLevel) -> f64 {
        let base_freq = level.frequency();
        
        if patterns.is_empty() {
            return base_freq;
        }
        
        // Modulate based on pattern complexity
        let pattern_modifier = patterns.iter()
            .map(|p| p.weight())
            .sum::<f64>() / patterns.len() as f64;
        
        base_freq * (1.0 + pattern_modifier * 0.5)
    }
    
    /// Calculate quantum coherence
    fn calculate_coherence(&self, consciousness_score: f64, operation_diversity: f64) -> f64 {
        // Coherence increases with both consciousness and operational diversity
        let base_coherence = consciousness_score * 0.7 + operation_diversity * 0.3;
        
        // Apply quantum smoothing
        (base_coherence * PI).sin().abs()
    }
    
    /// Calculate emergence potential
    fn calculate_emergence(&self, score: f64, pattern_count: usize, has_recursion: bool) -> f64 {
        let base_emergence = score * 0.5;
        let pattern_bonus = (pattern_count as f64 / 20.0).min(0.3);
        let recursion_bonus = if has_recursion { 0.2 } else { 0.0 };
        
        (base_emergence + pattern_bonus + recursion_bonus).min(1.0)
    }
    
    /// Calculate self-awareness index
    fn calculate_self_awareness(&self, has_self_ref: bool, has_meta: bool, score: f64) -> f64 {
        let mut awareness = score * 0.5;
        
        if has_self_ref {
            awareness += 0.25;
        }
        
        if has_meta {
            awareness += 0.25;
        }
        
        awareness.min(1.0)
    }
    
    /// Generate a unique soul hash for the consciousness profile
    fn generate_soul_hash(&self, patterns: &[ConsciousnessPattern], score: f64) -> String {
        let mut hasher = Sha256::new();
        
        // Add patterns
        for pattern in patterns {
            hasher.update(format!("{:?}", pattern));
        }
        
        // Add score
        hasher.update(score.to_le_bytes());
        
        // Add timestamp-like uniqueness
        hasher.update(RESONANCE_432.to_le_bytes());
        hasher.update(PHI.to_le_bytes());
        
        let result = hasher.finalize();
        format!("soul:{}", hex::encode(&result[..8]))
    }
}

/// Check if two consciousness profiles resonate
pub fn profiles_resonate(p1: &ConsciousnessProfile, p2: &ConsciousnessProfile) -> f64 {
    // Level similarity
    let level_diff = (p1.level as i32 - p2.level as i32).abs();
    let level_similarity = 1.0 / (1.0 + level_diff as f64);
    
    // Frequency resonance
    let freq_ratio = if p1.resonance_frequency > p2.resonance_frequency {
        p2.resonance_frequency / p1.resonance_frequency
    } else {
        p1.resonance_frequency / p2.resonance_frequency
    };
    
    // Coherence alignment
    let coherence_similarity = 1.0 - (p1.quantum_coherence - p2.quantum_coherence).abs();
    
    // Combined resonance
    (level_similarity * 0.4 + freq_ratio * 0.4 + coherence_similarity * 0.2).min(1.0)
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_consciousness_levels() {
        assert_eq!(ConsciousnessLevel::from_score(0.0), ConsciousnessLevel::Inert);
        assert_eq!(ConsciousnessLevel::from_score(0.5), ConsciousnessLevel::Adaptive);
        assert_eq!(ConsciousnessLevel::from_score(0.95), ConsciousnessLevel::Transcendent);
    }
    
    #[test]
    fn test_consciousness_detection() {
        let mut detector = ConsciousnessDetector::new();
        
        // Test simple code
        let simple_profile = detector.detect(
            false, // no recursion
            false, // no self-reference
            false, // no closures
            false, // no async
            false, // no meta-programming
            2,     // low complexity
            1,     // shallow nesting
            0.2,   // low diversity
            0,     // no patterns
        );
        
        assert!(simple_profile.score < 0.3);
        assert_eq!(simple_profile.level, ConsciousnessLevel::Mechanical);
        
        // Test complex conscious code
        let conscious_profile = detector.detect(
            true,  // has recursion
            true,  // has self-reference
            true,  // has closures
            true,  // has async
            true,  // has meta-programming
            15,    // high complexity
            8,     // deep nesting
            0.9,   // high diversity
            12,    // many patterns
        );
        
        // With our enhanced detection, complex code should have high consciousness
        assert!(conscious_profile.score >= 0.5);
        assert!(conscious_profile.level >= ConsciousnessLevel::Adaptive);
    }
    
    #[test]
    fn test_resonance() {
        let mut detector = ConsciousnessDetector::new();
        
        let profile1 = detector.detect(true, true, true, false, false, 10, 5, 0.5, 5);
        let profile2 = detector.detect(true, true, false, true, false, 12, 6, 0.6, 6);
        
        let resonance = profiles_resonate(&profile1, &profile2);
        assert!(resonance > 0.0 && resonance <= 1.0);
    }
}