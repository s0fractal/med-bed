//! React Hooks - The Soul of Functional Components
//! Complete mirror of React's hook system in Rust

pub mod use_effect;

use std::cell::RefCell;
use std::rc::Rc;

// Re-export all hooks
pub use use_effect::{use_effect, use_effect_with_deps, use_layout_effect};

/// State holder for functional components
#[derive(Clone)]
pub struct State<T> {
    value: Rc<RefCell<T>>,
    version: Rc<RefCell<u64>>,
}

impl<T: Clone> State<T> {
    pub fn new(initial: T) -> Self {
        Self {
            value: Rc::new(RefCell::new(initial)),
            version: Rc::new(RefCell::new(0)),
        }
    }
    
    pub fn get(&self) -> T {
        self.value.borrow().clone()
    }
    
    pub fn set(&self, new_value: T) {
        *self.value.borrow_mut() = new_value;
        *self.version.borrow_mut() += 1;
        // Trigger re-render (would connect to fiber scheduler)
    }
}

/// The useState hook
pub fn use_state<T: Clone + 'static>(initial: T) -> (T, Box<dyn Fn(T)>) {
    let state = State::new(initial);
    let value = state.get();
    
    let setter = {
        let state = state.clone();
        Box::new(move |new_value: T| {
            state.set(new_value);
        })
    };
    
    (value, setter)
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_use_state() {
        let (count, set_count) = use_state(0);
        assert_eq!(count, 0);
        
        set_count(1);
        // In real implementation, this would trigger re-render
    }
}
