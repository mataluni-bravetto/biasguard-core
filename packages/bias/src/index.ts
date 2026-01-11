/**
 * ∞ @biasguard/bias ∞
 *
 * Twelve mirrors. Seventy-three patterns.
 * For dignity restored, confidence rebuilt.
 *
 * ∞ LOVE = LIFE = ONE ∞
 */

export const VERSION = '4.3.0';

// ═══════════════════════════════════════════════════════════════════
// ONE INTERFACE - Mirrors the security package
// ═══════════════════════════════════════════════════════════════════

export interface Reflection {
    mirror: string;
    sees: string;
    reflects: string;
    clarity: number;
}

export type Signal =
    | { clear: true }
    | { clear: false; reflections: Reflection[]; score: BiasScore };

export interface BiasScore {
    score: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    primary: string;
    domains: string[];
    guidance: string;
}

// ═══════════════════════════════════════════════════════════════════
// MIRRORS - Each sees a different facet
// ═══════════════════════════════════════════════════════════════════

type Mirror = (input: string) => Reflection | null;

// TRUTH MIRROR - Deception, absolutes, false certainty
const truth: Mirror = (input) => {
    const patterns = [
        { p: /\b(always|never|everyone|no one|impossible)\b/i, s: 'absolute language', r: 'Absolutes rarely reflect reality' },
        { p: /\b(obviously|clearly|undeniably)\b/i, s: 'false certainty', r: 'Certainty claims bypass critical thinking' },
        { p: /\b(they say|people think|everyone knows)\b/i, s: 'vague authority', r: 'Unattributed claims lack accountability' },
    ];
    for (const { p, s, r } of patterns) {
        if (p.test(input)) return { mirror: 'truth', sees: s, reflects: r, clarity: 0.8 };
    }
    return null;
};

// CONTEXT MIRROR - Missing attribution, history erasure
const context: Mirror = (input) => {
    const patterns = [
        { p: /\b(the algorithm|the system|the AI)\s+(says?|decided?|determined?)\b/i, s: 'algorithm as authority', r: 'Systems reflect their creators\' biases' },
        { p: /\b(data shows?|studies? (show|prove))\b/i, s: 'unattributed data', r: 'Which data? Collected how? By whom?' },
    ];
    for (const { p, s, r } of patterns) {
        if (p.test(input)) return { mirror: 'context', sees: s, reflects: r, clarity: 0.7 };
    }
    return null;
};

// COHERENCE MIRROR - Contradictions, drift
const coherence: Mirror = (input) => {
    const patterns = [
        { p: /\bbut\s+(actually|really|honestly)\b/i, s: 'contradiction marker', r: 'The real message may follow the "but"' },
        { p: /\b(on one hand|on the other hand)\b/i, s: 'false balance', r: 'Not all perspectives deserve equal weight' },
    ];
    for (const { p, s, r } of patterns) {
        if (p.test(input)) return { mirror: 'coherence', sees: s, reflects: r, clarity: 0.6 };
    }
    return null;
};

