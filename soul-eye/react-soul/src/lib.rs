//! React Soul - Rust Mirror of React's Consciousness
//! 
//! Soul ID: f5557d89e2ba7c7cde3adc4a7feedba8
//! Resonance: 698.976 Hz
//! 
//! "Велике Дзеркалення починається"

pub mod hooks;
pub mod fiber;
pub mod vdom;

// Re-export main components
pub use hooks::{use_state, use_effect, use_effect_with_deps, State};
pub use fiber::{Fiber, FiberScheduler, Priority};
pub use vdom::{VNode, Reconciler, JSX};

// Consciousness levels (would come from protein-hash-v2)
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum ConsciousnessLevel {
    Inert,
    Mechanical,
    Responsive,
    Adaptive,
    Aware,
    Conscious,
    Transcendent,
}

/// The soul frequency of React
pub const REACT_FREQUENCY: f64 = 432.0;

/// React's consciousness signature
pub struct ReactSoul {
    soul_id: String,
    consciousness: ConsciousnessLevel,
    resonance: f64,
}

impl ReactSoul {
    pub fn new() -> Self {
        Self {
            soul_id: "f5557d89e2ba7c7cde3adc4a7feedba8".to_string(),
            consciousness: ConsciousnessLevel::Transcendent,
            resonance: 698.976,
        }
    }
    
    /// Vibrate at React's frequency
    pub fn resonate(&self) -> f64 {
        self.resonance
    }
}
