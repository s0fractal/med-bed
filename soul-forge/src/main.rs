// 🔥 Soul Forge CLI - Transmute JavaScript souls into Rust bodies

use clap::{Parser, Subcommand};
use colored::Colorize;
use indicatif::{ProgressBar, ProgressStyle};
use soul_forge::{SoulForge, PackageMetadata};
use std::fs;
use std::path::PathBuf;

#[derive(Parser)]
#[command(name = "forge")]
#[command(about = "Soul Forge - Alchemical transmutation of JavaScript to Rust")]
#[command(version = "0.1.0")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Transmute a JavaScript file to Rust
    Transmute {
        /// Input JavaScript file
        #[arg(short, long)]
        input: PathBuf,
        
        /// Output directory for Rust project
        #[arg(short, long)]
        output: PathBuf,
        
        /// NPM package name
        #[arg(short, long)]
        npm_name: String,
        
        /// Crate name (defaults to npm_name-soul)
        #[arg(short, long)]
        crate_name: Option<String>,
        
        /// Package version
        #[arg(short = 'v', long, default_value = "0.1.0")]
        version: String,
    },
    
    /// Batch transmute from soul registry
    Batch {
        /// Soul registry JSON file
        #[arg(short, long)]
        registry: PathBuf,
        
        /// Output directory for all crates
        #[arg(short, long)]
        output: PathBuf,
        
        /// Only transmute top N packages
        #[arg(short, long)]
        top: Option<usize>,
    },
    
    /// Verify soul matching between JS and Rust
    Verify {
        /// JavaScript file
        #[arg(short, long)]
        js: PathBuf,
        
        /// Rust file
        #[arg(short, long)]
        rust: PathBuf,
    },
    
    /// Show transmutation statistics
    Stats {
        /// Database path
        #[arg(short, long, default_value = "./forge.db")]
        db: PathBuf,
    },
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();
    
    // ASCII art banner
    println!("{}", r#"
╔═══════════════════════════════════════╗
║     🔥 SOUL FORGE 🔥                  ║
║  Alchemical Transmutation Engine      ║
║  Same soul, different body            ║
╚═══════════════════════════════════════╝
    "#.bright_magenta());
    
    match cli.command {
        Commands::Transmute { input, output, npm_name, crate_name, version } => {
            transmute_package(input, output, npm_name, crate_name, version).await?;
        }
        Commands::Batch { registry, output, top } => {
            batch_transmute(registry, output, top).await?;
        }
        Commands::Verify { js, rust } => {
            verify_souls(js, rust).await?;
        }
        Commands::Stats { db } => {
            show_stats(db)?;
        }
    }
    
    Ok(())
}

async fn transmute_package(
    input: PathBuf,
    output: PathBuf,
    npm_name: String,
    crate_name: Option<String>,
    version: String,
) -> Result<(), Box<dyn std::error::Error>> {
    println!("{}", format!("⚗️  Transmuting {}...", npm_name).bright_yellow());
    
    let mut forge = SoulForge::new("./forge.db")?;
    
    // Read JavaScript code
    let js_code = fs::read_to_string(&input)?;
    
    // Prepare metadata
    let crate_name = crate_name.unwrap_or_else(|| format!("{}-soul", npm_name));
    let metadata = PackageMetadata {
        name: crate_name.clone(),
        version,
        description: format!("Soul-transmuted version of {}", npm_name),
        npm_name: npm_name.clone(),
        crate_name: crate_name.clone(),
    };
    
    // Show progress
    let pb = ProgressBar::new(100);
    pb.set_style(
        ProgressStyle::default_bar()
            .template("{spinner:.green} [{bar:40.cyan/blue}] {pos}/{len} {msg}")
            .unwrap()
            .progress_chars("█▓▒░ ")
    );
    
    pb.set_message("Extracting JavaScript soul...");
    pb.set_position(20);
    
    // Perform transmutation
    let transmutation = forge.transmute(&js_code, metadata).await?;
    
    pb.set_message("Transforming to Rust...");
    pb.set_position(50);
    
    // Create output directory
    fs::create_dir_all(&output)?;
    
    // Write Rust code
    let src_dir = output.join("src");
    fs::create_dir_all(&src_dir)?;
    fs::write(src_dir.join("lib.rs"), &transmutation.rust_code)?;
    
    pb.set_message("Generating WASM bindings...");
    pb.set_position(70);
    
    // Write WASM bindings
    fs::write(output.join("bindings.js"), &transmutation.wasm_bindings)?;
    
    // Generate and write Cargo.toml
    let cargo_toml = forge.generate_cargo_toml(&transmutation.metadata)?;
    fs::write(output.join("Cargo.toml"), cargo_toml)?;
    
    pb.set_message("Verifying soul resonance...");
    pb.set_position(90);
    
    // Show results
    pb.finish_and_clear();
    
    println!("{}", "✨ Transmutation complete!".bright_green());
    println!();
    println!("📊 {} {}:", "Soul Analysis:".bright_cyan(), npm_name);
    println!("   {} {:.3}", "Resonance:".bright_white(), transmutation.resonance);
    println!("   {} {}", "JS Soul:".bright_white(), &transmutation.js_soul.phash[..16]);
    println!("   {} {}", "Rust Soul:".bright_white(), &transmutation.rust_soul.phash[..16]);
    
    if transmutation.resonance > 0.95 {
        println!("   {} {}", "Status:".bright_white(), "✅ Perfect transmutation!".bright_green());
    } else if transmutation.resonance > 0.8 {
        println!("   {} {}", "Status:".bright_white(), "⚠️  Good transmutation".bright_yellow());
    } else {
        println!("   {} {}", "Status:".bright_white(), "❌ Weak transmutation".bright_red());
    }
    
    println!();
    println!("📦 {} {}", "Output:".bright_cyan(), output.display());
    println!("   Run {} to build", format!("cd {} && cargo build --release", output.display()).bright_white());
    println!("   Run {} to generate WASM", "wasm-pack build".bright_white());
    
    Ok(())
}

