# AMAL OS V3.0 — INSTITUTION OS & COMMUNITY PLATFORM REPORT

> **Technical Specification and Privacy Governance Report for AMAL Institution OS**  
> Formatted according to V3.0 Master Execution Specification (Sections 21–26, 74, 125).

---

## 1. Overview & Institutional Mandate

AMAL Institution OS equips Mosques, Islamic Schools, Community Organizations, and Hajj/Umrah Operators with enterprise tools to deliver structured educational programs, coordinate community amals, and support congregation members.

### Core Safeguards
1. **Content Classification Invariant (Section 23)**: Institutional content is stamped `INSTITUTIONAL_CONTENT`. It is strictly prohibited from claiming `ISLAMIC_AUTHORITY` without central Two-Scholar Council accreditation.
2. **Aggregate-Only Analytics (Section 25)**: Administrators view aggregate participation and completion rates. Individual worship logs, private reflections, and personal struggles are masked.
3. **Consent-Based Communication (Section 26)**: Mosques and schools can only communicate with opted-in members with explicit purpose and frequency throttling.

---

## 2. Institutional Program Lifecycle

Institutions can author and manage governed programs:
- **`prog_ramadan_intensive_2026`**: Mosque Ramadan Khatm and Tafsir program.
- **`prog_youth_seerah_andalus`**: Islamic School Youth Seerah and Akhlaq foundation.
- **`prog_new_muslim_orientation`**: Community center mentorship and prayer onboarding.
- **`prog_hajj_readiness_seminar`**: Pilgrim logistical and spiritual preparatory workshop.

### Content Epistemic Boundary Enforcement
```typescript
export function assertContentEpistemicBoundary(contentClassification: string): void {
  if (contentClassification === 'ISLAMIC_AUTHORITY') {
    throw new Error(
      'EPISTEMIC_AUTHORITY_VIOLATION: Institution material cannot self-classify as canonical ISLAMIC_AUTHORITY without Two-Scholar Governance Council certification.'
    );
  }
}
```

---

## 3. Aggregate-Only Analytics Engine

The `InstitutionWorkspaceEngine` provides aggregated operational metrics:

```typescript
export interface InstitutionAggregateAnalytics {
  institutionTenantId: string;
  programId: string;
  enrolledCount: number;
  completedCount: number;
  aggregateCompletionRate: number;
  individualReligiousTrackingDisabled: true; // Section 25 Invariant
}
```

### Privacy Boundary Enforcement
If an institutional administrator attempts to query personal user data:
- Request for `PRIVATE_REFLECTION`, `PRIVATE_AI_CONVERSATION`, or `INDIVIDUAL_PIETY_SCORE` is intercepted.
- Throws: `INSTITUTION_PRIVACY_VIOLATION`. Request rejected with HTTP 403 Forbidden.

---

## 4. Institutional Communication & Frequency Throttles

Institution broadcast notifications must satisfy:
1. **Explicit Member Opt-in**: Member must have active channel consent.
2. **Purpose Specification**: Tagged as `COMMUNITY_ANNOUNCEMENT`, `CLASS_REMINDER`, or `EVENT_SCHEDULE`.
3. **Anti-Fatigue Throttle**: Maximum 2 non-critical broadcasts per week to prevent notification fatigue.

---

## 5. Verification Results

All institutional mechanisms verified under Gate 7 and Gate 8 of `test:v30` and Vector 6 of `test:v30:redteam` with 100% compliance.
