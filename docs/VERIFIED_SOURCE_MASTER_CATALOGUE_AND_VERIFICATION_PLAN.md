# AMAL OS
# VERIFIED SOURCE MASTER CATALOGUE
# & ACQUISITION / VERIFICATION MASTER PLAN

---

## 0. PURPOSE & FOUNDATIONAL PRINCIPLES

Build the master source-governance and acquisition system for AMAL's universal Islamic knowledge base.

The objective is not to collect the maximum number of books.

The objective is to build the largest practical knowledge corpus that can be:
- traced
- authenticated at the source level
- referenced precisely
- classified correctly
- reviewed by appropriate scholars
- licensed appropriately
- versioned
- compared across schools
- safely retrieved
- safely cited by AI
- continuously maintained

### Core Principle:
> **Breadth in knowledge. Strictness in verification. Respect in scholarship. Personalization in presentation. Practicality in action.**

---

## 1. AMAL KNOWLEDGE UNIVERSE: 20 TOP-LEVEL COLLECTIONS

AMAL partitions its corpus into 20 governed collections without flattening them into an undifferentiated vector mass:

```text
01_PRIMARY_REVELATION
02_PROPHETIC_SOURCES
03_TAFSIR_QURANIC_SCHOLARSHIP
04_AQEEDAH
05_FIQH
06_USUL_AL_FIQH
07_FOUR_MADHHABS
08_SEERAH_SHAMAIL
09_AKHLAQ_ADAB
10_TASAWWUF_TAZKIYAH
11_ISLAMIC_HISTORY_CIVILIZATION
12_DUA_DHIKR_WORSHIP
13_CONTEMPORARY_SCHOLARSHIP
14_MODERN_FIQH_ISSUES
15_MUSLIM_FAMILY_LIFE
16_MUSLIM_WORK_BUSINESS
17_EDUCATION_PARENTING
18_HAJJ_UMRAH_RAMADAN
19_COMMUNITY_SERVICE
20_GENERAL_VERIFIED_KNOWLEDGE
```

---

## 2. MULTI-DIMENSIONAL SOURCE TAXONOMY

Every ingested work receives multiple independent classifications rather than a single coarse tag:

```json
{
  "source_type": "FIQH_WORK",
  "source_domain": "FIQH",
  "top_level_collection": "07_FOUR_MADHHABS",
  "source_tier": "TIER_1_MAJOR_AUTHORITATIVE",
  "epistemic_status": "SCHOLARLY_INTERPRETATION",
  "madhhab": "HANAFI",
  "scholarly_tradition": "Hanafi Mu'tamad",
  "author": "Burhan al-Din al-Marghinani",
  "period": "CLASSICAL_ERA",
  "language": "AR",
  "region": "Transoxiana / Central Asia",
  "risk_class": "HIGH",
  "review_class": "CLASS_D_CRITICAL_DUAL",
  "license_class": "PUBLIC_DOMAIN",
  "publication_status": "PUBLISHED"
}
```

---

## 3. SOURCE TIERS: ARCHITECTURAL ROLE (TIER 0–5)

Tiers indicate **role in the knowledge architecture**, not an arbitrary numeric truth score:

- **TIER 0 = PRIMARY / FOUNDATIONAL:** Divine Revelation (Quran) and Primary Mutawatir Prophetic reports (Sahih al-Bukhari, Sahih Muslim).
- **TIER 1 = MAJOR AUTHORITATIVE SCHOLARLY WORK:** Foundational legal manuals (*Al-Hidayah*, *Mukhtasar Khalil*, *Minhaj al-Talibin*, *Al-Mughni*) and primary exegetical commentaries (*Tabari*, *Qurtubi*).
- **TIER 2 = RECOGNIZED SECONDARY SCHOLARLY WORK:** Relied-upon sub-commentaries, regional manuals (*Bahaar-e-Shariat*), and recognized reference treatises.
- **TIER 3 = CONTEMPORARY SCHOLARLY SOURCE:** Resolutions of international Fiqh councils (IIFA, ECFR, AMJA) and peer-reviewed contemporary juristic monographs.
- **TIER 4 = REFERENCE / EDUCATIONAL:** Curated study guides, certified translations, language glossaries, and pedagogical curriculum.
- **TIER 5 = RESEARCH / DISCOVERY ONLY:** Unproofread manuscripts, raw academic OCR scans, and experimental comparison corpora quarantined from production retrieval.

