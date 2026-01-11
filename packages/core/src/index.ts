/**
 * ∞ @biasguard/core ∞
 *
 * ONE source. TWO concerns. INFINITE surfaces.
 *
 * Security: Guards against destructive operations
 * Bias: Reflects cognitive and systemic patterns
 *
 * Import what you need:
 *   import { security } from '@biasguard/core'
 *   import { bias } from '@biasguard/core'
 *   import { one } from '@biasguard/core'  // runs both
 *
 * ∞ LOVE = LIFE = ONE ∞
 */

import * as security from '@biasguard/security';
import * as bias from '@biasguard/bias';

export { security, bias };

export const VERSION = '4.3.0';

// ═══════════════════════════════════════════════════════════════════
// UNIFIED SIGNAL - Combines both concerns
// ═══════════════════════════════════════════════════════════════════

export interface UnifiedSignal {
    security: security.Signal;
    bias: bias.Signal;
    flows: boolean;  // Security passed
    clear: boolean;  // No bias detected
}

// ═══════════════════════════════════════════════════════════════════
// ONE - Runs both security and bias checks
// ═══════════════════════════════════════════════════════════════════

/**
 * ONE unified check
 * Runs security first (blocking), then bias (advisory)
 */
export function one(input: string): UnifiedSignal {
    const securitySignal = security.one(input);
    const biasSignal = bias.one(input);

    return {
        security: securitySignal,
        bias: biasSignal,
        flows: securitySignal.flows,
        clear: biasSignal.clear,
    };
}

/**
 * Security only - for MCP/shell protection
 */
export function secure(input: string): security.Signal {
    return security.one(input);
}

/**
 * Bias only - for content analysis
 */
export function reflect(input: string): bias.Signal {
    return bias.one(input);
}

/**
 * Format unified result for display
 */
export function format(signal: UnifiedSignal): string {
    const lines: string[] = [];

    // Security first (blocking)
    if (!signal.flows) {
        const s = signal.security as security.Signal & { flows: false };
        lines.push(`🛑 BLOCKED: ${s.guard}`);
        lines.push(`   ${s.signal}`);
        lines.push(`   ${s.guidance}`);
        lines.push('');
    }

    // Bias (advisory)
    if (!signal.clear) {
        lines.push(bias.format(signal.bias));
    }

    if (signal.flows && signal.clear) {
        lines.push('✓ All clear');
    }

    return lines.join('\n');
}

// ═══════════════════════════════════════════════════════════════════
// RE-EXPORTS for convenience
// ═══════════════════════════════════════════════════════════════════

export type { Signal as SecuritySignal, Guard, AuditEntry } from '@biasguard/security';
export type { Signal as BiasSignal, Reflection, BiasScore } from '@biasguard/bias';

// ═══════════════════════════════════════════════════════════════════
// ∞ ONE ∞
// ═══════════════════════════════════════════════════════════════════
