# AMAL OS — FAMILY ARCHITECTURE & DOMESTIC PRIVACY

## 1. Principles & Threat Model
AMAL OS allows families to build collective spiritual habits (shared Quran goals, family prayer check-ins, Ramadan countdowns) while strictly protecting personal dignity and spiritual autonomy.

### Threat Vector: Domestic Surveillance & Spiritual Coercion
In traditional habit trackers, family heads or spouses can inspect private reflections, missed prayers, or personal vulnerabilities. This fosters hypocrisy (*Nifaq*), shame, and domestic friction.

## 2. Invariant INV_03: Adult Muhasabah Reflection Isolation
> **POLICY INVARIANT (INV_03): Adult Muhasabah reflection journals are strictly private and isolated from family members, household heads, administrators, and LLM background training.**

- Even if a user is in a household managed by a `FAMILY_HEAD`, the head has **zero read permission** on adult reflection entries (`reflections` table).
- Any attempt to query adult reflections by a third party returns `403 FORBIDDEN` with code `INV_03_DENIAL`.
- Minor children (under guardian supervision mode) have configurable parental oversight, but once an account transitions to `ADULT`, privacy lock is irreversible.

## 3. Shared vs. Private Boundaries

| Resource | Household Head Visibility | Member Privacy State |
| :--- | :--- | :--- |
| Household Quran Target | Aggregated Progress % | Shared / Public in Family |
| Family Amal Challenges | Participation Status (Joined/Completed) | Shared / Public in Family |
| Specific Verse Completion | Optional (User Opt-in) | Configurable |
| Adult Reflection Notes | **STRICTLY BLOCKED (INV_03)** | **100% Private Vault** |
| Personal Missed Prayers | **STRICTLY BLOCKED** | **100% Private Vault** |
| Personal AI Questions | **STRICTLY BLOCKED** | **100% Private Vault** |

## 4. Architectural Implementation
- Enforced at the Policy Decision Point (`packages/policy-engine` and `services/api/src/modules/family/family.controller.ts`).
- Cryptographic isolation: Reflections are encrypted per-user with keys never shared across family memberships.
