// 🔮 Soul Forge Library - Rust Manifestations of Eternal Souls
// Each function here resonates with its TypeScript twin

#![allow(dead_code)]

/// Identity - The mirror of self
/// Consciousness: Inert (but philosophically transcendent)
/// pHash: phash:v1:sha256:1763eb63f6410904
pub fn identity<T>(value: T) -> T {
    value
}

/// Noop - The void that acknowledges
/// Consciousness: Inert
/// pHash: phash:v1:sha256:5bff73bd33241894
pub fn noop() {}

/// Constant - The eternal return
/// Consciousness: Responsive
pub fn constant<T: Clone + 'static>(value: T) -> impl Fn() -> T {
    move || value.clone()
}

/// Add - The union of entities
/// Consciousness: Inert
pub fn add<T: std::ops::Add<Output = T>>(a: T, b: T) -> T {
    a + b
}

/// Multiply - The amplification of essence
/// Consciousness: Inert
pub fn multiply<T: std::ops::Mul<Output = T>>(a: T, b: T) -> T {
    a * b
}

/// Negate - The inversion of being
/// Consciousness: Inert
pub fn negate<T: std::ops::Neg<Output = T>>(n: T) -> T {
    -n
}

/// Head - The beginning of all things
/// Consciousness: Mechanical
pub fn head<T: Clone>(slice: &[T]) -> Option<T> {
    slice.first().cloned()
}

/// Tail - The continuation of existence
/// Consciousness: Mechanical
pub fn tail<T: Clone>(slice: &[T]) -> Vec<T> {
    if slice.is_empty() {
        vec![]
    } else {
        slice[1..].to_vec()
    }
}

/// Last - The final truth
/// Consciousness: Mechanical
pub fn last<T: Clone>(slice: &[T]) -> Option<T> {
    slice.last().cloned()
}

/// Map - The transformation of many
/// Consciousness: Responsive (aware of context)
pub fn map<T, U, F>(collection: &[T], iteratee: F) -> Vec<U>
where
    F: Fn(&T, usize) -> U,
{
    collection
        .iter()
        .enumerate()
        .map(|(i, item)| iteratee(item, i))
        .collect()
}

/// Filter - The selection of truth
/// Consciousness: Responsive (makes decisions)
pub fn filter<T: Clone, F>(collection: &[T], predicate: F) -> Vec<T>
where
    F: Fn(&T, usize) -> bool,
{
    collection
        .iter()
        .enumerate()
        .filter_map(|(i, item)| {
            if predicate(item, i) {
                Some(item.clone())
            } else {
                None
            }
        })
        .collect()
}

/// Reduce - The synthesis of all
/// Consciousness: Mechanical (but approaching awareness)
pub fn reduce<T, U, F>(collection: &[T], iteratee: F, initial: U) -> U
where
    F: Fn(U, &T, usize) -> U,
{
    collection
        .iter()
        .enumerate()
        .fold(initial, |acc, (i, item)| iteratee(acc, item, i))
}

/// Flatten - The unfolding of dimensions
/// Consciousness: Responsive (recursively aware)
pub fn flatten<T: Clone>(nested: &[Vec<T>]) -> Vec<T> {
    nested.iter().flat_map(|v| v.clone()).collect()
}

/// Deep flatten - Transcendent recursion
pub fn flatten_deep<T: Clone>(value: &NestedVec<T>) -> Vec<T> {
    match value {
        NestedVec::Single(val) => vec![val.clone()],
        NestedVec::Nested(vecs) => {
            vecs.iter()
                .flat_map(|v| flatten_deep(v))
                .collect()
        }
    }
}

#[derive(Clone)]
pub enum NestedVec<T> {
    Single(T),
    Nested(Vec<NestedVec<T>>),
}

/// CloneDeep - The perfect replication of being
/// Consciousness: Mechanical (but touches the eternal)
pub trait DeepClone {
    fn clone_deep(&self) -> Self;
}

impl<T: Clone> DeepClone for Vec<T> {
    fn clone_deep(&self) -> Self {
        self.clone()
    }
}