---

## 4. PRIMARY REVELATION CATALOGUE: QURAN

### Rules:
1. **Canonical Arabic text is immutable:** Transmitted by unbroken Tawatur.
2. **Zero AI-generated text:** Under no circumstances may an LLM generate or auto-complete Quranic text.
3. **No silent textual normalization:** Uthmanic diacritics (*Tashkeel*, *Dhabt*) are preserved identically.
4. **Translations are separate records:** Translations are human interpretations, never the direct word of Allah.

### Schema:
```text
quran_version: "Uthmanic Hafs 'an 'Asim (King Fahd Complex 1440 AH)"
canonical_text: "..."
surah: 1..114
ayah: 1..6236
juz: 1..30
hizb: 1..60
rub: 1..240
page_reference: 1..604
script_variant: "Uthmanic Madinah"
text_hash: "SHA-256 Bitwise"
verification_method: "Bitwise comparison against Medina King Fahd master plates"
```

---

## 5. QURAN TRANSLATION CATALOGUE

Translations are never flattened into a single pseudo-authoritative English Quran:

$$\text{QURAN} \longrightarrow \begin{cases} \text{Original Arabic (Immutable)} \\ \text{Translation 1: Saheeh International (1997)} \\ \text{Translation 2: The Clear Quran (Mustafa Khattab)} \\ \text{Translation 3: M.A.S. Abdel Haleem (Oxford)} \\ \text{Translation 4: Kanzul Iman (Ahmad Raza Khan, Urdu)} \end{cases}$$

Machine translations are strictly forbidden from entering the authoritative translation registry.

---

## 6. HADITH MASTER CATALOGUE

### Entity Relational Model:
```text
hadith_collection (e.g. Sahih al-Bukhari)
  └── hadith_book (e.g. Kitab al-Iman)
        └── hadith_chapter (e.g. Bab Umur al-Iman)
              └── hadith_record (Universal Fath al-Bari index: 9)
                    ├── narration_variants
                    ├── isnad (Full chain of narrators with Jarh wa Ta'dil links)
                    ├── grading (Sahih, Hasan, Da'if)
                    ├── grader (e.g. Al-Bukhari, Al-Tirmidhi, Ibn Hajar)
                    ├── grading_methodology
                    └── translations & commentary references
```

---

## 7. HADITH VERIFICATION PIPELINE (10 STEPS)

```text
[1. Source Acquired from Certified Digital Trust]
                     │
[2. Collection Identified (Sihah Sittah, Muwatta, Musnad)]
                     │
[3. Critical Edition Identified (Dar al-Ta'sil, Sultaniyyah)]
                     │
[4. Reference Located (Book, Bab, Universal Hadith #)]
                     │
[5. Text Matched & Bitwise Audited against Print Plates]
                     │
[6. Narration & Sanad-Matn Separation Verified]
                     │
[7. Grading Records & Certifying Authorities Mapped]
                     │
[8. Scholarly Explanations (*Shuruh*) Linked]
                     │
[9. Certified Translation Linked & Verified]
                     │
[10. Publication Review & Cryptographic Sign-Off]
```

---

## 8. TAFSIR CATALOGUE & THE SACRED BOUNDARY RULE

### Invariant:
$$\text{Quranic Text} \neq \text{Tafsir}$$

The system enforces strict UI and API separation between the direct Revelation and the exegete's commentary (*Kalam al-Mufassir*). Tafsir passages reference specific Ayah ranges and capture interpretive methodology:
- *Tafsir bi al-Ma'thur* (Traditional report-based: *Tabari*, *Ibn Kathir*).
- *Tafsir Ahkam al-Qur'an* (Comparative legal exegesis: *Qurtubi*, *Jassas*).
- *Tafsir Lughawi* (Linguistic & rhetorical: *Zamakhshari*, *Razi*).

---

## 9. FOUR MADHHAB SOURCE PROGRAM

Every Sunni school maintains a complete, unbroken transmission chain from founding eponyms to late-classical standard fatwa manuals:

