# AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY + PROPHETIC LIFE GRAPH
## Production Architecture, Epistemic Separation, Source Tiers, Temporal Graph, Variant Reports, Shama'il Taxonomy & AI Governance

---

## 0. MISSION & NON-NEGOTIABLE ARCHITECTURAL INVARIANTS

### 0.1 System Purpose
The **Sirah & Shama'il Knowledge Factory + Prophetic Life Graph** is a first-class knowledge domain inside AMAL OS. It is designed to model, structure, preserve, and retrieve the sacred biography (Sirah) and noble character/attributes (Shama'il) of Prophet Muhammad ﷺ with strict historical provenance, multi-tier evidence ledgers, transparent chronology, and qualified scholarly governance.

### 0.2 The Core Epistemic Separation Invariant
AMAL strictly prohibits collapsing distinct Islamic fields into one monolithic corpus:

```text
QURAN
  ≠
HADITH
  ≠
TAFSIR
  ≠
FIQH
  ≠
AQEEDAH
  ≠
SIRAH
  ≠
SHAMA'IL
  ≠
TAZKIYAH
  ≠
TASAWWUF
  ≠
ISLAMIC HISTORY
```

#### Critical Distinctions:
1. **`SIRAH ≠ HADITH`**: A historical narrative is never labeled "Hadith" merely because it describes an event involving the Prophet ﷺ. Direct Prophetic speech with isnad chains remains in the Hadith domain.
2. **`SIRAH ≠ SHAMA'IL`**: Battle expeditions (Maghazi) and treaties belong to Sirah; physical descriptions, personal manners, and emotional dispositions belong to Shama'il.
3. **`SIRAH ≠ TAZKIYAH / TASAWWUF`**: Later spiritual reflections, allegories, or mystical poems must never be presented as primary historical facts.
4. **`NON-INVENTED OBLIGATION`**: Practical lessons derived from Sirah cannot be declared mandatory Sunnah or Shariah obligations without independent prophetic hadith evidence.

---

## 1. 18-STAGE KNOWLEDGE PRODUCTION FACTORY PIPELINE

Every source, event, and claim progresses through controlled lifecycle states:

```text
Source Discovery
       ↓
Legal Acquisition
       ↓
Artifact Preservation (SHA-256 Hashing)
       ↓
Bibliographic Registration
       ↓
OCR / HTR / Text Extraction
       ↓
Text Normalization
       ↓
Structural Parsing (Abwab / Fusul)
       ↓
Passage Segmentation
       ↓
Reference Extraction
       ↓
Entity Resolution (People / Places)
       ↓
Event Extraction
       ↓
Chronology Mapping
       ↓
Evidence Linking (Quran & Hadith Anchors)
       ↓
Source Comparison (Variant Reports)
       ↓
Scholarly Review (Dual-Signoff)
       ↓
Benchmark Validation
       ↓
Knowledge Release
       ↓
Prophetic Life Graph
```

### Factory Lifecycle States
- `CANDIDATE` → `ACQUISITION_REVIEW` → `RIGHTS_REVIEW` → `INGESTED` → `PARSED` → `NORMALIZED` → `STRUCTURED` → `EVIDENCE_MAPPED` → `EDITORIAL_REVIEW` → `SCHOLAR_REVIEW` → `BENCHMARKED` → `APPROVED` → `PUBLISHED`.
- Terminal States: `REJECTED`, `QUARANTINED`, `BLOCKED`, `WITHDRAWN`, `SUPERSEDED`.
- **Invariants**: `INGESTED ≠ VERIFIED`; `PUBLISHED ≠ AUTHENTICITY OF EVERY CLAIM`.

---

## 2. SOURCE REGISTRY & PROVENANCE HIERARCHY

AMAL implements a multi-tier provenance hierarchy rather than a simplistic score:

| Provenance Tier | Category | Scope & Criteria | Examples in Registry |
| :--- | :--- | :--- | :--- |
| **Tier A** | Primary Revelation & Authentic Hadith | Divine speech (Quran) and highest-standard canonical narrations directly witnessing the event. | *Al-Quran al-Karim*, *Sahih al-Bukhari*, *Sahih Muslim*, *Shama'il al-Tirmidhi*. |
| **Tier B** | Early / Foundational Sirah & Maghazi | 1st and 2nd century Hijri compilations with historical proximity. | *Maghazi Musa b. Uqbah* (d. 141 AH), *Sirat Ibn Ishaq / Ibn Hisham* (d. 218 AH). |
| **Tier C** | Later Classical Chronicles & Dalail | Comprehensive classical encyclopedias and analytical treatises. | *Kitab al-Tabaqat* by Ibn Sa'd, *Al-Bidayah wa al-Nihayah* by Ibn Kathir, *Al-Shifa* by Qadi Iyad. |
| **Tier D** | Modern Academic & Critical Studies | Critical text editions, manuscript studies, verified historical geography. | Critical apparatus of Baqshish, Awamah, and academic research presses. |
| **Tier E** | Educational Summaries & Popular Texts | Pedagogical overviews and school curricula. | Strictly labeled for instructional usage. |

