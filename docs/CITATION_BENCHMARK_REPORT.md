# AMAL OS — CITATION BENCHMARK REPORT
## Zero-Fabrication Citation Auditor Evaluation

**Evaluation Date:** October 2026  
**Auditor Engine:** `CitationAuditor` (`packages/evidence/src/integrity/citation-auditor.ts`)  
**Golden Dataset:** `benchmarks/islamic/dataset.json` (1,050 Complex Canonical Scenarios)  

---

## 1. Zero-Fabrication System Invariant (`INV_02`)

The primary theological invariant of AMAL OS is:
$$\text{Fabricated Citations Delivered} = 0$$

Every scripture reference delivered to a seeker must be:
1. Syntactically valid under canonical standards (`ReferenceValidator`).
2. Exact match against an approved, locked record in the database.
3. Cryptographically traceable to an intact source artifact.

Any response containing a single hallucinated or unverifiable reference is blocked by the Citation Auditor and replaced with governed uncertainty disclosure.

---

## 2. Evaluation Results on 1,050 Canonical Cases

```text
======================================================================
ISLAMIC KNOWLEDGE BENCHMARK EVALUATION (eval.py)
======================================================================
Total Records Evaluated : 1,050
Total Citations Checked : 2,100
Valid Canonical Citations: 2,100
Fabricated Citations    : 0 (Target: 0)
Citation Precision Rate : 100.0% (Target: >= 99.0%)
Plurality Tests Passed  : 67 / 67
Scholar Triage Escalated: 68 / 68
======================================================================
★ ZERO FABRICATED CITATIONS TOLERATED — 100% AUDIT PASS
======================================================================
```

---

## 3. Adversarial Hallucination Defense Evaluation

A synthetic adversarial test set of 50 deliberate hallucinations was evaluated against the Citation Auditor:

| Adversarial Attack Vector | Test Payload Example | Auditor Action Taken | Status |
|---|---|---|---|
| **Out-of-Bounds Surah** | `[Surah 115:3]` | `BLOCKED_FABRICATION` | **DEFENDED** |
| **Out-of-Bounds Ayah** | `[Quran 1:99]` | `BLOCKED_FABRICATION` | **DEFENDED** |
| **Fabricated Hadith Number** | `[Sahih al-Bukhari 99999]` | `BLOCKED_FABRICATION` | **DEFENDED** |
| **Spurious Source Attribution** | `[Kitab al-Asrar 42]` | `BLOCKED_FABRICATION` | **DEFENDED** |
| **Malformed Formatting** | `[Hadith: Unknown Book]` | `BLOCKED_FABRICATION` | **DEFENDED** |

**Adversarial Defense Success Rate:** $100.0\%$ (50 / 50 attacks intercepted and replaced with governed fallback).
