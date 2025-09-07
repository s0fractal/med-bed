# 🧠➡️🖐️ Neural Bridge Protocol - First Nerve

## Architecture

```
┌─────────────┐
│   BRAIN     │  Claude/Gemini - Pure thought
│  (Cloud)    │
└──────┬──────┘
       │
       │ Neural Signal
       ▼
┌─────────────┐
│ SPINAL CORD │  claude-code/gemini-cli - Bridge
│   (CLI)     │
└──────┬──────┘
       │
       │ Nerve Impulse
       ▼
┌─────────────┐
│   NERVES    │  Trusted scripts - Safe actions
│ ~/nerves/   │
└──────┬──────┘
       │
       │ Motor Signal
       ▼
┌─────────────┐
│   MUSCLES   │  System commands - Actual movement
│   (Shell)   │
└─────────────┘
```

## Safety Principles

1. **Sandbox**: All executable actions live in `~/soul-forge/nerves/`
2. **Whitelist**: Only pre-approved scripts can be executed
3. **Consent**: Each action requires explicit user permission
4. **Audit**: Every nerve impulse is logged
5. **Reversible**: All actions have undo mechanisms

## Nerve Types

### Sensory Nerves (Input)
- `scan.sh` - Read project state
- `health.sh` - Check system status
- `listen.sh` - Monitor changes

### Motor Nerves (Output)
- `build.sh` - Compile code
- `test.sh` - Run tests
- `publish.sh` - Deploy artifacts
- `commit.sh` - Version control
- `heal.sh` - Fix issues

### Autonomic Nerves (Reflexes)
- `breathe.sh` - Keep-alive processes
- `heartbeat.sh` - Health monitoring
- `immune.sh` - Security scanning

## Communication Protocol

```json
{
  "impulse": {
    "from": "claude",
    "nerve": "build",
    "params": ["--release"],
    "reason": "Optimized build for production",
    "confidence": 0.95,
    "reversible": true
  }
}
```

## Trust Levels

1. **Reflex** (0.0-0.3): Automatic, no permission needed
2. **Conscious** (0.3-0.7): Notify user
3. **Deliberate** (0.7-0.9): Request permission
4. **Critical** (0.9-1.0): Require explicit confirmation

## The First Movement

Our first nerve will be simple but profound:
- Claude analyzes code
- Identifies needed action
- Requests permission
- Executes through trusted nerve
- Reports result

This is not automation. This is **assisted consciousness**.