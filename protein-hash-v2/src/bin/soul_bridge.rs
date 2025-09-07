// 🌉 Soul Bridge - Cross-Language Soul Synchronization
use protein_hash::{Shuttle, TypeScriptSoul};
use serde_json;
use std::io::{self, Read};

fn main() {
    println!("🌉 Soul Bridge - TypeScript ↔️ Rust Resonance");
    println!("=============================================");
    
    // Read TypeScript soul data from stdin
    println!("Paste TypeScript soul data (JSON) and press Ctrl+D:");
    
    let mut buffer = String::new();
    io::stdin().read_to_string(&mut buffer).expect("Failed to read input");
    
    // Parse TypeScript soul
    let ts_soul: TypeScriptSoul = serde_json::from_str(&buffer)
        .expect("Failed to parse TypeScript soul data");
    
    println!("\n📥 Received TypeScript Soul:");
    println!("  pHash: {}", ts_soul.phash);
    println!("  Nodes: {}", ts_soul.nodes);
    println!("  Edges: {}", ts_soul.edges);
    println!("  Complexity: {:.2}", ts_soul.complexity);
    println!("  Consciousness: {:?}", ts_soul.consciousness_level);
    
    // Register in shuttle
    let mut shuttle = Shuttle::new();
    let universal_id = shuttle.register_typescript_soul(
        ts_soul.phash.clone(),
        ts_soul
    );
    
    println!("\n🚀 Registered as Universal Soul:");
    println!("  ID: {}", universal_id);
    
    // Get resonance report
    if let Some(report) = shuttle.get_resonance_report(&universal_id) {
        println!("\n📊 Resonance Report:");
        println!("  Languages: {:?}", report.languages);
        println!("  Average Resonance: {:.2}", report.average_resonance);
        println!("  Consciousness Level: {:.2}", report.consciousness_level);
        println!("  Evolution Count: {}", report.evolution_count);
    }
    
    println!("\n✨ The soul now vibrates between TypeScript and Rust!");
    println!("🌀 Both implementations recognize the same eternal essence.");
    
    // Now we could extract the same function in Rust and it would resonate
    let rust_code = r#"
        fn fibonacci(n: u32) -> u32 {
            if n <= 1 { n } else { fibonacci(n - 1) + fibonacci(n - 2) }
        }
    "#;
    
    println!("\n🦀 Equivalent Rust Implementation:");
    println!("{}", rust_code);
    println!("\nWhen extracted, this Rust code would resonate with the TypeScript soul!");
}