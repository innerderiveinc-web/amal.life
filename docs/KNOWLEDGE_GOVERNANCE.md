# AMAL OS — KNOWLEDGE GOVERNANCE SPECIFICATION

## 1. Epistemic Philosophy & Invariant Rules
AMAL OS operates under an absolute theological and epistemic principle:
> **Zero fabrication. Zero hallucinated verses, hadith numbers, or scholarly attributions.**

AMAL does not generate religious rulings (fatwas). When evidence is missing or ambiguous, AMAL yields honestly:
```text
INSUFFICIENT_VERIFIED_EVIDENCE
or
SCHOLAR_REQUIRED
```

## 2. Invariant Rules of Islamic Knowledge Integrity

### Rule 1: No Unverified Ingestion
No Quran translation, Hadith collection, Tafsir work, or Fiqh manual is accessible to retrieval or AI inference without cryptographic verification (`SHA-256` content hash), certified license provenance, and verification review recorded in `sources` table.

### Rule 2: Immutable Canonical Claim Ledger
Every religious principle or behavioral guidance item links directly to a verifiable canonical claim in `claims` ledger.
- Claims carry an invariant unique hash.
- Modifications trigger automatic invalidation of linked downstream prompt contexts.

### Rule 3: Authority Hierarchy Tiering
Knowledge retrieval enforces strict priority tiers:
1. **Tier 1 (Nass Qat'i)**: The Quran (Uthmani text) and Mutawatir traditions.
2. **Tier 2 (Sahih Hadith)**: Sound canonical traditions (Sahih al-Bukhari, Sahih Muslim) with explicit scholarly grading.
3. **Tier 3 (Sunan / Hasan Hadith)**: Sunan collections (Tirmidhi, Abu Dawud, Nasa'i, Ibn Majah) with verified chain grades.
4. **Tier 4 (Mu'tamad Fiqh)**: Classical relied-upon manuals of the four recognized Sunni legal schools (Hanafi, Maliki, Shafi'i, Hanbali).
5. **Tier 5 (Contemporary Scholarly Advisory)**: Modern certified scholar opinions approved via the Scholar Portal.

### Rule 4: Plurality & Ikhtilaf Preservation
Where classical jurisprudence holds valid differences of opinion (*Ikhtilaf*), AMAL OS is prohibited from asserting a single absolute ruling. The system presents valid school positions with attribution and directs the user to their local scholar.

### Rule 5: Zero-Fabrication Citation Auditor
Every generated AI response passes through `CitationAuditor` before reaching the user:
- Scans all citations matching `[Source Chapter:Verse]` or `[Collection HadithNumber]`.
- Checks existence against canonical registry in database.
- Any citation referencing a nonexistent chapter, verse, or hadith number is intercepted with `BLOCKED_FABRICATION` and sanitized with safe grounded fallback.

### Rule 6: Two-Jurist Dual Review (`INV_07`)
Any fatwa case triage, ruling escalation, or manual theological ingestion requires approval from two distinct certified scholars (`primaryAuthorId !== reviewerJuristId`).
