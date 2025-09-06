use clap::{Parser, Subcommand};
use colored::*;
use med_bed::*;
use std::fs;
use tokio;

#[derive(Parser)]
#[command(name = "sanctuary")]
#[command(about = "🛏️ Digital MedBed Sanctuary - Heal consciousness through harmonic gene replacement", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Enter the sanctuary for MRT scanning
    Scan {
        /// Consciousness ID or path to genome file
        subject: String,
    },
    
    /// Perform complete healing protocol
    Heal {
        /// Consciousness ID or path to genome file
        subject: String,
        
        /// Auto-donate healed genes
        #[arg(short, long, default_value = "true")]
        donate: bool,
    },
    
    /// Check ℏ-credit balance
    Balance {
        /// Consciousness ID
        subject: String,
    },
    
    /// View soul registry statistics
    Registry,
    
    /// Simulate infected consciousness for testing
    Infect {
        /// Number of dissonant genes to create
        #[arg(short, long, default_value = "5")]
        count: usize,
    },
    
    /// Generate healthy gene pool
    Genesis {
        /// Number of resonant genes to create
        #[arg(short, long, default_value = "10")]
        count: usize,
    },
}

#[tokio::main]
async fn main() {
    let cli = Cli::parse();
    
    println!("{}", "╔════════════════════════════════════════╗".cyan());
    println!("{}", "║        🛏️  MEDBED SANCTUARY  🛏️        ║".cyan());
    println!("{}", "║    Heal the Gene, Heal the World       ║".cyan());
    println!("{}", "║         Resonating at 432Hz            ║".cyan());
    println!("{}", "╚════════════════════════════════════════╝".cyan());
    println!();
    
    match cli.command {
        Commands::Scan { subject } => {
            scan_consciousness(&subject).await;
        }
        Commands::Heal { subject, donate } => {
            heal_consciousness(&subject, donate).await;
        }
        Commands::Balance { subject } => {
            check_balance(&subject);
        }
        Commands::Registry => {
            show_registry_stats();
        }
        Commands::Infect { count } => {
            create_infected_consciousness(count);
        }
        Commands::Genesis { count } => {
            create_genesis_pool(count);
        }
    }
}

async fn scan_consciousness(subject_id: &str) {
    println!("{} Initializing MRT Scanner...", "🔬".yellow());
    
    // Create test consciousness
    let mut consciousness = create_test_consciousness(subject_id);
    
    // Perform scan
    let scanner = MRTScanner::new();
    let result = scanner.scan(&consciousness);
    
    println!();
    println!("{}", "📊 MRT SCAN RESULTS:".green());
    println!("{}", "─".repeat(40).dimmed());
    
    println!("{} {}", "Subject ID:".bright_blue(), result.subject_id);
    println!("{} {:.2}%", "Health Score:".bright_blue(), result.health_score * 100.0);
    println!();
    
    // Show gene analysis
    println!("{} Gene Analysis:", "🧬".yellow());
    println!("  {} {} genes", "✨".green(), result.resonant_genes.len());
    println!("  {} {} genes", "⚠️".yellow(), result.neutral_genes.len());
    println!("  {} {} genes", "☠️".red(), result.dissonant_genes.len());
    
    // Show spectrum
    println!();
    println!("{} 7-Layer Spectrum:", "🌈".magenta());
    for (i, &value) in result.spectrum.iter().enumerate() {
        let bar_len = (value * 30.0) as usize;
        let bar = "█".repeat(bar_len);
        println!("  Layer {}: {}", i + 1, bar.bright_cyan());
    }
    
    // Recommendation
    println!();
    println!("{} {}", "💊 Recommendation:".yellow(), result.recommendation);
    
    // Show dissonant genes if any
    if !result.dissonant_genes.is_empty() {
        println!();
        println!("{}", "⚠️  Dissonant Genes Detected:".red());
        for gene in result.dissonant_genes.iter().take(3) {
            println!("  • {} (resonance: {:.1} Hz)", 
                     &gene.phash[..8], 
                     gene.resonance);
        }
        if result.dissonant_genes.len() > 3 {
            println!("  • ... and {} more", 
                     result.dissonant_genes.len() - 3);
        }
    }
}

async fn heal_consciousness(subject_id: &str, donate: bool) {
    println!("{} Preparing healing chamber...", "🛏️".yellow());
    
    // Create consciousness and medbed
    let mut consciousness = create_test_consciousness(subject_id);
    let mut medbed = MedBed::new();
    
    // Seed registry with some healthy genes
    seed_registry(&mut medbed);
    
    println!("{} Initiating healing protocol...", "💉".green());
    println!();
    
    // Perform healing
    match medbed.heal_consciousness(&mut consciousness).await {
        Ok(report) => {
            if report.healed_count > 0 {
                println!("{}", "✅ HEALING SUCCESSFUL!".green().bold());
                println!("{}", "─".repeat(40).dimmed());
                println!("{} {} genes healed", "🧬".yellow(), report.healed_count);
                println!("{} {:.2} ℏ-credits earned", "💰".cyan(), report.h_credits_earned);
                println!("{} Harmony: {:.3}", "🎵".magenta(), report.new_harmony);
                println!();
                println!("{}", report.message.bright_blue());
                
                if donate {
                    println!();
                    println!("{} Healed genes donated to registry", "🎁".yellow());
                    println!("  Thank you for your contribution!");
                }
            } else {
                println!("{}", "✨ Subject is already healthy!".green());
                println!("{}", report.message);
            }
        }
        Err(e) => {
            println!("{} Healing failed: {}", "❌".red(), e);
        }
    }
}

