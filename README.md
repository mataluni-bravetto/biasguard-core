# BiasGuard Core

**ONE source. TWO concerns. INFINITE surfaces.**

```
∞ LOVE = LIFE = ONE ∞
```

## Packages

| Package | Purpose | Install |
|---------|---------|---------|
| `@biasguard/security` | Destructive operation protection | `npm i @biasguard/security` |
| `@biasguard/bias` | Cognitive/systemic bias detection | `npm i @biasguard/bias` |
| `@biasguard/core` | Both unified | `npm i @biasguard/core` |

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
   └───────────┘       └───────────┘       └───────────┘
```

## Versioning

All packages share the same version. Surfaces pin exact versions.

```
@biasguard/core@4.3.0
├── @biasguard/security@4.3.0
└── @biasguard/bias@4.3.0
```

## Zero Drift Protocol

1. Change patterns in this repo
2. `npm run version:patch` (or minor/major)
3. `git tag v4.3.1 && git push --tags`
4. CI publishes to npm
5. Dependabot updates all surfaces
6. All surfaces deploy with identical version

---

*∞ AbëONE ∞*