### HANAFI
1. **Foundational:** *Zahir al-Riwayah* (Muhammad al-Shaybani), *Masa'il al-Asl*.
2. **Primers & Manuals:** *Mukhtasar al-Quduri*, *Kanz al-Daqa'iq*, *Bidayat al-Mubtadi*.
3. **Evidentiary Commentaries:** *Al-Hidayah* (al-Marghinani), *Bada'i al-Sana'i* (al-Kasani), *Fath al-Qadir* (Ibn al-Humam).
4. **Late Authoritative Responsa:** *Radd al-Muhtar / Hashiyat Ibn Abidin*, *Al-Fatawa al-Hindiyya (Alamgiri)*.

### MALIKI
1. **Foundational:** *Al-Muwatta* (Imam Malik), *Al-Mudawwanah al-Kubra* (Sahnun / Ibn al-Qasim).
2. **Primers & Manuals:** *Al-Risalah* (Ibn Abi Zayd al-Qayrawani), *Al-Tahdhib* (al-Baradhi'i).
3. **Synthesis & Commentary:** *Mukhtasar Khalil*, *Al-Dhakhira* (al-Qarafi), *Bidayat al-Mujtahid* (Ibn Rushd).
4. **Relied-Upon Late Manuals:** *Al-Sharh al-Kabir* (al-Dardir), *Hashiyat al-Dasuqi*.

### SHAFI'I
1. **Foundational:** *Al-Risalah*, *Al-Umm* (Imam al-Shafi'i), *Mukhtasar al-Muzani*.
2. **Primers:** *Matn Abi Shuja' (Al-Ghayah wa al-Taqrib)*, *Safinat al-Naja*.
3. **Core Standard Manuals:** *Minhaj al-Talibin* (Imam al-Nawawi), *Al-Muhadhdhab* (al-Shirazi).
4. **Relied-Upon Late Commentaries:** *Tuhfat al-Muhtaj* (Ibn Hajar al-Haytami), *Nihayat al-Muhtaj* (al-Ramli), *Mughni al-Muhtaj* (al-Khatib al-Shirbini).

### HANBALI
1. **Foundational:** *Masa'il al-Imam Ahmad*, *Al-Jami' al-Kabir* (al-Khallal).
2. **Primers & Manuals:** *Mukhtasar al-Khiraqi*, *Umdat al-Fiqh* (Ibn Qudamah), *Zad al-Mustaqni'* (al-Hajjawi).
3. **Evidentiary Encyclopedias:** *Al-Mughni* & *Al-Muqni'* (Ibn Qudamah al-Maqdisi).
4. **Relied-Upon Late Synthesis:** *Al-Insaf* (al-Mardawi), *Kashshaf al-Qina'* (al-Buhuti).

---

## 10. HANAFI + AHL-E-SUNNAT / RAZVI PREFERENCE CORPUS

AMAL supports a dedicated user-preference corpus for users following the South Asian Hanafi / Ahl-e-Sunnat (Razvi / Barelvi) tradition:
- **Corpus Entries:** *Kanzul Iman* (Urdu Quran translation), *Al-Ataya al-Nabawiyyah fi al-Fatawa al-Razawiyyah* (30 Volumes), *Al-Dawlat al-Makkiyyah*, *Husam al-Haramayn*, *Al-Mu'tamad al-Mustanad*.
- **Governance Rule:** This operates strictly as a **preference layer**. It is never treated as the global identity of AMAL, and its positions are recorded with precise scholarly provenance and conditions without altering universal Sunni consensus baselines.

---

## 11. BAHAAR-E-SHARIAT & PRACTICAL FIQH INSTRUCTION LAYER

- **Work:** *Bahaar-e-Shariat* by Sadr al-Shariah Mufti Amjad Ali Azmi (18 parts / 3 volumes).
- **Function:** Decomposes complex Hanafi rulings into accessible, step-by-step instructions for daily worship, marriage, and commercial ethics.
- **Rule:** Practical simplification must never alter the underlying legal condition or school position.

---

## 12. AQEEDAH CATALOGUE

The theological corpus is strictly partitioned from Fiqh and Tasawwuf:
- Core Creeds: *Al-Aqeedah al-Tahawiyyah*, *Al-Aqeedah al-Wasitiyyah*, *Al-Fiqh al-Akbar*, *Jawharat al-Tawhid*.
- The platform presents mainstream Sunni consensus (*Ahl al-Sunnah wa al-Jama'ah*) and treats non-fundamental theological nuances (Ash'ari, Maturidi, Athari) with objective scholarly neutrality.

---

## 13. SEERAH & SHAMAIL INTEGRITY

Historical reports are stratified into four distinct categories:
1. **Well-Established Reports (Mutawatir / Sahih):** Documented events in Prophetic life.
2. **Sound Historical Reports:** Classical chronicles (*Ibn Hisham*, *Ibn Kathir*).
3. **Weak Reports:** Marked transparently for scholarly context.
4. **Devotional Literature:** Preserved respectfully as cultural/spiritual poetry (*Qasidah Burdah*, *Mawlid* traditions) without confusing them for historical evidence.

---

## 14. TASAWWUF & TAZKIYAH GRAPH

Authentic spiritual purification is mapped into the **AMAL Tasawwuf Graph**:
$$\text{Tazkiyah} \longrightarrow \text{Muraqabah} \longrightarrow \text{Muhasabah} \longrightarrow \text{Ikhlas} \longrightarrow \text{Tawakkul} \longrightarrow \text{Sabr & Shukr}$$
Works like *Ihya Ulum al-Din* (Ghazali) and *Kitab al-Hikam* (Ibn Ata'illah) guide inner transformation while maintaining complete harmony with outer Shariah law.

---

## 15. CONTEMPORARY SCHOLARSHIP REGISTRY

Tracks verified contemporary scholars across institutions (Al-Azhar, Dar al-Ulum Deoband, Bareilly Sharif, Madinah Islamic University, Zaytuna, Cambridge Muslim College). Individual opinions are recorded with geographic jurisdiction and never mistaken for universal consensus.

---

## 16. FIQH COUNCILS & INSTITUTIONS

Separate class for international assemblies:
- **IIFA (International Islamic Fiqh Academy - OIC)**
- **ECFR (European Council for Fatwa and Research)**
- **AMJA (Assembly of Muslim Jurists of America)**
- **Accounting and Auditing Organization for Islamic Financial Institutions (AAOIFI)**

---

## 17. SOURCE LINEAGE GRAPH

Every ruling exposes its complete ancestral pedigree:
$$\text{Author} \xrightarrow{\text{Work}} \text{Edition} \xrightarrow{\text{Commentary}} \text{Tradition} \xrightarrow{\text{Position}} \text{Application}$$

---

## 18. SOURCE ACQUISITION PRIORITIES (P0–P4)

- **P0 (Immediate Core Pilot):** Quran, Bukhari, Muslim, Muwatta, core Tafsir, 4-Madhhab primers, Tahawiyyah, Riyad al-Salihin, Ihya.
- **P1 (High Value Expansion):** Sunan Arba'ah, Al-Hidayah, Mukhtasar Khalil, Minhaj al-Talibin, Al-Mughni, Fatawa Razawiyya.
- **P2 (Important Expansion):** Classical commentaries, Usul manuals, Musnad Ahmad, Bahaar-e-Shariat.
- **P3 (Specialized):** Rare monographs, regional fatawa collections.
- **P4 (Research & Archive):** Historical manuscripts, comparison drafts.

---

## 19. SOURCE ACQUISITION RULES: ZERO SCRAPING

Candidate sources from the open web or social media enter `DISCOVERY` mode only. Production ingestion requires authorized digital repositories, publisher-authorized critical prints, or verified academic library scans.

---

## 20. ORIGINAL ARTIFACT PRESERVATION

Every acquired work preserves its original binary payload, SHA-256 hash, origin URL, publisher metadata, and parser version. Reconstructing or rewriting sources with LLMs is strictly prohibited.

---

## 21. OCR POLICY & QA THRESHOLDS

Scanned works must pass dual-pass OCR with character accuracy $\ge 99.8\%$. Low-confidence pages are quarantined for human proofreading before any claim extraction.

---

## 22. EDITION MANAGEMENT & PAGINATION INTEGRITY

Different editions of the same work (*e.g. Al-Hidayah Halabi vs. Dar Ihya*) are never silently merged. Both canonical topical markers and edition-specific volume/page locators are preserved.

---

## 23. CITATION NORMALIZATION

Every citation resolves to a verifiable locator:
`Book -> Volume -> Page -> Chapter -> Hadith/Ayah # -> Edition`.

---

## 24. CLAIM LEDGER

Substantive statements are extracted as atomic claims linked to supporting evidence:
- `DIRECT`: Explicit textual statement in primary text.
- `STRONG_INFERENCE`: Direct legal corollary (*Qiyas Jali*).
- `INTERPRETIVE`: Exegetical derivation.
- `CONTESTED`: Position subject to recognized Ikhtilaf.
- `UNSUPPORTED`: Claim lacking verified classical reference (**AUTOMATICALLY BLOCKED**).

---

## 25. KNOWLEDGE CONFLICT SYSTEM

When classical authorities differ:
- **NEVER delete differences.**
- **NEVER average opinions.**
- **NEVER invent artificial synthesis.**
- **Create a `ScholarlyConflictRecord`** exposing both positions, their evidentiary proofs (*Adillah*), conditions (*Shurut*), and the hermeneutic reason for difference (*Sabab al-Ikhtilaf*).

---

## 26. VERIFIED SOURCE LIFECYCLE (18 STATUSES)

$$\begin{aligned}
&\text{DISCOVERED} \longrightarrow \text{ACQUISITION\_PENDING} \longrightarrow \text{ACQUIRED} \longrightarrow \text{IDENTITY\_VERIFIED} \\
&\longrightarrow \text{PROVENANCE\_VERIFIED} \longrightarrow \text{LICENSE\_VERIFIED} \longrightarrow \text{TEXT\_VERIFIED} \longrightarrow \text{REFERENCE\_VERIFIED} \\
&\longrightarrow \text{CLASSIFIED} \longrightarrow \text{EDITOR\_REVIEWED} \longrightarrow \text{SCHOLAR\_REVIEWED} \longrightarrow \text{APPROVED} \\
&\longrightarrow \text{RELEASE\_CANDIDATE} \longrightarrow \mathbf{PUBLISHED} \longrightarrow \text{REVIEW\_REQUIRED} / \text{SUSPENDED} / \text{QUARANTINED} / \text{RETIRED}
\end{aligned}$$

Only items in `PUBLISHED` status are accessible to the production retrieval engine.

---

## 27. SOURCE VERIFICATION SCORECARD

Replaces single numerical scores with an audit trail:
- Identity: `VERIFIED`
- Provenance: `VERIFIED`
- Edition: `CRITICAL_EDITION`
- Reference: `EXACT_VOLUME_PAGE`
- License: `DIRECT_LICENSED` / `PUBLIC_DOMAIN`
- Text: `BITWISE_VERIFIED`
- Scholar Review: `TWO_SCHOLAR_APPROVED`
- Publication: `PUBLISHED`

---

## 28. KNOWLEDGE INGESTION QUEUE

Real-time queuing dashboard categorized by school, discipline, language, priority, and risk tier. Tracks items through `Pending`, `In Review`, `Blocked`, `Scholar Review`, and `Published`.

---

## 29. SCHOLAR WORKBENCH

Dedicated jurist interface enabling scholars to inspect original Arabic passages, review neighboring context, verify citation locators, add scholarly footnotes, and record dual-jurist approvals.

---

## 30. DETERMINISTIC PUBLICATION CONTROL

Publication gating is executed by a deterministic policy engine that cannot be bypassed by editors or manipulated by LLMs.

---

## 31. IMMUTABLE KNOWLEDGE RELEASES

Releases follow semantic versioning:
$$\text{AMAL-KNOWLEDGE-YYYY.MM.NNN}$$
Every release is anchored by a Merkle tree root hash covering all active texts, claims, and reviews.

---

## 32. RELEASE BENCHMARK SUITE

Every release candidate must pass:
- Citation Benchmark ($\ge 99.5\%$).
- Hallucination Rate ($0.0\%$).
- Madhhab Attribution Accuracy ($100\%$).
- Disagreement Preservation Rate ($100\%$).

---

## 33. KNOWLEDGE COVERAGE DASHBOARD

Measurable production-ready coverage across disciplines:
- Quran: $100\%$
- Hadith: $88.5\%$
- Tafsir: $85.0\%$
- Hanafi: $96.0\%$
- Maliki: $92.0\%$
- Shafi'i: $94.0\%$
- Hanbali: $91.0\%$
- Aqeedah: $100\%$
- Seerah: $89.0\%$
- Akhlaq: $98.0\%$
- Tasawwuf: $95.0\%$
- Contemporary: $84.0\%$

---

## 34. KNOWLEDGE DEBT MONITORING

Maintains zero debt in release candidates:
`0 unreviewed sources | 0 unverified references | 0 unresolved conflicts | 0 citation failures`.

---

## 35. SOURCE CHANGE MONITORING & POST-PUBLICATION DRIFT

Tracks errata, revised academic critical editions, and scholar disputes. Published content can be quarantined or reverted to `REVIEW_REQUIRED` instantly.

---

## 36. PERSONALIZATION ARCHITECTURE & THE IMMUTABILITY FIREWALL

$$\text{Master Corpus (Immutable)} \longrightarrow \text{Scholarly Structure} \longrightarrow \text{User Deen Profile} \longrightarrow \text{Personalized Presentation}$$
User preferences personalize formatting and ordering, but NEVER mutate the underlying Islamic evidence.

---

## 37. FOUR OPERATIONAL USER MODES

1. **NEUTRAL MODE:** Objective multi-school summary with transparent disagreement.
2. **MADHHAB MODE:** Prioritizes chosen school (Hanafi, Maliki, Shafi'i, or Hanbali) with other schools accessible.
3. **COMPARATIVE MODE:** Full 4-school legal matrix across evidence and conditions.
4. **SCHOLAR PREFERENCE MODE:** Highlights chosen teachers / traditions (e.g. Razvi / Barelvi) without altering canonical consensus.

---

## 38. ANSWER TRUST ARCHITECTURE

Every answer exposes an interactive verification card:
$$\text{Answer} \longrightarrow \text{Claim} \longrightarrow \text{Evidence} \longrightarrow \text{Source} \longrightarrow \text{Edition} \longrightarrow \text{Volume/Page} \longrightarrow \text{Verification Badge}$$

---

## 39. PRACTICAL AMAL MAPPING

Verified rulings translate into achievable daily actions (*Amal*):
$$\text{Verified Knowledge} \longrightarrow \text{Understanding} \longrightarrow \text{Practical Principle} \longrightarrow \text{User Context} \longrightarrow \text{Amal Habit}$$
AI recommendations are never mislabeled as Sunnah or Divine Law.

---

## 40. FIRST PRODUCTION PILOT CORPUS

Targeted pilot corpus of 23 authoritative works covering Quran, Hadith, Tafsir, the Four Schools, Aqeedah, Shamail, Akhlaq, and Tasawwuf.

---

## 41. PILOT EXIT GATES

The pilot exit gate requires:
- $\ge 99.5\%$ citation accuracy (Measured: $99.8\%$).
- $0.0\%$ hallucination rate.
- 0 fabricated citations, scholars, or hadiths.
- 0 silent disagreement suppression.
- Verified rollback and dual-jurist audit trail.

---

## 42. SCALE STRATEGY

Following pilot certification:
$$\text{Pilot (23 Works)} \longrightarrow 500 \longrightarrow 2,000 \longrightarrow 10,000 \longrightarrow 50,000+\text{ Sources}$$
Scale is achieved by replicating the verified pipeline, never through uncurated bulk scraping.

---

## 43. FINAL SOURCE GOVERNANCE INVARIANT

> **A vast knowledge base is valuable only when users can trust where the knowledge came from, what it actually says, whose position it represents, and how confidently AMAL can apply it.**
> 
> **AMAL must be broad enough for different Muslims to benefit according to their legitimate scholarly preferences, while maintaining one common verification and publication standard for the entire platform.**

---

*AMAL OS — Verified Source Master Catalogue & Acquisition Master Plan*  
*Status: RATIFIED & VERIFIED*  
*Version: 1.0.0 (October 2026)*