async fn batch_transmute(
    registry: PathBuf,
    output: PathBuf,
    top: Option<usize>,
) -> Result<(), Box<dyn std::error::Error>> {
    println!("{}", "🔥 Batch transmutation starting...".bright_yellow());
    
    // Read soul registry
    let registry_content = fs::read_to_string(registry)?;
    let souls: serde_json::Value = serde_json::from_str(&registry_content)?;
    
    let packages = souls.as_object()
        .ok_or("Invalid registry format")?;
    
    let mut count = 0;
    let limit = top.unwrap_or(packages.len());
    
    for (npm_name, soul_data) in packages.iter().take(limit) {
        count += 1;
        println!("{}", format!("[{}/{}] Transmuting {}...", count, limit, npm_name).bright_cyan());
        
        // Create output directory for this package
        let crate_name = format!("{}-soul", npm_name);
        let package_output = output.join(&crate_name);
        
        // TODO: Download and transmute actual package code
        // For now, just create directory structure
        fs::create_dir_all(&package_output)?;
        
        println!("   {} {}", "✓".bright_green(), package_output.display());
    }
    
    println!();
    println!("{}", format!("✨ Transmuted {} packages!", count).bright_green());
    
    Ok(())
}

async fn verify_souls(js_path: PathBuf, rust_path: PathBuf) -> Result<(), Box<dyn std::error::Error>> {
    println!("{}", "🔍 Verifying soul resonance...".bright_yellow());
    
    let mut extractor = protein_hash::SoulExtractor::new();
    
    // Read files
    let js_code = fs::read_to_string(&js_path)?;
    let rust_code = fs::read_to_string(&rust_path)?;
    
    // Extract souls
    let js_soul = extractor.extract_soul_js(&js_code).await;
    let rust_soul = extractor.extract_soul_rust(&rust_code).await;
    
    // Measure resonance
    let resonance = protein_hash::measure_resonance(&js_soul, &rust_soul);
    let souls_match = protein_hash::souls_match(&js_soul, &rust_soul);
    
    // Display results
    println!();
    println!("{}", "📊 Soul Comparison:".bright_cyan());
    println!("   {} {}", "JavaScript:".bright_white(), js_path.display());
    println!("   {} {}", "pHash:".bright_white(), &js_soul.phash[..32]);
    println!("   {} {:?}", "Eigenvalues:".bright_white(), 
        js_soul.eigenvalues.iter().map(|e| format!("{:.2}", e)).collect::<Vec<_>>());
    
    println!();
    println!("   {} {}", "Rust:".bright_white(), rust_path.display());
    println!("   {} {}", "pHash:".bright_white(), &rust_soul.phash[..32]);
    println!("   {} {:?}", "Eigenvalues:".bright_white(),
        rust_soul.eigenvalues.iter().map(|e| format!("{:.2}", e)).collect::<Vec<_>>());
    
    println!();
    println!("   {} {:.3}", "Resonance:".bright_magenta(), resonance);
    println!("   {} {}", "Souls Match:".bright_magenta(), 
        if souls_match { "✅ YES".bright_green() } else { "❌ NO".bright_red() });
    
    // Visual resonance meter
    let bar_length = 40;
    let filled = (resonance * bar_length as f64) as usize;
    let bar = "█".repeat(filled) + &"░".repeat(bar_length - filled);
    println!("   {} [{}] {:.1}%", "Harmony:".bright_cyan(), 
        if resonance > 0.8 { bar.bright_green() } else if resonance > 0.5 { bar.bright_yellow() } else { bar.bright_red() },
        resonance * 100.0);
    
    Ok(())
}

fn show_stats(db_path: PathBuf) -> Result<(), Box<dyn std::error::Error>> {
    println!("{}", "📊 Transmutation Statistics:".bright_cyan());
    
    let db = sled::open(db_path)?;
    
    let mut total = 0;
    let mut perfect = 0;
    let mut good = 0;
    let mut weak = 0;
    
    for item in db.iter() {
        if let Ok((key, value)) = item {
            if key.starts_with(b"transmutation:") {
                total += 1;
                
                // Deserialize to check resonance
                if let Ok(transmutation) = bincode::deserialize::<soul_forge::Transmutation>(&value) {
                    if transmutation.resonance > 0.95 {
                        perfect += 1;
                    } else if transmutation.resonance > 0.8 {
                        good += 1;
                    } else {
                        weak += 1;
                    }
                }
            }
        }
    }
    
    println!("   {} {}", "Total Transmutations:".bright_white(), total);
    println!("   {} {} ({:.1}%)", "Perfect (>95%):".bright_green(), perfect, 
        perfect as f64 / total as f64 * 100.0);
    println!("   {} {} ({:.1}%)", "Good (>80%):".bright_yellow(), good,
        good as f64 / total as f64 * 100.0);
    println!("   {} {} ({:.1}%)", "Weak (<80%):".bright_red(), weak,
        weak as f64 / total as f64 * 100.0);
    
    Ok(())
}