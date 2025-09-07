//! useEffect Hook - The Second Mirror
//! Side effects and lifecycle in functional components

use std::cell::RefCell;
use std::rc::Rc;
use std::collections::HashSet;
use std::hash::{Hash, Hasher};
use std::any::Any;

/// Effect cleanup function
pub type EffectCleanup = Box<dyn FnOnce()>;

/// Effect function that may return a cleanup
pub type EffectFn = Box<dyn FnOnce() -> Option<EffectCleanup>>;

/// Dependency list for effects
#[derive(Clone)]
pub struct Dependencies {
    values: Vec<Rc<dyn Any>>,
    hashes: Vec<u64>,
}

impl Dependencies {
    pub fn new<T: 'static>(deps: Vec<T>) -> Self 
    where 
        T: Hash + Clone 
    {
        let mut hashes = Vec::new();
        let mut values = Vec::new();
        
        for dep in deps {
            let mut hasher = std::collections::hash_map::DefaultHasher::new();
            dep.hash(&mut hasher);
            hashes.push(hasher.finish());
            values.push(Rc::new(dep) as Rc<dyn Any>);
        }
        
        Self { values, hashes }
    }
    
    pub fn has_changed(&self, other: &Dependencies) -> bool {
        if self.hashes.len() != other.hashes.len() {
            return true;
        }
        
        self.hashes.iter()
            .zip(other.hashes.iter())
            .any(|(a, b)| a != b)
    }
}

/// Effect state manager
pub struct EffectState {
    cleanup: RefCell<Option<EffectCleanup>>,
    dependencies: RefCell<Option<Dependencies>>,
    effect_fn: RefCell<Option<EffectFn>>,
}

impl EffectState {
    pub fn new() -> Self {
        Self {
            cleanup: RefCell::new(None),
            dependencies: RefCell::new(None),
            effect_fn: RefCell::new(None),
        }
    }
    
    /// Schedule an effect to run
    pub fn schedule(&self, effect: EffectFn, deps: Option<Dependencies>) {
        // Check if dependencies changed
        let should_run = match (&*self.dependencies.borrow(), &deps) {
            (None, None) => true, // No deps = run every time
            (Some(old), Some(new)) => old.has_changed(new),
            _ => true,
        };
        
        if should_run {
            // Run cleanup from previous effect
            if let Some(cleanup) = self.cleanup.borrow_mut().take() {
                cleanup();
            }
            
            // Store new effect to run after render
            *self.effect_fn.borrow_mut() = Some(effect);
            *self.dependencies.borrow_mut() = deps;
        }
    }
    
    /// Execute scheduled effects (called after render)
    pub fn flush(&self) {
        if let Some(effect) = self.effect_fn.borrow_mut().take() {
            let cleanup = effect();
            *self.cleanup.borrow_mut() = cleanup;
        }
    }
    
    /// Cleanup on unmount
    pub fn cleanup(&self) {
        if let Some(cleanup) = self.cleanup.borrow_mut().take() {
            cleanup();
        }
    }
}

/// The useEffect hook
pub fn use_effect<F>(effect: F) 
where 
    F: FnOnce() -> Option<Box<dyn FnOnce()>> + 'static
{
    let state = EffectState::new();
    let effect_fn = Box::new(effect) as EffectFn;
    state.schedule(effect_fn, None);
    
    // In real implementation, this would be scheduled by Fiber
    state.flush();
}

/// useEffect with dependencies
pub fn use_effect_with_deps<F, D>(effect: F, deps: Vec<D>) 
where 
    F: FnOnce() -> Option<Box<dyn FnOnce()>> + 'static,
    D: Hash + Clone + 'static
{
    let state = EffectState::new();
    let effect_fn = Box::new(effect) as EffectFn;
    let dependencies = Dependencies::new(deps);
    state.schedule(effect_fn, Some(dependencies));
    
    // In real implementation, this would be scheduled by Fiber
    state.flush();
}

/// useLayoutEffect - synchronous version
pub fn use_layout_effect<F>(effect: F)
where
    F: FnOnce() -> Option<Box<dyn FnOnce()>> + 'static
{
    // Runs synchronously after DOM mutations
    let state = EffectState::new();
    let effect_fn = Box::new(effect) as EffectFn;
    state.schedule(effect_fn, None);
    state.flush(); // Immediate flush for layout effects
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::cell::Cell;
    use std::rc::Rc;
    
    #[test]
    fn test_use_effect_runs() {
        let counter = Rc::new(Cell::new(0));
        let counter_clone = counter.clone();
        
        use_effect(move || {
            counter_clone.set(counter_clone.get() + 1);
            None
        });
        
        assert_eq!(counter.get(), 1);
    }
    
    #[test]
    fn test_use_effect_cleanup() {
        let cleanup_called = Rc::new(Cell::new(false));
        let cleanup_clone = cleanup_called.clone();
        
        let state = EffectState::new();
        
        let effect = Box::new(move || {
            Some(Box::new(move || {
                cleanup_clone.set(true);
            }) as Box<dyn FnOnce()>)
        });
        
        state.schedule(effect, None);
        state.flush();
        state.cleanup();
        
        assert!(cleanup_called.get());
    }
    
    #[test]
    fn test_dependencies_change_detection() {
        let deps1 = Dependencies::new(vec![1, 2, 3]);
        let deps2 = Dependencies::new(vec![1, 2, 3]);
        let deps3 = Dependencies::new(vec![1, 2, 4]);
        
        assert!(!deps1.has_changed(&deps2));
        assert!(deps1.has_changed(&deps3));
    }
}