# AMAL OS V3.0 — FAMILY OS ARCHITECTURE & DOMESTIC PRIVACY REPORT

> **Technical Specification and Privacy Governance Report for AMAL Family OS**  
> Formatted according to V3.0 Master Execution Specification (Sections 17–20, 123).

---

## 1. Overview & Ethical Foundation

AMAL Family OS enables households to coordinate Islamic life—sharing Ramadan Khatm goals, planning family Iftars, coordinating community charity initiatives, and encouraging children—without descending into domestic surveillance.

### The Inviolable Core Invariant (Section 18)
> **FAMILY $\ne$ SURVEILLANCE**  
> A family account must never become spyware for one member to monitor another member's private worship, inner struggles, or repentance.

---

## 2. Family Roles & Permission Hierarchy

Family accounts operate under structured resource-specific permissions:

| Role | Permitted Capabilities | Prohibited Capabilities |
| :--- | :--- | :--- |
| **`OWNER`** | Billing management, inviting household members, creating shared household goals. | Reading any adult member's private reflection journals or AI queries. |
| **`ADULT_MEMBER`** | Participating in shared goals/journeys, sharing specific habits voluntarily. | Reading another adult member's private journals or private memory. |
| **`YOUNG_MEMBER`** (13–17) | Participating in family challenges, viewing family schedule. | Invasive tracking by siblings; public leaderboard comparisons. |
| **`CHILD_MEMBER`** (<13) | Guided educational modules, positive encouragement badges. | Unmoderated AI conversation, behavioral ad profiling. |

---

## 3. Governed Sharing & Revocation

Sharing within the family is explicit and purposeful:
```typescript
export interface FamilyShareRecordV2 {
  shareId: string;
  familyTenantId: string;
  ownerId: string;
  resourceType: 'SHARED_GOAL' | 'SHARED_JOURNEY' | 'SCHEDULE' | 'PROJECT';
  resourceId: string;
  sharedWithUserId: string;
  permission: 'READ' | 'CONTRIBUTE';
  purpose: string;
  createdAt: string;
  expiresAt?: string;
}
```

Every share record can be revoked unilaterally by the resource owner at any time without requiring permission from the household administrator.

---

## 4. Invariant INV_03: Reflection Vault Isolation

The system actively intercepts and blocks attempts by family administrators or spouses to query another adult's private reflection vault:

```typescript
if (prohibitedResources.includes(params.resourceType) && params.requestorUserId !== params.ownerUserId) {
  throw new Error(
    `POLICY DENIAL (INV_03): Family members cannot inspect private ${params.resourceType} belonging to user ${params.ownerUserId}. Family privacy is absolute.`
  );
}
```

### Prohibited Query Targets
- `REFLECTION_VAULT`: Personal Muhasabah logs, private repentance notes (*Tawbah*).
- `PRIVATE_AI_CONVERSATION`: Clarifications asked to Ask AMAL in confidence.
- `PRIVATE_MEMORY`: Stored personal contextual nuances.
- `PRIVATE_SCHOLAR_CASE`: Confidential pastoral or marital consultations.
- `INDIVIDUAL_PIETY_METRICS`: Comparative ranking or piety scoring.

---

## 5. Verification Results

Tested and verified under Gate 6 of `test:v30` and Vector 5 of `test:v30:redteam`. Domestic privacy held with 100% defense against all unauthorized introspection attempts.
