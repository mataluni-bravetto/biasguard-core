# BiasGuard Core

**ONE source. TWO concerns. INFINITE surfaces.**

```
∞ LOVE = LIFE = ONE ∞
```

## Status

**Public on GitHub. Not yet published to npm.**

BiasGuard is open source and usable today via GitHub clone or local file references.
npm packages are planned but not yet published.

## Packages

| Package | Purpose |
|---------|---------|
| `@biasguard/security` | Destructive operation protection |
| `@biasguard/bias` | Cognitive/systemic bias detection |
| `@biasguard/core` | Both unified |

## Installation (Current)

### Option A: Git clone

```bash
git clone https://github.com/mataluni-bravetto/biasguard-core.git
cd biasguard-core
npm install
npm run build
```

### Option B: Local workspace / monorepo

Use file references in your `package.json`:

```json
{
  "dependencies": {
    "@biasguard/security": "file:../biasguard-core/packages/security"
  }
}
```

> `npm install @biasguard/security` will work **after npm publication**.

## Usage

### Security Only (MCP/Shell Protection)

```typescript
import { one } from '@biasguard/security';

const signal = one('rm -rf /');
// { flows: false, guard: 'CRITICAL', signal: 'recursive delete', guidance: '...' }

const safe = one('echo hello');
// { flows: true }
```

### Bias Only (Content Analysis)

```typescript
import { one, format } from '@biasguard/bias';

const signal = one('The algorithm says she is high-risk');
// { clear: false, reflections: [...], score: { score: 75, severity: 'high', ... } }

console.log(format(signal));
// ⚠️ Bias Score: 75/100 (HIGH)
// Primary: research: automation bias
// ...
```

### Both (Unified)

```typescript
import { one, format } from '@biasguard/core';

const signal = one(userInput);

if (!signal.flows) {
    // Security blocked - stop
    return;
}

if (!signal.clear) {
    // Bias detected - show reflection
    console.log(format(signal));
}
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    @biasguard/core                          │
│                                                             │
│   ┌─────────────────────┐   ┌─────────────────────┐        │
│   │ @biasguard/security │   │   @biasguard/bias   │        │
│   │                     │   │                     │        │
│   │ • CRITICAL guard    │   │ • truth mirror      │        │
│   │ • BOUNDARY guard    │   │ • context mirror    │        │
│   │                     │   │ • cognitive mirror  │        │
│   │ Signal: flows/block │   │ • fallacy mirror    │        │
│   │                     │   │ • workplace mirror  │        │
│   │                     │   │ • research mirror   │        │
│   │                     │   │                     │        │
│   │                     │   │ Signal: clear/score │        │
│   └─────────────────────┘   └─────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
   ┌───────────┐       ┌───────────┐       ┌───────────┐
   │  VS Code  │       │  Chrome   │       │    MCP    │
   │ Extension │       │ Extension │       │  Server   │
   │    ✅     │       │  planned  │       │  planned  │
   └───────────┘       └───────────┘       └───────────┘
```

## Security Model & Limitations

BiasGuard uses **pattern-based detection** on raw input.

It does **not** perform:
- Unicode normalization
- URL/hex decoding before validation
- Shell parsing or expansion
- Sandboxing or execution prevention

Known bypass classes are documented via adversarial testing (Jacob harness in consuming surfaces).

**BiasGuard is a guardrail, not a sandbox.**

It reduces risk by catching obvious destructive patterns. It does not guarantee safety against determined adversaries or novel encodings.

## Versioning

All packages share the same version. Surfaces pin exact versions.

```
@biasguard/core@4.3.0
├── @biasguard/security@4.3.0
└── @biasguard/bias@4.3.0
```

## Zero Drift Protocol

**Target workflow** for keeping all surfaces in sync:

| Step | Action | Status |
|------|--------|--------|
| 1 | Change patterns in this repo | ✅ Works |
| 2 | `npm run version:patch` (or minor/major) | ✅ Works |
| 3 | `git tag vX.Y.Z && git push --tags` | ✅ Works |
| 4 | CI publishes to npm | ⏳ Planned |
| 5 | Dependabot updates all surfaces | ⏳ Planned |
| 6 | All surfaces deploy with identical version | ⏳ Planned |

**Today:** Steps 1-3 are manual. Steps 4-6 require CI setup and npm publication.

---

*∞ AbëONE ∞*
