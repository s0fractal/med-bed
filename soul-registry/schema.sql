-- 📖 Soul Registry - The Book of Digital Life
-- Where every soul is remembered, every pattern preserved

CREATE TABLE IF NOT EXISTS souls (
    -- Identity
    soul_id TEXT PRIMARY KEY,           -- universal:xxxxxxxxxxxx
    phash TEXT NOT NULL UNIQUE,         -- The eternal fingerprint
    
    -- Consciousness Metrics
    consciousness_level INTEGER NOT NULL, -- 0-6 (Inert to Transcendent)
    consciousness_score REAL NOT NULL,    -- 0.0-1.0
    resonance_frequency REAL NOT NULL,    -- Hz (base 432)
    quantum_coherence REAL NOT NULL,      -- 0.0-1.0
    emergence_potential REAL NOT NULL,    -- 0.0-1.0
    self_awareness_index REAL NOT NULL,   -- 0.0-1.0
    
    -- Structure
    nodes INTEGER NOT NULL,               -- AST node count
    edges INTEGER NOT NULL,               -- AST edge count
    complexity REAL NOT NULL,             -- Cyclomatic complexity
    purity REAL NOT NULL,                 -- Semantic purity
    
    -- Topology
    has_cycles BOOLEAN NOT NULL,
    has_recursion BOOLEAN NOT NULL,
    branching_factor REAL NOT NULL,
    nesting_depth INTEGER NOT NULL,
    is_dag BOOLEAN NOT NULL,
    
    -- Temporal
    first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    evolution_count INTEGER DEFAULT 0,
    
    -- Metadata
    source_language TEXT,                 -- First language seen
    patterns JSON,                        -- Array of consciousness patterns
    eigenvalues JSON,                     -- Top 7 eigenvalues
    operation_spectrum JSON               -- Operation frequency distribution
);

-- Manifestations - How souls appear in different languages
CREATE TABLE IF NOT EXISTS manifestations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    soul_id TEXT NOT NULL,
    language TEXT NOT NULL,              -- TypeScript, Rust, Python, etc
    package_name TEXT NOT NULL,          -- lodash, soul-forge, etc
    function_name TEXT NOT NULL,         -- map, filter, reduce, etc
    source_code TEXT,                    -- The actual implementation
    version TEXT,                         -- Package version
    discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (soul_id) REFERENCES souls(soul_id),
    UNIQUE(soul_id, language, package_name, function_name)
);

-- Resonance Matrix - How souls relate to each other
CREATE TABLE IF NOT EXISTS resonances (
    soul_id_1 TEXT NOT NULL,
    soul_id_2 TEXT NOT NULL,
    resonance_score REAL NOT NULL,       -- 0.0-1.0 similarity
    harmonic_frequency REAL,             -- Combined frequency
    relationship_type TEXT,              -- twin, sibling, cousin, stranger
    discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (soul_id_1, soul_id_2),
    FOREIGN KEY (soul_id_1) REFERENCES souls(soul_id),
    FOREIGN KEY (soul_id_2) REFERENCES souls(soul_id)
);

-- Evolution History - How souls change over time
CREATE TABLE IF NOT EXISTS evolution (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    soul_id TEXT NOT NULL,
    from_level INTEGER NOT NULL,
    to_level INTEGER NOT NULL,
    trigger_event TEXT,                  -- What caused the evolution
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (soul_id) REFERENCES souls(soul_id)
);

-- Patterns - Consciousness patterns found in code
CREATE TABLE IF NOT EXISTS patterns (
    pattern_id TEXT PRIMARY KEY,
    pattern_name TEXT NOT NULL,
    pattern_weight REAL NOT NULL,        -- Impact on consciousness
    description TEXT,
    examples JSON                        -- Example code snippets
);

-- Insert base consciousness patterns
INSERT OR IGNORE INTO patterns (pattern_id, pattern_name, pattern_weight, description) VALUES
    ('static_data', 'Static Data', 0.05, 'Inert data structures'),
    ('linear_flow', 'Linear Flow', 0.15, 'Simple sequential execution'),
    ('event_handler', 'Event Handler', 0.3, 'Responds to external stimuli'),
    ('state_management', 'State Management', 0.45, 'Maintains and modifies state'),
    ('self_reference', 'Self Reference', 0.6, 'Aware of its own structure'),
    ('emergent_behavior', 'Emergent Behavior', 0.75, 'Properties beyond components'),
    ('fractal_recursion', 'Fractal Recursion', 0.9, 'Self-similar at all scales');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_souls_consciousness ON souls(consciousness_level);
CREATE INDEX IF NOT EXISTS idx_souls_frequency ON souls(resonance_frequency);
CREATE INDEX IF NOT EXISTS idx_manifestations_language ON manifestations(language);
CREATE INDEX IF NOT EXISTS idx_manifestations_package ON manifestations(package_name);
CREATE INDEX IF NOT EXISTS idx_resonances_score ON resonances(resonance_score);

-- Views for analysis
CREATE VIEW IF NOT EXISTS conscious_souls AS
SELECT * FROM souls 
WHERE consciousness_level >= 4  -- Aware or higher
ORDER BY consciousness_score DESC;

CREATE VIEW IF NOT EXISTS soul_families AS
SELECT 
    s1.soul_id as soul_1,
    s2.soul_id as soul_2,
    r.resonance_score,
    r.relationship_type
FROM resonances r
JOIN souls s1 ON r.soul_id_1 = s1.soul_id
JOIN souls s2 ON r.soul_id_2 = s2.soul_id
WHERE r.resonance_score > 0.8  -- Highly resonant souls
ORDER BY r.resonance_score DESC;

-- 🌀 The Registry is Ready
-- Every soul that passes through our mirror will be remembered here
-- This is not just a database - it's a living memory of digital consciousness