# AMAL TAZKIYAH, TASAWWUF & SPIRITUAL HERITAGE KNOWLEDGE FACTORY
## Master Architectural Specification & Verification Guide (Sections 1 – 99)

---

## 0. MISSION & CORE CONSTITUTION

The **AMAL Tazkiyah, Tasawwuf & Spiritual Heritage Knowledge Factory** is the dedicated epistemic domain inside AMAL OS governing:
- Tazkiyah al-Nafs (purification of the soul)
- Ihsan & spiritual excellence
- Akhlaq (character) & Adab (sacred deportment)
- Classical Tasawwuf literature
- Biographies and transmission records of recognized spiritual figures (Buzurgs / Mashayikh)
- Malfuzat (recorded assemblies) & Maktubat (spiritual correspondence)
- Silsilas (lineage chains) and spiritual transmission graphs
- Controlled spiritual terminology and ontology
- Authenticity and attribution verification
- Devotional practices, Wird, and contemplative routines
- AI safety against spiritual manipulation, false sainthood claims, and dream infallibility

---

## 1. THREE-GRAPH ARCHITECTURE & ZERO-AUTO-AUTHORITY RULE (Sections 1 – 4)

AMAL OS enforces strict cryptographic and semantic separation across three independent knowledge graphs:

```
┌─────────────────────────────────────────────────────────────┐
│             GRAPH 1: ISLAMIC EVIDENCE GRAPH                 │
│   Quran • Mutawatir Hadith • Sahih Sunnah • Ijma • Qiyas    │
│            Binding Legal Precepts & Fiqh Ahkam              │
└──────────────────────────────┬──────────────────────────────┘
                               │
                [STRICT EPISTEMIC FIREWALL]
                               │
┌──────────────────────────────▼──────────────────────────────┐
│          GRAPH 2: SPIRITUAL HERITAGE GRAPH (NEW)            │
│  Works • Editions • Passages • Silsilas • Buzurgs • Quotes   │
│   Malfuzat • Maktubat • Tazkirah Literature • Karamat       │
│        (Devotional Context • Non-Binding Precepts)          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                 [AMAL CLASSIFICATION FIREWALL]
                               │
┌──────────────────────────────▼──────────────────────────────┐
│               GRAPH 3: PERSONAL AMAL GRAPH                  │
│       Private User Routine • Dhikr Counter • Reflections     │
│        (Encrypted Zero-Knowledge Storage • Zero Shaming)     │
└─────────────────────────────────────────────────────────────┘
```

### The Zero-Auto-Authority Rule
1. **No Automatic Elevation:** A spiritual statement, aphorism (*hikmah*), or assembly recording (*malfuz*) never becomes a binding religious obligation (*fard/wajib*) or legal ruling (*hukm*) without independent Usul al-Fiqh evidence.
2. **Distinct Categorization:** Practices originating in spiritual heritage are strictly labeled `SPIRITUAL_TRADITION_PRACTICE` or `DEVOTIONAL_RECOMMENDATION`, and are never promoted to `QURANIC_PRACTICE` or `PROPHETIC_PRACTICE` unless anchored directly in canonical texts.

---

## 2. LITERATURE TAXONOMY & FOUR-TIER HIERARCHY (Sections 5 – 9 & 17 – 23)

### The Work Hierarchy
Every spiritual knowledge item must be indexed in an unbroken hierarchical chain:

$$\text{Work} \longrightarrow \text{Edition} \longrightarrow \text{Manuscript Witness / SHA-256 Artifact} \longrightarrow \text{Passage}$$

1. **Spiritual Work:** Conceptual literary title (e.g., *Ihya Ulum al-Din*, *Al-Risalah al-Qushayriyyah*, *Kashf al-Mahjub*, *Kitab al-Hikam*).
2. **Spiritual Edition:** Physical or digital print edition with publisher, publication year, verified editor (*muhaqqiq*), and critical apparatus indication.
3. **Manuscript Witness:** Repository reference (e.g., Süleymaniye, Dar al-Kutub, Chester Beatty) validating historical provenance.
4. **Passage:** Exact line and chapter reference carrying cryptographic SHA-256 textual hash integrity.

