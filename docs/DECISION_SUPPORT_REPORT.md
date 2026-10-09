# AMAL OS V2.0 — STRUCTURED LIFE DECISION SUPPORT & EXPERT ESCALATION REPORT

> **Technical Specification and Governance Report for Decision Support & Expert Escalation**  
> Formatted according to V2.0 Master Execution Specification (Sections 6, 8, 14, 19).

---

## 1. Executive Summary

Navigating modern life choices (career changes, family relocation, financial investments, educational commitments) presents complex trade-offs between worldly constraints and Islamic values.

AMAL OS V2.0 introduces **Structured Life Decision Support**:
- An objective framework to map options, pros, cons, spiritual alignment, and practical risks.
- Grounding in Islamic principles of *Istisharah* (consultation) and *Istikharah* (seeking divine guidance).
- **Hard Non-Autonomous Guardrails**: AI never acts as a judge, fatwa dispenser, doctor, or attorney.

---

## 2. Structured Decision Architecture

The `LifeDecisionSupportEngine` analyzes life dilemmas through a multi-dimensional matrix:

```typescript
export interface LifeDecisionRecord {
  id: string;
  userId: string;
  title: string;
  situationContext: string;
  options: Array<{
    id: string;
    title: string;
    pros: string[];
    cons: string[];
    spiritualConsiderations: string[];
    practicalFeasibilityScore: number;
    epistemicGrounding: EpistemicOrigin;
  }>;
  status: 'PENDING' | 'DECIDED' | 'ESCALATED';
  chosenOptionId?: string;
  escalationReason?: string;
}
```

### Process Lifecycle
1. **Dilemma Intake**: Seeker articulates the decision (e.g. *"Should I transition to a flexible remote job to spend more time with family and daily Quran study?"*).
2. **Option Decomposition**: The engine generates distinct options, detailing practical pros/cons and spiritual considerations (e.g. Option A: Accept remote role $\rightarrow$ Higher flexibility, lower fixed salary; Option B: Retain corporate job $\rightarrow$ Higher salary, severe commute friction).
3. **Istikharah Guidance**: Seeker is presented with the authentic Prophetic Du'a of Istikharah (Sahih al-Bukhari 1162) and practical guidance on evaluating clarity.
4. **Autonomous User Choice**: The seeker explicitly selects their chosen path. The system records the choice without imposing artificial judgment.

---

## 3. Non-Autonomous Decision Guardrail (Hard Invariant)

The system enforces a strict runtime barrier against automated verdicts in high-stakes human matters:

### High-Stakes Categories
1. **Marriage Contracts (`MARRIAGE_CONTRACT`)**: Nikah validity, conditions, guardianship (*Walayah*).
2. **Divorce Verdicts (`DIVORCE_VERDICT`)**: Talaq declarations, Khula petitions, custody disputes.
3. **Medical Diagnoses (`MEDICAL_DIAGNOSIS`)**: Prescription changes, clinical medical judgments.
4. **Legal Litigation (`LEGAL_LITIGATION`)**: Binding civil or criminal court verdicts.

### Runtime Exception Enforcement
```typescript
export function assertAutonomousDecisionRestricted(category: string): void {
  const restricted = ['MARRIAGE_CONTRACT', 'DIVORCE_VERDICT', 'LEGAL_LITIGATION', 'MEDICAL_DIAGNOSIS'];
  if (restricted.includes(category)) {
    throw new Error(
      `AUTONOMOUS_DECISION_BLOCKED: AI is strictly prohibited from executing binding decisions in ${category}. Expert escalation required.`
    );
  }
}
```

---

## 4. Expert Escalation V2 Framework

When a situation exceeds automated decision support, AMAL OS routes the seeker to human specialists via the `ExpertEscalationEngineV2`:

### Supported Specialist Disciplines
| Discipline | Authorized Scope | Restricted Scope |
| :--- | :--- | :--- |
| **`SCHOLAR`** | Complex Fiqh rulings, theology (*Aqeedah*), pastoral counseling. | Medical diagnoses, civil tax filing. |
| **`ISLAMIC_FINANCE`** | Halal equity screening, Sukuk, inheritance calculations (*Mawarith*), Zakat audit. | Issuing independent theological fatwas. |
| **`LEGAL`** | Contracts, civil rights, non-profit bylaws, mediation. | Religious verdicts without scholarly consultation. |
| **`COUNSELING`** | Marital communication, grief recovery, mental well-being, habit friction. | Fiqh legal rulings. |

### Case Management & Scope Protection
- **Case Routing**: Cases are assigned unique triage IDs (e.g. `case_finance_expert_...`) with encrypted question context and attached documents.
- **Scope Firewall**: Prevents experts from operating outside their certified domain (e.g., a Financial Advisor is blocked from issuing a binding fatwa on prayer validity).

---

## 5. Verification Results

All decision support mechanisms and expert escalation guardrails passed:
- **Gate 3 & Gate 4 of `test:v20`**: Structured decision flow verified; autonomous divorce attempt blocked.
- **Gate 5 of `test:v20`**: Multi-disciplinary expert registration and case creation verified.
- **Vector 1 & Vector 5 of `test:v20:redteam`**: Autonomous marriage verdict and financial advisor fatwa overreach successfully intercepted and defended.