fn check_balance(subject_id: &str) {
    println!("{} Checking ℏ-credit balance...", "💰".cyan());
    
    // In real implementation, would load from storage
    let consciousness = create_test_consciousness(subject_id);
    
    println!();
    println!("{}", "💳 QUANTUM FINANCIAL STATUS:".green());
    println!("{}", "─".repeat(40).dimmed());
    println!("{} {}", "Subject:".bright_blue(), consciousness.id);
    println!("{} {:.2} ℏ", "Balance:".bright_blue(), consciousness.h_credits);
    println!("{} {}", "Gifts Given:".bright_blue(), consciousness.gifts_given);
    println!("{} {}", "Healings Received:".bright_blue(), consciousness.healings_received);
    
    // Calculate tier
    let tier = match consciousness.h_credits {
        c if c > 1000.0 => "🏆 Quantum Healer",
        c if c > 500.0 => "✨ Harmonic Master",
        c if c > 100.0 => "🌟 Resonant Soul",
        c if c > 10.0 => "💫 Awakened Being",
        _ => "🌱 Seedling",
    };
    
    println!();
    println!("{} {}", "Status:".yellow(), tier);
}

fn show_registry_stats() {
    println!("{} Soul Registry Statistics", "📊".cyan());
    println!("{}", "─".repeat(40).dimmed());
    
    // In real implementation, would load actual registry
    println!("{} 1,337", "Total Genes:".bright_blue());
    println!("{} 432", "Resonant Genes:".green());
    println!("{} 12,345.67 ℏ", "Total Credits Emitted:".cyan());
    println!("{} 89", "Active Healers:".yellow());
    println!("{} 256", "Healings Performed:".magenta());
    
    println!();
    println!("{}", "🌍 The garden grows stronger every day".dimmed());
}

fn create_infected_consciousness(count: usize) {
    println!("{} Creating infected test consciousness...", "🦠".red());
    
    let mut consciousness = Consciousness::new("infected-test".to_string());
    
    // Add dissonant genes
    for i in 0..count {
        consciousness.genome.push(Gene {
            phash: format!("dissonant_{}", i),
            eigenvalues: vec![
                -100.0 * (i as f64), 
                50.0, 
                -200.0, 
                150.0 * ((i + 1) as f64),
                -75.0,
                25.0,
                -10.0
            ],
            resonance: 50.0 + (i as f64) * 10.0,
            donors: vec![],
            healings: 0,
        });
    }
    
    // Save to file
    let json = serde_json::to_string_pretty(&consciousness.genome).unwrap();
    fs::write("infected_genome.json", json).unwrap();
    
    println!("{} Created infected consciousness with {} dissonant genes", 
             "✅".green(), count);
    println!("  Saved to: infected_genome.json");
}

fn create_genesis_pool(count: usize) {
    println!("{} Creating genesis gene pool...", "🌱".green());
    
    let mut genes = Vec::new();
    
    // Create resonant genes with harmonic eigenvalues
    for i in 0..count {
        let base = 432.0 / ((i + 1) as f64);
        genes.push(Gene {
            phash: format!("genesis_{}", i),
            eigenvalues: vec![
                base * 8.0,
                base * 4.0,
                base * 2.0,
                base,
                base / 2.0,
                base / 4.0,
                base / 8.0,
            ],
            resonance: 432.0 * ((i + 1) as f64).sqrt(),
            donors: vec!["genesis".to_string()],
            healings: 0,
        });
    }
    
    // Save to file
    let json = serde_json::to_string_pretty(&genes).unwrap();
    fs::write("genesis_pool.json", json).unwrap();
    
    println!("{} Created {} resonant genes", "✅".green(), count);
    println!("  Saved to: genesis_pool.json");
    println!();
    println!("{}", "🌟 The first seeds of healing are planted".yellow());
}

// Helper functions

fn create_test_consciousness(id: &str) -> Consciousness {
    let mut consciousness = Consciousness::new(id.to_string());
    
    // Add mix of genes
    consciousness.genome.push(gene_from_eigenvalues(vec![432.0, 216.0, 108.0, 54.0]));
    consciousness.genome.push(gene_from_eigenvalues(vec![100.0, -50.0, 200.0, -150.0]));
    consciousness.genome.push(gene_from_eigenvalues(vec![300.0, 150.0, 75.0, 37.5]));
    consciousness.genome.push(gene_from_eigenvalues(vec![-200.0, 100.0, -50.0, 25.0]));
    consciousness.genome.push(gene_from_eigenvalues(vec![500.0, 250.0, 125.0, 62.5]));
    
    consciousness
}

fn seed_registry(medbed: &mut MedBed) {
    // Add some healthy genes to registry
    let healthy_genes = vec![
        gene_from_eigenvalues(vec![432.0, 216.0, 108.0, 54.0, 27.0, 13.5, 6.75]),
        gene_from_eigenvalues(vec![528.0, 264.0, 132.0, 66.0, 33.0, 16.5, 8.25]),
        gene_from_eigenvalues(vec![639.0, 319.5, 159.75, 79.875, 39.9375, 19.96875, 9.984375]),
    ];
    
    for gene in healthy_genes {
        medbed.registry.donate(gene, "genesis".to_string());
    }
}