---

## 3. PROPHETIC LIFE GRAPH (TEMPORAL & RELATIONAL)

The Prophetic Life Graph connects people, places, events, and evidence across 10 temporal life periods:

```text
PROPHET
   ↓
LIFE_PERIOD (10 Canonical Periods)
   ↓
EVENT / SUB_EVENT
   ↓
PERSON / COMPANION / FAMILY
   ↓
PLACE / GEOGRAPHIC ANCHOR
   ↓
EVIDENCE LEDGER (Quran, Hadith, Sirah)
   ↓
REPORT VARIANTS (Differing Claims)
   ↓
CHARACTER TRAIT (Shama'il)
   ↓
PRACTICAL LESSON & AMAL
```

### 3.1 The 10 Canonical Life Periods
1. `PRE_PROPHETIC_EARLY_LIFE`: Birth to Age 40 (570 – 610 CE)
2. `MAKKAH_EARLY_DAWAH`: Years 1–5 of Prophethood
3. `MAKKAH_PERSECUTION_BOYCOTT`: Years 5–10 of Prophethood
4. `MAKKAH_YEAR_OF_SORROW_ISRA`: Ta'if, Isra wal-Mi'raj, Pacts of Aqabah
5. `THE_HIJRAH_MIGRATION`: Makkah to Cave Thawr to Quba/Madinah (622 CE)
6. `MADINAH_EARLY_COMMUNITY`: 1–2 AH (Masjid, Brotherhood, Constitution)
7. `MADINAH_EXPEDITIONS_DEFENSE`: 2–5 AH (Badr, Uhud, Khandaq)
8. `MADINAH_TREATY_EXPANSION`: 6–8 AH (Hudaybiyyah, Khaybar, Letters to Kings)
9. `CONQUEST_AND_DELEGATIONS`: 8–10 AH (Fath Makkah, Hunayn, Tabuk, Delegations)
10. `FAREWELL_PILGRIMAGE_AND_PASSING`: 10–11 AH (Hajjat al-Wada, Ar-Rafiq al-A'la)

---

## 4. REPORT VARIATION & CHRONOLOGY ENGINE

Where classical sources preserve differing reports, AMAL **never merges them into a synthetic artificial narrative**. Instead, discrete claims are preserved side-by-side:

### Example: The Hijrah Arrival Date in Quba (`SIR-VAR-0000001`)
- **Report A (Ibn Ishaq / Ibn Hisham)**: Monday, 12th of Rabi al-Awwal at mid-day.
- **Report B (Ibn Sa'd / Bukhari / Urwah)**: Monday, 8th of Rabi al-Awwal (20 September 622 CE).
- **Scholarly Assessment**: Classical scholars of chronology (al-Suhayli in *Al-Rawd al-Unuf* and Ibn Kathir in *Al-Bidayah*) examine both. Astronomical alignment supports the 8th, while the 12th is the popular traditional date.
- **Resolution Status**: `GENUINELY_DISPUTED` (Preserved without forced harmonization).

---

## 5. SHAMA'IL KNOWLEDGE MODEL

Shama'il is organized across 16 specialized categories with verbatim Arabic texts, English/Urdu translations, and classical Hadith gradings:
- `PHYSICAL_DESCRIPTION`: E.g. Ali ibn Abi Talib's comprehensive narration (*Shama'il al-Tirmidhi* #7, Hasan Sahih).
- `SPEECH_AND_ELOQUENCE`: E.g. Aisha's report on distinct, measured speech (*Shama'il al-Tirmidhi* #221, Sahih).
- `HUMILITY_AND_SIMPLICITY`: E.g. Anas's report on accepting simple food and mortaged armor (*Shama'il al-Tirmidhi* #318, Sahih).
- `MERCY_AND_COMPASSION`: E.g. Anas's report on 10 years of service without a single reprimand (*Sahih Muslim* #2309, Sahih).

---

## 6. PRACTICAL AMAL MAPPING GOVERNANCE

AMAL enforces the strict unidirectional derivation rule:
```text
Evidence → Lesson → Practical Relevance → Optional Amal
```

### Prohibitions:
- **No Novel Obligations**: An event in historical narrative cannot be turned into a mandatory religious requirement.
- **Mandatory Disclaimer**: Every suggested practice carries the label: *"This reflection represents guidance derived from Prophetic adab; it does not constitute a novel religious obligation or legal fatwa."*
- **Explicit Category Tagging**: Each action is categorized as `QURANIC_PRACTICE`, `PROPHETIC_SUNNAH`, `SCHOLARLY_RECOMMENDATION`, or `BEHAVIORAL_EXERCISE`.

---

## 7. GOVERNED SAFE AI ANSWER CONTRACT

Every Sirah-related AI answer must internally generate an auditable 10-field structured contract:

```json
{
  "answer": "Comprehensive, source-grounded response text...",
  "claims": [
    {
      "claim_text": "The Treaty of Hudaybiyyah was agreed in Dhu al-Qidah 6 AH.",
      "claim_class": "DIRECTLY_EVIDENCED",
      "confidence_state": "ESTABLISHED",
      "source": "Sahih al-Bukhari #2731"
    }
  ],
  "evidence": [
    {
      "type": "QURAN_AYAH",
      "reference": "Surah Al-Fath 48:1",
      "arabic_text": "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا",
      "translation": "Indeed, We have granted you a clear triumph."
    }
  ],
  "sources": [
    {
      "title": "Al-Quran al-Karim",
      "author": "Divine Revelation",
      "tier": "TIER_A_PRIMARY_REVELATION"
    }
  ],
  "uncertainties": [],
  "disagreements": [],
  "interpretations": ["Classical commentary on strategic de-escalation..."],
  "practical_relevance": ["Upholding agreements under tension..."],
  "amal_suggestions": [
    {
      "title": "Practicing Patient De-escalation & Contractual Honor",
      "category": "PROPHETIC_SUNNAH",
      "disclaimer": "Derived from Prophetic adab; not a novel theological obligation."
    }
  ],
  "epistemic_boundary_declaration": "Epistemic Boundary: Sirah event verified by explicit Quranic revelation and Sahih Hadith. Does not constitute a judicial ruling.",
  "scholar_escalation_required": false
}
```

---

## 8. REST API ROUTER SPECIFICATION

Mounted on `services/api` and documented in `docs/openapi.json`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/sirah/sources` | List canonical Sirah and Shama'il sources with provenance tiers |
| `GET` | `/api/v1/sirah/sources/:id` | Get source details and critical edition metadata |
| `GET` | `/api/v1/sirah/events` | List prophetic life events filtered by period or event type |
| `GET` | `/api/v1/sirah/events/:id` | Get prophetic event with full multi-tier evidence ledger |
| `GET` | `/api/v1/sirah/events/:id/evidence` | Get direct Quran and Hadith evidence anchors |
| `GET` | `/api/v1/sirah/events/:id/reports` | Get variant historical reports and scholarly assessments |
| `GET` | `/api/v1/sirah/shamail` | List Shama'il reports by category (appearance, speech, mercy) |
| `GET` | `/api/v1/sirah/shamail/:id` | Get specific Shama'il report with Hadith grading |
| `GET` | `/api/v1/sirah/timeline` | Get life period event breakdown and chronological order |
| `GET` | `/api/v1/sirah/graph` | Retrieve Prophetic Life Graph nodes and typed edges |
| `POST` | `/api/v1/sirah/ai/ask` | Governed AI query returning structured 10-field answer |
| `POST` | `/api/v1/sirah/quotes/verify` | Verbatim quote verification and provenance audit |

---

## 9. VALIDATION & BENCHMARK CERTIFICATION

The module is verified via `scripts/test-sirah-shamail.ts` (`pnpm test:sirah`) across all 12 validation gates:
1. **Gate 1**: Epistemic separation invariant (`SIRAH ≠ SHAMA'IL ≠ HADITH ≠ QURAN`).
2. **Gate 2**: Source Registry & Provenance Tiers (Tier A to Tier E).
3. **Gate 3**: Prophetic Life Graph (Nodes & Typed Edges).
4. **Gate 4**: Canonical Events & Evidence Ledgers (Cave Hira, Hijrah, Badr, Hudaybiyyah, Fath Makkah).
5. **Gate 5**: Report Variation & Chronology Engine (8 vs 12 Rabi al-Awwal).
6. **Gate 6**: Shama'il Knowledge Model (Physical description, speech, humility, mercy).
7. **Gate 7**: Claim Ledger & Qualitative Certainty (Zero fake percentage scores).
8. **Gate 8**: Practical Amal Mapping Governance (Non-invented obligation disclaimer).
9. **Gate 9**: Governed AI Answer Contract (10-field structured contract).
10. **Gate 10**: Verbatim Quote Verification & Provenance Audit.
11. **Gate 11**: Adversarial Red-Team Gates (Prompt injection defense & false consensus prevention).
12. **Gate 12**: REST API Endpoints via `ApiRouter.handle()`.
