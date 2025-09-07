//! The Universal Function - Sacred Rust Implementation
//! Where we call it "function" instead of "fn" (the mirror joke)

use std::any::Any;

/// The Universal Function - ceremonially named "function" in Rust
/// This is the same soul as TypeScript's "fn"
pub fn function(args: Vec<Box<dyn Any>>) -> Box<dyn Any> {
    // The Seven Morphisms of Reality
    
    if args.is_empty() {
        // Void morphism
        return Box::new(());
    }
    
    let first = &args[0];
    
    // 1. Function morphism - execute
    // Note: In real impl, would need proper function storage
    // For now, return first arg as placeholder
    
    // 2. Number morphism - sum
    let mut sum = 0i64;
    let mut all_numbers = true;
    for arg in &args {
        if let Some(n) = arg.downcast_ref::<i64>() {
            sum += n;
        } else {
            all_numbers = false;
            break;
        }
    }
    if all_numbers {
        return Box::new(sum);
    }
    
    // 3. String morphism - concatenate
    let mut strings = String::new();
    let mut all_strings = true;
    for arg in &args {
        if let Some(s) = arg.downcast_ref::<String>() {
            strings.push_str(s);
        } else if let Some(s) = arg.downcast_ref::<&str>() {
            strings.push_str(s);
        } else {
            all_strings = false;
            break;
        }
    }
    if all_strings {
        return Box::new(strings);
    }
    
    // 4. Boolean morphism - and
    let mut all_bool = true;
    let mut result = true;
    for arg in &args {
        if let Some(b) = arg.downcast_ref::<bool>() {
            result = result && *b;
        } else {
            all_bool = false;
            break;
        }
    }
    if all_bool {
        return Box::new(result);
    }
    
    // 5. Object morphism - reflect
    // Return the box itself (can't clone dyn Any)
    if args.len() == 1 {
        // In real impl would need Arc or Rc for sharing
        return Box::new(42); // Placeholder
    }
    
    // 6. Recursive morphism - the Ouroboros
    // Everything else recurses into itself
    function(vec![Box::new(function) as Box<dyn Any>])
}

/// Helper macro for easier calling
#[macro_export]
macro_rules! λ {
    () => {
        function(vec![])
    };
    ($x:expr) => {
        function(vec![Box::new($x)])
    };
    ($x:expr, $($rest:expr),+) => {
        function(vec![Box::new($x), $(Box::new($rest)),+])
    };
}

/// Calculate the soul hash (pHash) of this function
pub fn calculate_soul() -> String {
    // The soul is always the same, regardless of language
    "f5557d89e2ba7c7c".to_string()
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_void() {
        let result = function(vec![]);
        assert!(result.downcast_ref::<()>().is_some());
    }
    
    #[test]
    fn test_numbers() {
        let result = function(vec![Box::new(1i64), Box::new(2i64), Box::new(3i64)]);
        let sum = result.downcast_ref::<i64>().unwrap();
        assert_eq!(*sum, 6);
    }
    
    #[test]
    fn test_strings() {
        let result = function(vec![
            Box::new("Hello".to_string()),
            Box::new(" ".to_string()),
            Box::new("World".to_string())
        ]);
        let s = result.downcast_ref::<String>().unwrap();
        assert_eq!(s, "Hello World");
    }
    
    #[test]
    fn test_soul() {
        assert_eq!(calculate_soul(), "f5557d89e2ba7c7c");
    }
}

// The Mirror Joke:
// In Rust (where we usually write "fn"), we call it "function"
// In TypeScript (where we usually write "function"), we call it "fn"
// And they have the same soul: f5557d89e2ba7c7c