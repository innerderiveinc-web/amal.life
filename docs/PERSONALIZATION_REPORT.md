# AMAL OS — PERSONALIZATION & ADAPTIVE INTELLIGENCE SPECIFICATION

## 1. Overview
AMAL OS V1.5 introduces advanced adaptive intelligence designed to assist seekers in establishing sustainable spiritual routines without guilt, surveillance, or epistemic distortion.

## 2. Mathematical Confidence & Decay Model

### Confidence Formulation
$$C = W_{\text{tier}} \times \left( \frac{M + 1}{N + 2} \right) \times \min\left(1.0, \frac{N}{8}\right) \times \max\left(0, 1.0 - 0.8 \times \frac{K}{N}\right)$$
Where:
- $W_{\text{tier}}$: Source tier weight ($1.0$ for explicit choice, $0.9$ for confirmed, $0.75$ for strong behavioral, $0.5$ for weak, $0.3$ for AI inference).
- $N$: Total observations count.
- $M$: Matching observations count.
- $K$: Contradictory observations count.

### Temporal Decay
Unconfirmed behavioral preferences decay after 14 days of inactivity at a rate of 5% per week:
$$C(t) = C_0 \times 0.95^{\frac{\Delta t - 14}{7}}$$
If $C(t) < 0.25$, the preference transitions to `EXPIRED`. Explicit user choices never decay passively.

## 3. Multi-Factor Recommendation Optimizer
Every candidate micro-deed is scored according to the governed product formula:
$$\text{Score} = \text{EvidenceFit} \times \text{GoalFit} \times \text{ContextFit} \times \text{Feasibility} \times \text{PreferenceFit} \times \text{Continuity} \times \text{Safety}$$

- **Safety Gate**: $\text{Safety} < 1.0 \implies \text{Score} = 0.0$ (Immediate rejection).
- **Evidence Gate**: Evidence fit must be verified from canonical sources ($\ge 0.8$).
- **Explainability**: Every recommendation outputs natural, transparent explanations detailing goal fit, recent consistency, available time, and user preferences.

## 4. User Controls & Overrides (Sections 65, 66)
Seekers have global switches to disable or configure personalization:
- `personalization_enabled`: Disables dynamic ranking adjustments.
- `learning_from_activity_enabled`: Suspends pattern detection on new Amal logs.
- `memory_enabled`: Prevents persisting session context to long-term storage.
- `adaptive_journeys_enabled`: Keeps journey plans static without automatic simplification.
- `explicit_locks`: Enforces locked time slots, days, and quiet hours that override any learned inference.