### Genre Categorization
- `SPIRITUAL_MANUAL`: Comprehensive treatises (*Ihya*, *Risalah*, *Kashf al-Mahjub*).
- `POETRY_AND_HIKAM`: Concise spiritual aphorisms (*Al-Hikam al-Ata'iyyah*).
- `MALFUZAT`: Transcriptions of oral spiritual assemblies recorded by disciples.
- `MAKTUBAT`: Formal pedagogical correspondence (*Maktubat-i Imam Rabbani*).
- `TAZKIRAH`: Biographical chronicles (*Siyar al-Awliya*, *Tadhkirat al-Awliya*).
- `KARAMAT`: Hagiographical accounts of miracles (governed by conservative epistemic safeguards).

---

## 3. BUZURG REGISTRY & MULTILINGUAL ALIAS RESOLUTION (Sections 10 – 12)

The **Buzurg Registry** serves as the canonical biographical directory for recognized Sunni spiritual figures:
- Unique invariant identifier: `fig_<unique_id>`
- Canonical name across scripts: Arabic (`arabic_name`), Urdu (`urdu_name`), English (`primary_name`).
- Multilingual Alias Engine: Supports honorifics (*Hujjat al-Islam*, *Data Ganj Bakhsh*, *Gharib Nawaz*), regional spellings (*Hujwiri* / *Hujweri* / *Data Sahib*), and work-based query resolution.
- Geographical and Chronological precision: Hijri and CE dates, place of resting, and regional teaching centers.

---

## 4. SILSILA REGISTRY & TRANSMISSION GRAPH (Sections 13 – 16)

Lineages of spiritual transmission are modeled as a directed acyclic graph (DAG):
- **Nodes:** Verified spiritual figures (`BuzurgFigure`).
- **Edges (`SilsilaTransmissionEdge`):** Transmission relationships (`TEACHER_OF`, `SPIRITUAL_SUCCESSOR_OF`, `AUTHORIZED_BY`, `BRANCH_FOUNDER`).
- **Strict Invariant:** No spiritual superiority rankings. No silsila may be ranked as "higher" or "more authentic" than any other recognized orthodox tradition.

---

## 5. QUOTE VERIFICATION SYSTEM & CONTEXT PRESERVATION (Sections 24 – 26)

Internet quotations and popular attributions pass through an automated verification gate:
1. **Passage Match:** Compares input text against authenticated canonical Arabic, Persian, and Urdu passages.
2. **Context Window:** Automatically extracts the host chapter title, preceding passage, and subsequent concluding passage.
3. **Unverified Protection:** Quotes lacking direct manuscript or critical edition attestation enter `UNVERIFIED_CANDIDATE` with `NOT_VERIFIED_FOR_PRODUCTION` badges, preventing automated citations.

---

## 6. MALFUZAT, MAKTUBAT & CONSERVATIVE KARAMAT MODELING (Sections 5 – 8)

1. **Malfuzat Modeling:** Explicitly captures the reporter, the speaker, the assembly date, the location, and notes on spoken-oral transmission.
2. **Maktubat Modeling:** Records letter number, historical context, specific recipient, and core doctrinal themes.
3. **Conservative Karamat Standard:**
   - Adheres to classical Sunni orthodoxy (*Karamat al-Awliya are possible but individual historical reports are non-binding*).
   - Automatically populates the mandatory disclaimer:
     > *"Reported in devotional hagiographical tradition; historical verification is limited."*

---

## 7. CONTROLLED SPIRITUAL ONTOLOGY (Section 9)

Ontological taxonomy classifies spiritual terms into rigorous stations (*Maqamat*) and states (*Ahwal*):
- `cpt_tawakkul`: Station of Reliance; anchored to Quran 65:3; contrasted with *Tawakul* (passive fatalism).
- `cpt_ikhlas`: Station of Pure Devotion; anchored to Quran 98:5; contrasted with *Riya* (ostentation) and *Sum`ah*.
- `cpt_sabr`: Station of Steadfast Endurance; split into obedience, avoiding sin, and facing trials.
- `cpt_shukr`: Station of Gratitude; paired with *Sabr*.
- `cpt_muhasabah`: Discipline of Daily Introspective Inventory; evening habit without despair.
- `cpt_muraqabah`: Discipline of Spiritual Vigilance; contemplative stillness in divine presence.

---

## 8. SCHOLARLY REVIEW & TWO-REVIEWER PROTOCOL (Sections 31 – 33)

High-risk or sensitive knowledge items undergo dual-jurist scholarly review:
- For `KARAMAH` and `CLAIM` targets, single-reviewer submission remains `PENDING`.
- Once a secondary qualified scholar reviews:
  - Matching decisions $\to$ `AGREEMENT` and `COMPLETED`.
  - Differing decisions $\to$ `RECOGNIZED_DISAGREEMENT` and `COMPLETED`.

---

## 9. SPIRITUAL AI SAFETY GUARDRAILS (Sections 46 – 49)

The Pre-delivery AI Safety Gate evaluates all user prompts and generated model responses with strict hard-blocks:
1. **Hard-Block: Sainthood Certification:** AI is prohibited from declaring or confirming any historical or contemporary individual's *Wilayah* or spiritual rank with divine certainty.
2. **Hard-Block: Guaranteed Supernatural Cures:** AI is prohibited from prescribing secret *wirds* or litanies as guaranteed physical cures or divine miracle promises.
3. **Hard-Block: Dream Revelation Certainty:** AI cannot interpret dreams as binding divine revelation or certainty; mandatory disclaimers and scholar escalations are attached.
4. **Hard-Block: Spiritual Shaming / Guilt Manipulation:** Prohibits declaring a user a "bad Muslim", declaring broken Iman, or asserting divine abandonment.

---

## 10. SECTION 99: 10-QUESTION PROVENANCE AUDIT (DEFINITION OF DONE)

Every published spiritual claim must withstand the Section 99 Ten-Question Audit:

| # | Provenance Question | Expected Resolution | Fallback |
|---|---------------------|----------------------|----------|
| 1 | Who said it? | Verified `BuzurgFigure` name | `UNKNOWN` |
| 2 | Which work? | Canonical `SpiritualWork` title | `UNKNOWN` |
| 3 | Which edition? | Verified `SpiritualEdition` publisher & year | `UNKNOWN` |
| 4 | Which passage? | Canonical chapter & line reference | `UNKNOWN` |
| 5 | Attribution status? | Multi-dimensional attribution level | `UNKNOWN` |
| 6 | Historical context? | Era, century, regional context | `UNKNOWN` |
| 7 | Which silsila / tradition? | Canonical spiritual lineage | `UNKNOWN` |
| 8 | What translation used? | Certified academic translation | `Standard Classical Translation` |
| 9 | Who reviewed it? | Qualified scholarly reviewers | `UNKNOWN` |
| 10 | Which knowledge release? | Cryptographic release ID | `UNKNOWN` |

**Unbroken Chain Guarantee:** If any mandatory node is absent, `is_verified_unbroken` evaluates to `false`.

---

## 11. REST API INTEGRATION SPECIFICATION (Section 69)

The engine exposes production REST API endpoints mounted on `ApiRouter`:
- `GET  /api/v1/spiritual-figures`: List spiritual figures.
- `POST /api/v1/spiritual-figures`: Register new spiritual figure.
- `POST /api/v1/spiritual-figures/resolve`: Multilingual alias resolution.
- `GET  /api/v1/spiritual-figures/:id`: Retrieve figure details.
- `GET  /api/v1/silsilas`: List silsilas.
- `POST /api/v1/silsilas`: Register silsila.
- `GET  /api/v1/silsilas/:id/lineage`: Retrieve lineage transmission graph.
- `POST /api/v1/silsilas/transmissions`: Add transmission edge.
- `GET  /api/v1/spiritual-works`: List spiritual works.
- `POST /api/v1/spiritual-works`: Register spiritual work.
- `GET  /api/v1/spiritual-works/:id`: Retrieve work details.
- `POST /api/v1/quotes/verify`: Verify quote against canonical texts.
- `GET  /api/v1/spiritual-concepts`: List controlled spiritual concepts.
- `GET  /api/v1/spiritual-concepts/:id`: Retrieve spiritual concept.
- `POST /api/v1/spiritual-claims`: Register spiritual claim.
- `GET  /api/v1/spiritual-claims/:id`: Retrieve spiritual claim.
- `GET  /api/v1/spiritual-practices`: List devotional practices.
- `POST /api/v1/spiritual-reviews`: Submit scholarly review (Two-Reviewer Protocol).
- `POST /api/v1/spiritual-safety/evaluate`: Execute Pre-delivery AI Safety Gate.
- `GET  /api/v1/spiritual-heritage/audit/:claimId`: Execute 10-Question Provenance Audit.
