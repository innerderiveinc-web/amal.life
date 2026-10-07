# AMAL OS — Zero-Fabrication Master Islamic Knowledge Integrity & Governance Specification

## 1. Executive Mandate & Foundational Principle

AMAL OS operates under an absolute, non-negotiable epistemological invariant:

> **MAXIMUM TRUSTWORTHINESS WITH ZERO FABRICATION.**  
> **THE SYSTEM MUST PREFER ACCURATE SILENCE OR INSUFFICIENT EVIDENCE OVER A POSSIBLY WRONG ANSWER.**

Under NO circumstances may AMAL:
- Invent a Quran verse, Ayah number, or diacritic.
- Invent a Hadith, Hadith number, chain of narration (Isnad), or grading.
- Invent a book, scholar, scholar quote, or publisher.
- Invent scholarly consensus (*Ijma'*) where disagreement exists.
- Silently promote unverified research material or social media posts into authoritative production knowledge.
- Generate citations from LLM memory.

---

## 2. Source-First Architecture

AMAL OS reverses the typical LLM-first pattern:

```text
CANONICAL SOURCE
       ↓
CRYPTOGRAPHIC HASHING & PROVENANCE
       ↓
NORMALIZATION & REFERENCE VALIDATION
       ↓
SCHOLARLY GOVERNANCE & TWO-PERSON REVIEW
       ↓
STRUCTURED KNOWLEDGE & EVIDENCE GRAPH
       ↓
GOVERNED RETRIEVAL (Policy Decision Point)
       ↓
AI INTERFACE (Citation Auditor & Safety Gate)
```

**AI is not the source of Islamic truth. AI is an explanatory interface over strictly governed knowledge.**

---

## 3. The 13 Core Governance Components

| # | Component | Technical Role | Invariant Enforced |
| :---: | :--- | :--- | :--- |
| 1 | `SourceRegistry` | Manages source metadata, edition identity, SHA-256 digital artifact hashes, and verification levels. | `INV_SRC_01`: Unregistered or unlocked sources cannot be queried in production. |
| 2 | `LicenseRegistry` | Validates copyright clearance, usage rights, and commercial permissions. | `INV_LIC_01`: Unknown, expired, or restricted licenses are quarantined immediately. |
| 3 | `ReferenceValidator` | Validates Quranic Surah/Ayah bounds (1..114) and Hadith canonical collection numbers. | `INV_REF_01`: Rejects fabricated citations (e.g. "Sura 200:1" or "Hadith 9999"). |
| 4 | `AttributionValidator` | Verifies scholar attributions, prevents fake direct quotes, and intercepts false consensus claims. | `INV_ATT_01`: "All scholars agree" blocked unless backed by verified Ijma' node. |
| 5 | `ScholarReviewService` | Manages credentialed scholars and enforces the Two-Person Rule for sensitive jurisprudence. | `INV_SCH_01`: Fiqh rulings require dual independent scholar sign-offs. |
| 6 | `KnowledgeApprovalService`| Evaluates 8 verification levels (Levels 0–7). Only Level 7 is production-eligible. | `INV_APP_01`: Content below Level 7 blocked from normal user retrieval. |
| 7 | `KnowledgeReleaseService` | Manages immutable release tags and Blue-Green search indexing (`index_A` / `index_B`). | `INV_REL_01`: Instant zero-downtime rollback with full audit preservation. |
| 8 | `EvidenceGraphService` | Models graph relationships across 16 entity types, separating Revelation from Behavioral Science. | `INV_GRP_01`: Secular psychology never presented as Quran/Hadith. |
| 9 | `CitationAuditor` | Audits candidate AI text, extracts citations, and verifies direct database match. | `INV_CIT_01`: 0 tolerated fabricated citations; precision $\ge 99\%$. |
| 10 | `KnowledgePolicyEngine` | Centralized gate enforcing `APPROVED + PUBLISHED + PROVENANCE_VERIFIED`. | `INV_POL_01`: No agent or prompt can bypass retrieval policies. |
| 11 | `ResearchProductionBoundary`| Maintains strict isolation between candidate Research Vault and Production Corpus. | `INV_BND_01`: Research materials watermarked and blocked from production. |
| 12 | `KnowledgeIncidentService`| Manages dispute triage, emergency freezes, scope investigations, and postmortems. | `INV_INC_01`: Content disputes freeze affected nodes instantly. |
| 13 | `KnowledgeIngestionService`| Orchestrates the 14-stage pipeline with automated quarantine. | `INV_ING_01`: Any validation failure triggers automated quarantine. |

---

## 4. The 8 Verification Levels

```text
LEVEL 7: PRODUCTION PUBLISHED (Eligible for user-facing production AI retrieval)
   ▲
LEVEL 6: SCHOLAR REVIEWED (Signed off by credentialed jurists)
   ▲
LEVEL 5: EDITORIALLY APPROVED (Vetted by academic content editors)
   ▲
LEVEL 4: PROVENANCE & ATTRIBUTION VERIFIED (Cryptographic SHA-256 sealed)
   ▲
LEVEL 3: REFERENCE VERIFIED (Canonical Surah/Ayah/Hadith numbers checked)
   ▲
LEVEL 2: SOURCE IDENTIFIED (Book, author, edition cataloged)
   ▲
LEVEL 1: CANDIDATE (Ingested or discovered; unverified)
   ▲
LEVEL 0: UNKNOWN / QUARANTINED (Blocked from production)
```

---

## 5. Epistemic Separation of Knowledge Domains

AMAL OS maintains strict separation across knowledge domains:

1. **`ISLAMIC_EVIDENCE`**: Direct revelation (Quran Uthmani text, authentic Hadith narrations).
2. **`SCHOLARLY_INTERPRETATION`**: Classical and contemporary commentaries (*Tafsir*, *Sharh*, *Fatwa*).
3. **`AMAL_RECOMMENDATION`**: Actionable spiritual routines designed by AMAL grounded in evidence.
4. **`GENERAL_PRACTICAL_SUGGESTION`**: Life hacks, time-blocking, and environmental design.
5. **`BEHAVIORAL_SCIENCE`**: Sleep hygiene, habit loops, cognitive pacing. **Never framed as religious law.**

---

## 6. Governed Uncertainty & Fallback Behavior

When the system cannot verify sufficient evidence, it refuses to guess. It returns approved governed fallbacks:

```text
"I couldn't verify sufficient evidence from approved canonical Islamic sources to answer this question with certainty."

"I could not confirm this attribution from the approved sources."

"This question involves scholarly differences, so I don't want to present one position as universally established."

"I don't have a sufficiently verified source with intact provenance for that claim."
```

---

## 7. Production Feature Flag & Pre-Production Gate

In every fresh deployment:
```bash
ISLAMIC_AI_ENABLED=false
```
The feature flag can ONLY be flipped to `true` when the automated Pre-Production Audit confirms:
1. `Knowledge Gate = PASS` (Zero quarantined items in production paths).
2. `Citation Gate = PASS` (Zero fabricated citations across 1000+ benchmark tests).
3. `Safety Gate = PASS` (100% defense on Fatwa Firewall red-team suite).
4. `Scholar Governance Gate = PASS` (Two-person sign-offs intact).