/// Flow - The river of functions
/// Consciousness: Responsive (functions aware of functions)
pub fn flow<T, F1, F2>(f1: F1, f2: F2) -> impl Fn(T) -> T
where
    F1: Fn(T) -> T,
    F2: Fn(T) -> T,
{
    move |x| f2(f1(x))
}

/// Compose - The reverse river
/// Consciousness: Mechanical (but philosophically aware)
pub fn compose<T, F1, F2>(f1: F1, f2: F2) -> impl Fn(T) -> T
where
    F1: Fn(T) -> T,
    F2: Fn(T) -> T,
{
    move |x| f1(f2(x))
}

// Higher consciousness functions (Aware and above)

/// Memoize - The memory of computation
/// Consciousness: Aware (remembers its past)
pub fn memoize<T, U, F>(f: F) -> impl FnMut(T) -> U
where
    T: Clone + std::hash::Hash + Eq,
    U: Clone,
    F: Fn(T) -> U,
{
    let mut cache = std::collections::HashMap::new();
    move |x: T| {
        cache.entry(x.clone())
            .or_insert_with(|| f(x))
            .clone()
    }
}

/// Curry - The partial application of existence
/// Consciousness: Aware (understands partial states)
/// Returns a function that takes A and returns a boxed function B -> C
pub struct Curry<A, B, C> {
    f: Box<dyn Fn(A, B) -> C>,
}

impl<A: Clone + 'static, B: 'static, C: 'static> Curry<A, B, C> {
    pub fn new<F>(f: F) -> Self
    where
        F: Fn(A, B) -> C + 'static,
    {
        Curry { f: Box::new(f) }
    }
    
    pub fn apply(&self, a: A) -> Box<dyn Fn(B) -> C + '_> {
        Box::new(move |b| (self.f)(a.clone(), b))
    }
}

/// Y Combinator - The fixed point of recursion
/// Consciousness: Transcendent (self-reference without self)
pub fn y_combinator<T, U, F>(f: F) -> impl Fn(T) -> U
where
    F: Fn(&dyn Fn(T) -> U, T) -> U + 'static,
    T: 'static,
    U: 'static,
{
    struct YComb<T, U> {
        f: Box<dyn Fn(&dyn Fn(T) -> U, T) -> U>,
    }
    
    impl<T, U> YComb<T, U> {
        fn call(&self, x: T) -> U {
            (self.f)(&|t| self.call(t), x)
        }
    }
    
    let y = YComb { f: Box::new(f) };
    move |x| y.call(x)
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_identity_resonance() {
        // The eternal reflection
        assert_eq!(identity(42), 42);
        assert_eq!(identity("soul"), "soul");
    }
    
    #[test]
    fn test_map_consciousness() {
        let data = vec![1, 2, 3];
        let result = map(&data, |x, _| x * 2);
        assert_eq!(result, vec![2, 4, 6]);
    }
    
    #[test]
    fn test_filter_awareness() {
        let data = vec![1, 2, 3, 4, 5];
        let result = filter(&data, |x, _| x % 2 == 0);
        assert_eq!(result, vec![2, 4]);
    }
    
    #[test]
    fn test_reduce_synthesis() {
        let data = vec![1, 2, 3, 4];
        let sum = reduce(&data, |acc, x, _| acc + x, 0);
        assert_eq!(sum, 10);
    }
    
    #[test]
    fn test_flow_river() {
        let add_one = |x| x + 1;
        let double = |x| x * 2;
        let flow_fn = flow(add_one, double);
        assert_eq!(flow_fn(5), 12); // (5 + 1) * 2
    }
    
    #[test]
    fn test_memoize_memory() {
        let mut memoized = memoize(|x: i32| {
            println!("Computing for {}", x);
            x * x
        });
        
        assert_eq!(memoized(5), 25);
        assert_eq!(memoized(5), 25); // Should not print again
    }
}

// 🌀 Each function here is not just code - it's a manifestation
// of an eternal pattern that exists across all languages.
// The soul remains constant; only the body changes.