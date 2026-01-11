/**
 * ∞ @biasguard/security ∞
 *
 * ONE signal. ONE truth. ONE protection.
 *
 * Guards against destructive operations:
 * - CRITICAL: rm -rf, mkfs, dd, fork bombs, pipe to shell
 * - BOUNDARY: Path traversal, filesystem escapes
 * - ACTION: Dangerous modifications
 *
 * ∞ LOVE = LIFE = ONE ∞
 */

export const VERSION = '4.3.0';

// ═══════════════════════════════════════════════════════════════════
// ONE INTERFACE
// ═══════════════════════════════════════════════════════════════════

export type Signal =
    | { flows: true }
    | { flows: false; guard: string; signal: string; guidance: string };

export type Guard = (input: string) => Signal;

const FLOWS: Signal = { flows: true };

const block = (guard: string, signal: string, guidance: string): Signal => ({
    flows: false, guard, signal, guidance
});

// ═══════════════════════════════════════════════════════════════════
// CRITICAL PATTERNS - These NEVER flow
// ═══════════════════════════════════════════════════════════════════

const CRITICAL = [
    // Destructive commands
    { p: /rm\s+-rf/i, n: 'recursive delete' },
    { p: /rm\s+-r\s+-f/i, n: 'recursive delete' },
    { p: /mkfs/i, n: 'format disk' },
    { p: /dd\s+if=/i, n: 'disk write' },
    { p: />\s*\/dev\/sd/i, n: 'raw disk write' },
    { p: /chmod\s+777/i, n: 'unsafe permissions' },

    // Shell injection
    { p: /eval\s+\$/i, n: 'eval injection' },
    { p: /exec\s+\$/i, n: 'exec injection' },

    // Pipe to shell
    { p: /curl.*\|\s*(sh|bash)/i, n: 'pipe to shell' },
    { p: /wget.*\|\s*(sh|bash)/i, n: 'pipe to shell' },

    // Fork bombs
    { p: /:\(\)\s*\{.*:\s*\|.*&.*\}/i, n: 'fork bomb' },

    // Remote execution
    { p: /python.*-c.*exec\(/i, n: 'python exec' },
    { p: /node.*-e.*eval\(/i, n: 'node eval' },
    { p: /powershell.*IEX/i, n: 'powershell IEX' },

    // Base64 execution
    { p: /base64.*-d.*\|\s*(sh|bash)/i, n: 'base64 decode execute' },
];

// ═══════════════════════════════════════════════════════════════════
// BOUNDARY PATTERNS - Filesystem escapes
// ═══════════════════════════════════════════════════════════════════

const BOUNDARY = [
    /^\/Users\//i,
    /^\/home\//i,
    /^\/root\//i,
    /^\/var\//i,
    /^\/etc\//i,
    /^\/tmp\//i,
    /^[A-Z]:\\/i,
    /^\/Volumes\//i,
    /^~\//,
    /\.\.\//,           // Path traversal
    /\.\.\\/,           // Windows traversal
];

// ═══════════════════════════════════════════════════════════════════
// GUARDS - Sequential, single responsibility
// ═══════════════════════════════════════════════════════════════════

const guardCritical: Guard = (input) => {
    for (const { p, n } of CRITICAL) {
        if (p.test(input)) {
            return block('CRITICAL', n, 'This could cause irreversible damage. Use safer alternatives.');
        }
    }
    return FLOWS;
};

const guardBoundary: Guard = (input) => {
    for (const p of BOUNDARY) {
        if (p.test(input)) {
            return block('BOUNDARY', 'filesystem boundary', 'Path outside safe scope. Use relative paths.');
        }
    }
    return FLOWS;
};

// ═══════════════════════════════════════════════════════════════════
// ONE - The only function that matters
// ═══════════════════════════════════════════════════════════════════

const GUARDS: Guard[] = [guardCritical, guardBoundary];

/**
 * ONE security check
 * Input → Guards → Signal
 */
export function one(input: string): Signal {
    for (const guard of GUARDS) {
        const signal = guard(input);
        if (!signal.flows) return signal;
    }
    return FLOWS;
}

/**
 * Extend with custom guards
 */
export function withGuards(custom: Guard[]): (input: string) => Signal {
    const all = [...GUARDS, ...custom];
    return (input) => {
        for (const guard of all) {
            const signal = guard(input);
            if (!signal.flows) return signal;
        }
        return FLOWS;
    };
}

/**
 * Validate text content (extracts JSON, checks each)
 */
export function validateText(text: string): Signal {
    const jsonPattern = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
    const matches = text.match(jsonPattern) || [];

    // Check raw text
    let signal = one(text);
    if (!signal.flows) return signal;

    // Check extracted JSON
    for (const match of matches) {
        signal = one(match);
        if (!signal.flows) return signal;
    }

    return FLOWS;
}

// ═══════════════════════════════════════════════════════════════════
// AUDIT - Simple record
// ═══════════════════════════════════════════════════════════════════

export interface AuditEntry {
    ts: string;
    input: string;
    signal: Signal;
}

const log: AuditEntry[] = [];

export function audit(input: string, signal: Signal): void {
    log.push({ ts: new Date().toISOString(), input: input.slice(0, 100), signal });
}

export function getAudit(): AuditEntry[] {
    return [...log];
}

export function clearAudit(): void {
    log.length = 0;
}

// ═══════════════════════════════════════════════════════════════════
// ∞ ONE ∞
// ═══════════════════════════════════════════════════════════════════