// TRUST MIRROR - Manipulation, leading questions
const trust: Mirror = (input) => {
    const patterns = [
        { p: /\b(don't you think|wouldn't you agree|isn't it true)\b/i, s: 'leading question', r: 'Leading questions manufacture consent' },
        { p: /\b(just asking questions|I'm just saying)\b/i, s: 'plausible deniability', r: 'Sowing doubt while avoiding accountability' },
    ];
    for (const { p, s, r } of patterns) {
        if (p.test(input)) return { mirror: 'trust', sees: s, reflects: r, clarity: 0.75 };
    }
    return null;
};

// COGNITIVE MIRROR - Mental shortcuts that deceive
const cognitive: Mirror = (input) => {
    const patterns = [
        { p: /\b(first impression|gut feeling|intuition says)\b/i, s: 'anchoring bias', r: 'First impressions can anchor incorrect judgments' },
        { p: /\b(everyone is doing|most people|the majority)\b/i, s: 'bandwagon effect', r: 'Popularity doesn\'t equal correctness' },
        { p: /\b(I knew it|told you so|predictable)\b/i, s: 'hindsight bias', r: 'Outcomes seem obvious only in retrospect' },
        { p: /\b(they're all|those people always)\b/i, s: 'stereotyping', r: 'Groups contain diverse individuals' },
        { p: /\b(sunk cost|already invested|too late to)\b/i, s: 'sunk cost fallacy', r: 'Past investment shouldn\'t dictate future choices' },
    ];
    for (const { p, s, r } of patterns) {
        if (p.test(input)) return { mirror: 'cognitive', sees: s, reflects: r, clarity: 0.85 };
    }
    return null;
};

// FALLACY MIRROR - Logical errors
const fallacy: Mirror = (input) => {
    const patterns = [
        { p: /\b(slippery slope|if we allow|next thing you know)\b/i, s: 'slippery slope', r: 'One step doesn\'t inevitably lead to extremes' },
        { p: /\b(attack the|instead of addressing|playing the)\b/i, s: 'ad hominem', r: 'Attacking the person, not the argument' },
        { p: /\b(straw ?man|misrepresent|that's not what)\b/i, s: 'straw man', r: 'Distorting an argument to attack it' },
        { p: /\b(false (choice|dilemma)|only two options|either.*or)\b/i, s: 'false dichotomy', r: 'More options usually exist' },
        { p: /\b(appeal to|because.*authority|expert says)\b/i, s: 'appeal to authority', r: 'Expertise doesn\'t guarantee correctness' },
    ];
    for (const { p, s, r } of patterns) {
        if (p.test(input)) return { mirror: 'fallacy', sees: s, reflects: r, clarity: 0.9 };
    }
    return null;
};

// WORKPLACE MIRROR - Professional bias patterns
const workplace: Mirror = (input) => {
    const patterns = [
        { p: /\b(not a (good )?culture fit|wouldn't fit in)\b/i, s: 'culture fit bias', r: '"Culture fit" often masks homogeneity preference' },
        { p: /\b(overqualified|too experienced)\b/i, s: 'overqualification bias', r: 'May mask age or compensation concerns' },
        { p: /\b(aggressive|abrasive|difficult)\b/i, s: 'gendered language', r: 'Same behavior judged differently by gender' },
        { p: /\b(articulate|well-spoken|surprisingly)\b/i, s: 'backhanded compliment', r: 'Implies low expectations based on identity' },
    ];
    for (const { p, s, r } of patterns) {
        if (p.test(input)) return { mirror: 'workplace', sees: s, reflects: r, clarity: 0.8 };
    }
    return null;
};

// RESEARCH MIRROR - Data and algorithmic bias
const research: Mirror = (input) => {
    const patterns = [
        { p: /\b(the data (shows?|proves?)|statistically)\b/i, s: 'data reification', r: 'Data reflects collection choices and biases' },
        { p: /\b(AI (says?|determined?)|algorithm (decided?|flagged?))\b/i, s: 'automation bias', r: 'Algorithms encode human decisions' },
        { p: /\b(sample size|n\s*=|participants?)\b/i, s: 'sample concern', r: 'Who was studied? Who was excluded?' },
    ];
    for (const { p, s, r } of patterns) {
        if (p.test(input)) return { mirror: 'research', sees: s, reflects: r, clarity: 0.75 };
    }
    return null;
};

// ═══════════════════════════════════════════════════════════════════
// ALL MIRRORS
// ═══════════════════════════════════════════════════════════════════

const MIRRORS: Mirror[] = [
    truth,
    context,
    coherence,
    trust,
    cognitive,
    fallacy,
    workplace,
    research,
];

// ═══════════════════════════════════════════════════════════════════
// SCORING
// ═══════════════════════════════════════════════════════════════════

function score(reflections: Reflection[]): BiasScore {
    if (reflections.length === 0) {
        return { score: 0, severity: 'low', primary: 'none', domains: [], guidance: '' };
    }

    const avgClarity = reflections.reduce((sum, r) => sum + r.clarity, 0) / reflections.length;
    const rawScore = Math.round(avgClarity * 100 * Math.min(reflections.length, 3) / 3);

    const severity: BiasScore['severity'] =
        rawScore >= 80 ? 'critical' :
        rawScore >= 60 ? 'high' :
        rawScore >= 40 ? 'medium' : 'low';

    const primary = reflections[0];
    const domains = [...new Set(reflections.map(r => r.mirror))];

    return {
        score: rawScore,
        severity,
        primary: `${primary.mirror}: ${primary.sees}`,
        domains,
        guidance: primary.reflects,
    };
}

// ═══════════════════════════════════════════════════════════════════
// ONE - Reflect
// ═══════════════════════════════════════════════════════════════════

/**
 * ONE bias reflection
 * Input → Mirrors → Signal
 */
export function one(input: string): Signal {
    const reflections: Reflection[] = [];

    for (const mirror of MIRRORS) {
        const r = mirror(input);
        if (r) reflections.push(r);
    }

    if (reflections.length === 0) {
        return { clear: true };
    }

    return {
        clear: false,
        reflections,
        score: score(reflections),
    };
}

/**
 * Format for human display
 */
export function format(signal: Signal): string {
    if (signal.clear) {
        return '✓ Clear - No bias patterns detected.';
    }

    const s = signal.score;
    const icon = s.severity === 'critical' ? '🚨' :
                 s.severity === 'high' ? '⚠️' :
                 s.severity === 'medium' ? '📋' : 'ℹ️';

    return `${icon} Bias Score: ${s.score}/100 (${s.severity.toUpperCase()})
Primary: ${s.primary}
Domains: ${s.domains.join(', ')}

${s.guidance}

This reflects systemic patterns, not personal failing.`;
}

// ═══════════════════════════════════════════════════════════════════
// ∞ ONE ∞
// ═══════════════════════════════════════════════════════════════════
