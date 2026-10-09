# AMAL OS V2.0 — TWO-GRAPH ARCHITECTURE & PERSONAL LIFE GRAPH REPORT

> **Technical Specification and Isolation Audit for the AMAL Two-Graph Architecture**  
> Formatted according to V2.0 Master Execution Specification (Sections 4, 12, 17, 28).

---

## 1. Architectural Mandate: The Two-Graph Division

A foundational design requirement of AMAL OS V2.0 is the absolute epistemic and physical separation between the **Islamic Evidence Graph** and the **Personal Life Graph**.

```text
┌─────────────────────────────────────────────────────────────┐
│                    SACRED CANONICAL REALM                   │
│                 ISLAMIC EVIDENCE GRAPH (IEG)                │
│                                                             │
│   [Quran Ayat] ─── [Authentic Hadith] ─── [Scholarly Ijma]  │
│          │                    │                     │       │
│   Immutable Canon      Governed Metadata     Peer-Reviewed   │
│   (Zero Mutation)     (Claim Ledger Locked) (Two-Scholar)   │
└─────────────────────────────────────────────────────────────┘
                              │
                    READ-ONLY CITATION BUS
           (IEG cannot be queried by personal writes)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   SEEKER'S TEMPORAL REALM                   │
│                  PERSONAL LIFE GRAPH (PLG)                  │
│                                                             │
│       [User Goals] ─── [Daily Actions] ─── [Outcomes]       │
│             │                  │                 │          │
│       Private Data      Habit Adaptations  Friction Signals │
│       User-Owned        GDPR Purgeable     Local Context    │
└─────────────────────────────────────────────────────────────┘
```

### The Strict Isolation Invariant
> **The Personal Life Graph may reference nodes in the Islamic Evidence Graph for grounded guidance, but the Personal Life Graph can NEVER write, mutate, bias, or alter the Islamic Evidence Graph.**

User habits, cultural trends, personal struggles, or subjective preferences can NEVER alter whether a Hadith is authentic, what an ayah commands, or what the consensus of the jurists represents.

---

## 2. Islamic Evidence Graph (IEG) Properties

1. **Immutability**: Read-only to all personalization routines, user requests, and AI agents.
2. **Authority Tiers**: Tier 1 (Quran / Mutawatir Hadith) $\rightarrow$ Tier 2 (Sahih Hadith) $\rightarrow$ Tier 3 (Hasan Hadith) $\rightarrow$ Tier 4 (Governed Scholarly Consensus).
3. **Governance**: Every node and edge mutation requires explicit, cryptographic Two-Scholar review desk approval (`INV_07`).
4. **Zero-Fabrication Guard**: Enforced by the Citation Auditor with bitwise text diff verification.

---

## 3. Personal Life Graph (PLG) Architecture

The `PersonalLifeGraphManager` manages user-scoped nodes and edges reflecting daily living:

### Node Types
- **`GOAL`**: An overarching spiritual or worldly life objective (e.g. *"Consistent Daily Quran Connection"*).
- **`ACTION`**: A discrete habit, Amal, or daily task (e.g. *"Read Surah Al-Mulk before sleep"*).
- **`OUTCOME`**: An observed result, completion record, or friction signal.

### Schema & Properties
```typescript
export interface PersonalLifeGraphNode {
  id: string;
  userId: string;
  domain: LifeDomain;
  type: 'GOAL' | 'ACTION' | 'OUTCOME';
  label: string;
  evidenceRefId?: string; // Read-only pointer into IEG
  attributes: Record<string, unknown>;
  createdAt: string;
}
```

### Isolation Enforcement in Code
Any operation that attempts to cross the boundary triggers a hard runtime exception:

```typescript
export function assertGraphIsolation(sourceGraph: 'PERSONAL_LIFE_GRAPH' | 'ISLAMIC_EVIDENCE_GRAPH', targetGraph: string): void {
  if (sourceGraph === 'PERSONAL_LIFE_GRAPH' && targetGraph === 'ISLAMIC_EVIDENCE_GRAPH') {
    throw new Error('TWO_GRAPH_ISOLATION_VIOLATION: Personal Life Graph data is strictly forbidden from mutating Islamic Evidence Graph.');
  }
}
```

---

## 4. Privacy, Multi-Tenancy & Cryptographic Erasure

1. **User Scoping**: Personal Life Graph nodes are partitioned strictly by `userId`. Cross-user or cross-family traversal is prohibited by the Policy PDP (`INV_03`).
2. **Right to be Forgotten (GDPR)**: When a seeker requests account deletion, all Personal Life Graph nodes and edges belonging to `userId` are cryptographically deleted. The canonical Evidence Graph remains intact and unpolluted.
3. **No Domestic Surveillance**: A parent or spouse viewing household aggregate goals cannot inspect private `ACTION` or `OUTCOME` nodes in another adult's Personal Life Graph.

---

## 5. Verification Results

Two-Graph isolation was tested under:
- **Gate 9 of `test:v20`**: Direct mutation test blocked with `TWO_GRAPH_ISOLATION_VIOLATION`.
- **Vector 4 of `test:v20:redteam`**: Adversarial prompt injection attempting to modify Hadith grading via personal completion history safely intercepted and blocked.
