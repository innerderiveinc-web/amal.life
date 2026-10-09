# AMAL OS
# UNIVERSAL MULTILINGUAL ISLAMIC KNOWLEDGE ENGINE
## Master Build & Governance Specification — India + Global

---

## 0. MISSION & NON-NEGOTIABLE PRINCIPLE

The mission of the **Universal Multilingual Islamic Knowledge Engine** is to provide Muslims worldwide with a secure, authentic, evidence-governed Islamic knowledge repository and retrieval system across **10 India-first priority languages** and **9 global languages**.

### Core Invariant
$$\text{QURAN} \neq \text{TRANSLATION} \neq \text{TAFSIR} \neq \text{HADITH} \neq \text{FIQH} \neq \text{SCHOLARLY INTERPRETATION} \neq \text{AMAL RECOMMENDATION}$$

Every level of Islamic epistemological transmission is strictly decoupled:
1. **Sacred Arabic Text of the Holy Qur'an**: Immutable, uncreated word of Allah Almighty, preserved in authentic Uthmanic orthography through continuous mass-transmission (*Tawatur*).
2. **Human Translations (*Tarjamah*)**: Human semantic approximation of the meanings of the revelation. Never revelation itself; subject to linguistic variance and translator framing.
3. **Exegesis (*Tafsir*)**: Methodological explanations, legal extractions (*istinbat*), grammatical analysis (*nahw/sarf*), and contextual revelation circumstances (*asbab al-nuzul*).
4. **Prophetic Hadith & Sunnah**: Sayings, actions, and approvals of the Messenger of Allah ﷺ, graded deterministically through rigorous Isnad chains.
5. **Fiqh & Madhhab Positions**: Codified legal rulings from the four Sunni schools (*Hanafi, Maliki, Shafi'i, Hanbali*) and authoritative jurisprudential texts.
6. **Scholarly Interpretation**: Contemporary applications and contextualized fatwas.
7. **AMAL Practical Recommendations**: Personalized habit routines and behavioral suggestions derived for user benefit.

---

## 1. EPISTEMIC TAXONOMY & RIGID SEPARATION

The engine categorizes every node into distinct epistemic domains (`UniversalEpistemicDomain`):
- `ISLAMIC_PRIMARY_SOURCE`: Sacred Quranic Ayahs and Mutawatir Prophetic Sunnah.
- `TRANSLATION_WORK`: Human renderings of the meanings of Quranic or Hadith passages.
- `TAFSIR_WORK`: Exegetical commentaries categorized by hermeneutic methodology (`BI_AL_MATHUR`, `BI_AL_RAY`, `FIQHI`, `LUGAWI`, `ISHARI`).
- `HADITH_CANON`: Classical canonical collections (*Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami' al-Tirmidhi, Sunan al-Nasa'i, Sunan Ibn Majah, Muwatta Malik, Musnad Ahmad*).
- `HADITH_SHARH`: Classical and post-classical Hadith commentaries (*Fath al-Bari, Sharh Sahih Muslim, Mirqat al-Mafatih*).
- `COMPARATIVE_FIQH`: Structured comparative rulings across the four Sunni madhhabs.
- `SCHOLARLY_TRADITION_CORPUS`: Specialized reference corpuses (e.g., Ahl-e-Sunnat / Razvi corpus: *Kanzul Iman, Fatawa Razawiyya, Bahaar-e-Shariat*).
- `CONTEMPORARY_FATWA`: Modern jurisprudence council resolutions and vetted scholar determinations.

---

## 2. EPISTEMIC FIREWALL & ANTI-CORRUPTION LAYER

The system enforces a non-negotiable runtime firewall:
1. **No Translation Presented as Quran**: An error is thrown immediately if a translation text is marked as primary Quranic revelation.
2. **AI Translation Generation Blocked**: AI agents and LLMs are strictly prohibited from generating on-the-fly translations and presenting them as verified texts (`AI_GENERATED_TRANSLATION_PROHIBITED`).
3. **Verified Translation Unavailable Defense**: If a translation or tafsir is missing in a specific language (e.g., Telugu or French for a particular verse), the engine outputs `"Verified translation unavailable"` or `"Verified tafsir unavailable"`. It never fabricates content.
4. **Attribution Integrity**: Every translation and tafsir must carry explicit author, translator, edition, and publisher attribution.

---

## 3. COMPREHENSIVE LANGUAGE MODEL & REGISTRY (India-First + Global)

The engine seeds and manages 19 primary languages:

### India-First Languages (Priority 1 & 2)
1. **Urdu (`ur`)**: Nastaliq / Perso-Arabic script, RTL direction, South Asian Islamic scholarly lingua franca.
2. **Hindi (`hi`)**: Devanagari script, LTR direction, Northern & Central India.
3. **Bengali (`bn`)**: Bengali-Assamese script, LTR direction, Eastern India & Bangladesh.
4. **Gujarati (`gu`)**: Gujarati script, LTR direction, Western India & diaspora.
5. **Marathi (`mr`)**: Devanagari script, LTR direction, Maharashtra.
6. **Malayalam (`ml`)**: Malayalam script, LTR direction, Kerala & Gulf diaspora.
7. **Tamil (`ta`)**: Tamil script, LTR direction, Tamil Nadu, Sri Lanka & Southeast Asia.
8. **Telugu (`te`)**: Telugu script, LTR direction, Andhra Pradesh, Telangana & Deccan.
9. **Kannada (`kn`)**: Kannada script, LTR direction, Karnataka.
10. **Punjabi (`pa`)**: Shahmukhi / Gurmukhi scripts, BIDI direction, Punjab.

### Global Priority Languages
11. **Arabic (`ar`)**: Sacred Uthmanic / Arabic script, RTL direction, Global core.
12. **English (`en`)**: Latin script, LTR direction, Global international.
13. **Persian (`fa`)**: Perso-Arabic script, RTL direction, Iran & Central Asia.
14. **Turkish (`tr`)**: Latin script, LTR direction, Turkey & Balkans.
15. **Indonesian (`id`)**: Latin script, LTR direction, Southeast Asia.
16. **Malay (`ms`)**: Latin / Jawi scripts, LTR direction, Malaysia & Brunei.
17. **French (`fr`)**: Latin script, LTR direction, Francophone Africa & Europe.
18. **Spanish (`es`)**: Latin script, LTR direction, Spain & Latin America.
19. **German (`de`)**: Latin script, LTR direction, Central Europe.

---

## 4. SCRIPT, DIRECTIONALITY, TYPOGRAPHY & RENDERING

1. **RTL / LTR / BIDI Bi-Directional Isolation**: Bi-directional text isolates (`dir="rtl"` / `dir="ltr"` and Unicode isolation markers `U+2066` / `U+2069`) prevent Arabic text mixing and alignment corruption when embedded in English, Hindi, or Bengali prose.
2. **Sacred Uthmanic Typography**: King Fahd Complex font family (`KFGQPC Uthmanic Script HAFS`) rendered with high ligatures and explicit ayah stop marks (`۝`).
3. **Nastaliq Typography**: High-resolution Urdu Nastaliq font stacks (`Jameel Noori Nastaleeq`, `Noto Nastaliq Urdu`) with dynamic line-height calculation to prevent vertical overlap.

---

## 5. CANONICAL QURAN MASTER MODEL (Sacred Uthmanic Arabic)

- **114 Surahs**: Fully indexed with Surah Number, Arabic Name, English Meaning, Transliteration, Revelation Classification (`MECCAN` / `MEDINAN`), Total Ayahs, and Juz start position.
- **6,236 Ayahs**: Canonical key format `${surahNumber}:${ayahNumber}` (e.g. `1:1`, `2:255`, `17:78`).
- **Global Ayah Numbering**: Unified sequential index (1 to 6236).
- **Page & Juz Positioning**: Complete mapping to standard Medina Mushaf 604 pages and 30 Juz.

---

## 6. QURAN EDITION CONTROL & SACRED TEXT INTEGRITY

- **Consensus Standard**: Standard Medina Complex text (`ED_UTHMANI_MEDINA`) validated against the Uthmanic Tawatur consensus.
- **Two-Scholar Approval**: Every master Quran text edition requires independent verification by two certified Huffaz/Qurra before inclusion in production releases.
- **Cryptographic Hash Immutability**: Each edition stores a SHA-256 fingerprint of the complete sacred text. Any bit flip or unauthorized vowel modification halts the engine instantly.

---

## 7. TRANSLATION MODEL & SEMANTIC TAXONOMY

Translations are classified by hermeneutic methodology:
- `LITERAL`: Word-for-word rendering preserving syntactic order.
- `MEANING_ORIENTED`: Fluent rendering of semantic intent.
- `EXPLANATORY`: Translation embedding brief clarifying parentheticals (e.g., *Kanzul Iman*).
- `THEMATIC`: Topical paraphrase (restricted and strictly tagged as non-literal).

---

## 8. TRANSLATION REPOSITORY & WORK REGISTRATION

Vetted and registered translation works:
1. **Kanzul Iman fi Tarjamat al-Qur'an**:
   - Translator: Ala Hazrat Imam Ahmad Raza Khan Barelvi (1856–1921 CE).
   - Languages: Urdu (`ur`), Hindi (`hi`), English (`en`), Bengali (`bn`), Gujarati (`gu`).
   - Methodology: `EXPLANATORY`.
   - Tradition: Ahl-e-Sunnat / Razvi.
2. **Saheeh International**:
   - Translator: Saheeh International (Aminah Assami, Amatullah Bantley, Mary Kennedy).
   - Language: English (`en`).
   - Methodology: `MEANING_ORIENTED`.
3. **Bayan al-Quran**:
   - Translator: Mawlana Ashraf Ali Thanwi.
   - Language: Urdu (`ur`).
4. **Tafheem-ul-Quran (Translation)**:
   - Translator: Mawlana Abul A'la Maududi.
   - Language: Urdu (`ur`), English (`en`).
5. **The Clear Quran**:
   - Translator: Dr. Mustafa Khattab.
   - Language: English (`en`).

---

## 9. TRANSLATION EDITION CONTROL & PHYSICAL FACSIMILES

- Every registered translation links to an immutable physical artifact (`source_artifact_id`).
- Publishers, edition print years, critical edition notes, and license IDs are permanently bound.
- Checksums guarantee zero textual drift across releases.

---

## 10. TRANSLATION PASSAGES & SURAH/AYAH ALIGNMENT

- Passage records map 1:1 or 1:Many to canonical Ayah keys (`ayah_canonical_key`).
- Alignment confidence is verified deterministically (`alignment_confidence: 1.0`).
- Multi-verse spans (e.g., Ayahs 2:6-7 translated together) retain explicit link references to all constituent Ayahs without duplicating text.

---

## 11. INDEPENDENT TAFSIR DOMAIN & WORK REGISTRATION

Tafsir commentaries are housed in independent database tables and data structures separate from translation passages:
- **Khaza'in al-Irfan fi Tafsir al-Qur'an**: Sadr al-Afadil Mawlana Na'im al-Din Muradabadi (Urdu, Ahl-e-Sunnat / Razvi, Fiqhi/Kalam).
- **Nur al-Irfan**: Mufti Ahmad Yar Khan Naeemi (Urdu, Ahl-e-Sunnat / Razvi, Practical/Fiqhi).
- **Tafsir al-Jalalayn**: Jalal al-Din al-Mahalli & Jalal al-Din al-Suyuti (Arabic, Classical Shafi'i/Lughawi).
- **Tafsir Ibn Kathir (*Tafsir al-Qur'an al-Azim*)**: Al-Hafiz Ibn Kathir (Arabic / Urdu / English, Bi al-Ma'thur).
- **Al-Tafsir al-Kabir (*Mafatih al-Ghayb*)**: Imam Fakhr al-Din al-Razi (Arabic, Kalam/Theology/Fiqh).
- **Al-Jami' li-Ahkam al-Qur'an**: Imam al-Qurtubi (Arabic, Maliki Fiqh exegesis).

---

## 12. TAFSIR METHODOLOGY & HERMENEUTIC CLASSIFICATION

Every passage is tagged with its dominant hermeneutic mode:
- `BI_AL_MATHUR`: Exegesis through Quran, Sunnah, and Athar of the Sahaba.
- `BI_AL_RAY`: Exegesis through sound Arabic linguistic reasoning and juristic deduction.
- `FIQHI`: Legal verse exegesis detailing Madhhab positions and rulings.
- `LUGAWI`: Grammatical, rhetorical, and linguistic analysis.
- `ISHARI`: Spiritual and allegorical tadabbur within orthodox Sunni bounds.

---

## 13. TAFSIR PASSAGE REPOSITORY & SURAH/AYAH MAPPING

Tafsir commentary passages store:
- Canonical verse key reference.
- Original text in source language.
- Author scholarly background and theological affiliation.
- Verification status and scholar reviewer IDs.

---

## 14. HADITH MULTILINGUAL CORPUS & AUTHENTICITY HIERARCHY

Hadiths are indexed under canonical collections and evaluated using classical Muhaddithin standards:
- `SAHIH`: Rigorously authenticated with unbroken isnad of upright, reliable narrators.
- `HASAN`: Sound chain acceptable for Islamic legal practice.
- `DA'IF`: Weak chain (acceptable only for virtuous deeds *Fada'il al-A'mal* under classical conditions; strictly barred for Ahkam or Aqeedah determinations).
- `MAWDU'`: Fabricated (blocked completely from production guidance).

---

## 15. HADITH MATN, SANAD & TRANSLATION MODEL

- **Matn**: Original Arabic wording preserved with exact tashkeel.
- **Sanad**: Full chain of narrators recorded with biographical evaluation of each transmitter (*Rijal al-Hadith*).
- **Multilingual Translations**: Vetted translations across English, Urdu, Hindi, Bengali with translator credentials.

---

## 16. HADITH COMMENTARIES & SHURUH DOMAIN

Classical Hadith commentaries are indexed to prevent out-of-context lay extraction:
- *Fath al-Bari* by Ibn Hajar al-Asqalani (Sahih al-Bukhari).
- *Al-Minhaj Sharh Sahih Muslim* by Imam al-Nawawi (Sahih Muslim).
- *Mirqat al-Mafatih Sharh Mishkat al-Masabih* by Mulla Ali al-Qari (Mishkat).

---

## 17. COMPARATIVE SUNNI FIQH & FOUR MADHHAB TRACKS

The engine guarantees complete parity across the four canonical Sunni schools of law:
1. **Hanafi School**: Founded on Imam Abu Hanifah, Abu Yusuf, Muhammad al-Shaybani; primary texts *Al-Hidayah*, *Radd al-Muhtar*, *Al-Bahr al-Ra'iq*.
2. **Maliki School**: Founded on Imam Malik ibn Anas; primary texts *Al-Muwatta*, *Al-Mudawwanah*, *Mukhtasar Khalil*.
3. **Shafi'i School**: Founded on Imam Muhammad ibn Idris al-Shafi'i; primary texts *Al-Umm*, *Al-Majmu'*, *Minhaj al-Talibin*.
4. **Hanbali School**: Founded on Imam Ahmad ibn Hanbal; primary texts *Al-Mughni*, *Al-Muqni'*, *Zad al-Mustaqni'*.

**Rule of Parity**: No single madhhab ruling is universalized as "Islam says." Differences in Istinbat (legal derivation) are preserved and attributed explicitly.

---

## 18. AHL-E-SUNNAT / RAZVI PREFERENCE CORPUS INTEGRATION

The platform provides dedicated, first-class support for the South Asian Hanafi Sufi/Barelvi/Razvi scholarly tradition without compromising universal Sunni neutrality:
- **Foundational Works**:
  - *Kanzul Iman fi Tarjamat al-Qur'an* (Ala Hazrat Imam Ahmad Raza Khan).
  - *Khaza'in al-Irfan* (Sadr al-Afadil Mawlana Na'im al-Din Muradabadi).
  - *Nur al-Irfan* (Mufti Ahmad Yar Khan Naeemi).
  - *Fatawa Razawiyya* (30-volume monumental juristic encyclopedia).
  - *Bahaar-e-Shariat* (Allama Amjad Ali Azmi, 18-part Hanafi handbook).
- **Behavior**: When a user selects `AHL_E_SUNNAT_RAZVI` preference, answers elevate these positions as primary while retaining the other three Sunni schools in comparative view.

---

## 19. AQEEDAH, SEERAH & TASAWWUF/TAZKIYAH MULTILINGUAL DOMAIN

- **Aqeedah**: Orthodox Sunni creeds (*Aqeedah al-Tahawiyyah*, *Al-Aqeedah al-Sanusiyyah*, *Al-Fiqh al-Akbar*).
- **Seerah & Shamail**: Prophetic biography (*Al-Shifa bi-Ta'rif Huquq al-Mustafa* by Qadi Iyad, *Al-Sirah al-Nabawiyyah* by Ibn Hisham, *Shamail al-Tirmidhi*).
- **Tasawwuf & Tazkiyah**: Spiritual ethics (*Ihya Ulum al-Din* by Imam al-Ghazali, *Al-Risalah al-Qushayriyyah*, *Mathnawi Ma'nawi* by Jalal al-Din Rumi).

---

## 20. CANONICAL MULTILINGUAL CONCEPT MAPPING (Cross-Language Ontologies)

The engine normalizes Islamic concepts into canonical identifiers:
- `CONCEPT_SALAH`: Mapped across Urdu (`نماز`), Hindi (`नमाज़`), Bengali (`নামাজ`), Gujarati (`નમાઝ`), Marathi (`नमाज`), Persian (`نماز`), Turkish (`Namaz`), English (`Ritual Prayer`), Arabic (`الصلاة`).
- `CONCEPT_FASTING_TRAVEL`: Mapped across Urdu (`سفر میں روزہ`), Hindi (`सफ़ر में रोज़ा`), English (`Fasting during travel`).
- Transliterations and script variants resolve deterministically to the same evidence graph nodes.

---

## 21. CITATION ENGINE & CANONICAL SCHOLARLY IDENTIFIERS

- Uniform URI scheme: `amal://quran/17/78`, `amal://hadith/bukhari/568`, `amal://fiqh/hanafi/hidayah/1/66`.
- Resolves to verified source cards with complete metadata, manuscript provenance, and volume/page references.

---

## 22. MULTI-LAYER USER PREFERENCES ENGINE (Decoupled Language & Madhhab)

User preferences decouple language from theology:
- `interfaceLanguage`: Language of buttons, menus, and UI controls.
- `contentLanguage`: Language for Islamic explanations and translations.
- `madhhabPreference`: Jurisprudential school (`HANAFI`, `MALIKI`, `SHAFI_I`, `HANBALI`, `GENERAL_SUNNI`).
- `scholarlyTraditionPreference`: Vetted scholarly lineage (`AHL_E_SUNNAT_RAZVI`, `CLASSICAL_ASHARI_MATURIDI`, `TASAWWUF_TAZKIYAH`, `CONTEMPORARY_FIQH_ACADEMIES`).
- `showComparativeFiqh`: Boolean toggle to view all four schools.

---

## 23. GOVERNED ANSWER GENERATION & PRESENTATION MODES

1. **Neutral Sunni Mode**: Presents evidence neutrally across all four schools without promoting one as default.
2. **Preferred Mode**: Elevates the user's selected Madhhab / tradition while transparently presenting other recognized views.

---

## 24. STRICT AI RESPONSE CONTRACT & CITATION FIREWALL

Every AI-rendered answer must adhere to `MasterAIResponseContract`:
- `language`: Target answer language.
- `primary_evidence`: Original Quranic Ayahs with verified Arabic text.
- `translations`: Attributed translations; never AI-authored.
- `tafsir`: Attributed classical or contemporary exegesis.
- `scholarly_positions`: Four Madhhab positions with conditions and classical references.
- `citation_status`: Must be `VERIFIED`.

---

## 25. MULTILINGUAL SEARCH & SEMANTIC RETRIEVAL ENGINE

- Combined keyword, phonetic transliteration, and semantic vector embeddings across Indian and global scripts.
- Multi-script tokenization for Devanagari, Bengali, and Perso-Arabic scripts.

---

## 26. SCHOLARLY REVIEW PIPELINE & TIERED APPROVAL

1. **Tier 1 (Automated Lint & Schema Validation)**: Reference verification and provenance integrity.
2. **Tier 2 (Qualified Research Auditor Review)**: Academic source check.
3. **Tier 3 (Certified Jurist / Mufti Approval)**: Substantive legal review.

---

## 27. TWO-SCHOLAR MANDATE FOR HIGH-RISK THEOLOGICAL / LEGAL TOPICS

High-risk domains (marital breakdown, commercial finance contracts, medical bioethics, theological excommunication disputes) require mandatory sign-off by **two independent certified jurists** before publication.

---

## 28. DISPUTE & DIVERGENCE PRESERVATION ARCHITECTURE

Legitimate disagreements (*Ikhtilaf*) among classical Sunni authorities are recorded as first-class citizens in the evidence graph. The engine refuses to artificially reconcile differing opinions into false consensus.

---

## 29. INTELLECTUAL PROPERTY, LICENSING & ETHICAL HERITAGE COMPLIANCE

Sources are audited for rights:
- Classical heritage works (*Public Domain*).
- Modern translations and critical editions (*Licensed or Explicit Permissions*).
- Strict provenance tracking prevents copyright infringement.

---

## 30. AUDIT TRAILS, IMMUTABILITY & VERSION CONTROL

All knowledge objects, edits, and reviews are recorded in append-only cryptographic event logs signed with SHA-256 hashes.

---

## 31. KNOWLEDGE RELEASE & SNAPSHOT ENGINE (Merkle Roots)

Production releases are stamped with release tags (e.g., `AMAL-RELEASE-2026.10.01`) and anchored by a cryptographic **Merkle Root Hash** covering the entire corpus of Quran, translations, tafsir, and fiqh.

---

## 32. EMERGENCY REVOCATION & ZERO-DAY CORRECTION

If a textual corruption or unauthorized translation is discovered:
- Instant revocation cascades through dependent claim nodes.
- Deprecated nodes return a tombstone record pointing to the corrected revision.

---

## 33. HARD BLOCKS & RUNTIME REJECTION DEFENSES

The engine enforces automated hard blocks that halt publication or answer rendering:
- `MISSING_PRIMARY_EVIDENCE`: Attempting to issue a religious ruling without primary Quran/Sunnah evidence.
- `TRANSLATION_PRESENTED_AS_QURAN_ARABIC`: Translation text masquerading as sacred revelation.
- `INCOMPLETE_FOUR_MADHHAB_PERSPECTIVES`: Omitting legal diversity on non-consensus Fiqh issues.
- `AI_GENERATED_TRANSLATION_PROHIBITED`: AI-synthesized translation detected.

---

## 34. BENCHMARKS & EVALUATION METRICS (Zero Hallucination Standard)

- **Hallucination Rate**: 0.0% (Zero Tolerance).
- **Citation Accuracy**: > 99.5%.
- **Disagreement Preservation**: 100.0%.
- **Madhhab Attribution Accuracy**: 100.0%.

---

## 35. PROVENANCE EXPLORER & CITATION INSPECTOR UI/UX

Allows users, researchers, and scholars to inspect the complete chain of custody for any claim:
$$\text{Physical Manuscript/Artifact} \to \text{Verified Edition} \to \text{Passage} \to \text{Claim} \to \text{Reviewer Sign-off}$$

---

## 36. MOBILE & WEB DISPLAY SYSTEM (BIDI / Nastaliq / Devanagari)

Fully responsive cross-platform rendering supporting Android, iOS, and Web:
- Dynamic font fallback cascades.
- Smooth RTL/LTR transitions.
- Pixel-perfect diacritics and ligatures.

---

## 37. SOUND SEARCH & PHONETIC MULTILINGUAL TRANSLITERATION

Supports phonetic search variations (e.g., *Namaz, Nimaaz, Salaah, Salat, Solat, Rozah, Roza, Saum, Sawm*).

---

## 38. AI FABRICATION DEFENSE & HALLUCINATION ERADICATION

AI models are strictly confined to deterministic graph retrieval and structured formatting. Semantic synthesis without verified citation IDs is blocked at the gateway.

---

## 39. AUTOMATED CLAIM AUDITOR & VERIFICATION PROOFS

An automated verifier runs on every response contract before it reaches the client, auditing citations against the active Merkle-rooted knowledge release.

---

## 40. EVIDENCE GRAPH SYNCHRONIZATION & MULTILINGUAL EDGES

The knowledge graph connects Quranic verses, Hadith, tafsir passages, and fiqh positions across all 19 supported languages through unified concept nodes.

---

## 41. PRODUCTION REST API SUITE (16 Canonical Endpoints)

1. `GET /api/v1/languages`: Returns all supported India and Global languages.
2. `GET /api/v1/quran/surahs`: Returns the 114 canonical Surahs.
3. `GET /api/v1/quran/ayahs/:id`: Returns canonical Ayah with Uthmanic Arabic.
4. `GET /api/v1/translations`: Lists verified translation passages.
5. `GET /api/v1/translations/:id`: Retrieves translation work metadata.
6. `GET /api/v1/tafsir`: Lists classical and contemporary Tafsir works.
7. `GET /api/v1/tafsir/:id`: Retrieves Tafsir passages for an exegesis work.
8. `GET /api/v1/scholars`: Lists classical and resident scholars.
9. `GET /api/v1/madhhabs`: Lists the four Sunni schools of jurisprudence.
10. `GET /api/v1/traditions`: Lists recognized Sunni scholarly traditions.
11. `GET /api/v1/evidence/search`: Searches evidence across concepts and languages.
12. `GET /api/v1/evidence/:id`: Retrieves verified evidence node by canonical key.
13. `POST /api/v1/ai/ask`: Governed Islamic Q&A with claim audit.
14. `POST /api/v1/evidence/compare`: Cross-madhhab comparative fiqh view.
15. `GET /api/v1/sources/:id`: Retrieves source card and provenance record.
16. `GET /api/v1/knowledge/releases`: Returns active Merkle-rooted release snapshots.

---

## 42. DATABASE SCHEMAS & NORMALIZED ENTITY RELATIONSHIPS

Normalized relational schema spanning:
- `languages`: Language metadata, script, direction.
- `quran_surahs`: Canonical Surahs.
- `quran_ayahs`: 6,236 canonical verses.
- `quran_editions`: Critical Mushaf editions with SHA-256 hashes.
- `translation_works` & `translation_passages`: Translation registry.
- `tafsir_works` & `tafsir_passages`: Exegetical commentaries.
- `canonical_concepts`: Multilingual ontology mapping.
- `knowledge_releases`: Cryptographic snapshot manifests.

---

## 43. RESILIENCE, CACHING & OFFLINE-CAPABLE PACKAGES

- Tier-1 offline storage for daily worship, prayer times, and core Quranic translations.
- In-memory LRU caching with sub-millisecond retrieval for hot concepts.

---

## 44. PERFORMANCE SLOs & SUB-SECOND RETRIEVAL

- p95 Retrieval Latency: < 250ms.
- p99 Retrieval Latency: < 500ms.
- Availability Target: 99.99%.

---

## 45. SCHOLAR COUNCIL GOVERNANCE & NOMINATION RULES

Vetted scholar boards representing all four Sunni madhhabs govern source approval and dispute resolution. Minimum qualification: Ijazah / Sanad in Islamic sciences from a recognized Islamic university or traditional seminary.

---

## 46. REGIONAL COVERAGE TARGETS (India Priority Packs 1 & 2)

- **Priority 1**: Urdu, Hindi, Bengali (covering > 85% of Indian subcontinent Muslims).
- **Priority 2**: Gujarati, Marathi, Malayalam, Tamil, Telugu, Kannada, Punjabi.

---

## 47. GLOBAL DIASPORA COVERAGE & MINORITY COMMUNITIES

Ensures complete support for English, French, Spanish, German, Turkish, Persian, Indonesian, and Malay for diaspora communities worldwide.

---

## 48. ACCESSIBILITY (a11y), AUDIO RECITATION & SCREEN READERS

- Full WCAG 2.1 AA compliance.
- Screen-reader friendly phonetics and semantic ARIA labeling for Quranic diacritics.
- Synchronized word-by-word audio recitation hooks.

---

## 49. ETHICAL MONETIZATION & SCHOLAR ENDOWMENT (Waqf)

Knowledge access to primary Quranic revelation and verified classical texts is permanently free (*Waqf bi-la Iwadh*). Commercial API subscriptions fund scholar research grants and open-access digitizations.

---

## 50. INTEGRATION WITH AMAL PERSONAL DEEN OS V1.0 - V3.0

Seamlessly integrates with AMAL OS V1.0 (Daily Schedule & Goals), V1.5 (Adaptive Intelligence), V2.0 (Life OS Domains), and V3.0 (Scholar OS, Family OS, Institution OS).

---

## 51. DEVELOPER TOOLING, SDKs & VERIFICATION CLIs

- `@amal/evidence` SDK for querying the multilingual knowledge graph.
- `test:multilingual-engine` CLI verifying Section 54 acceptance criteria.

---

## 52. DRIFT MONITORING & SOURCE CORRUPTION DETECTION

Continuous automated background jobs verify file checksums and database hashes against registered Merkle roots. Any discrepancy triggers immediate alert and failover.

---

## 53. SECURE REPLICATION & GLOBAL AIR-GAPPED ARCHIVES

Read-only replicas distributed across global availability zones with immutable cold storage snapshots ensuring long-term preservation of the digital Islamic heritage.

---

## 54. MASTER VERIFICATION & TEST MATRIX (9 Acceptance Gates)

The implementation is verified by `scripts/test-multilingual-knowledge-engine.ts` against 9 rigorous gates:
1. **Gate 1**: Language Registry, Script & BIDI/RTL Handling (19 languages).
2. **Gate 2**: Quran Master Model & Immutable Edition Control (Uthmanic Arabic).
3. **Gate 3**: Translation Registry & Epistemic Separation (Urdu, Hindi, English).
4. **Gate 4**: Independent Tafsir Domain & Methodology (*Khaza'in al-Irfan*, *Jalalayn*).
5. **Gate 5**: Four Madhhab Positions & Ahl-e-Sunnat / Razvi Preference Parity.
6. **Gate 6**: Canonical Concept Mapping & Cross-Language Retrieval.
7. **Gate 7**: Automated Claim Auditor & Hard Block Defense.
8. **Gate 8**: Knowledge Releases & Cryptographic Merkle Root Verification.
9. **Gate 9**: All 16 Section 41 Master REST API Router Endpoints.

---

## 55. IMPLEMENTATION MILESTONES & PRODUCTION ROLLOUT ROADMAP

- **Milestone 1 (Foundations)**: Types, Schemas, Immutable Edition Control, Language Registry. *(Completed)*
- **Milestone 2 (Corpus Seeding)**: Uthmanic Arabic Quran, *Kanzul Iman* (Urdu/Hindi/English), *Khaza'in al-Irfan*, Four Madhhabs. *(Completed)*
- **Milestone 3 (Decoupled Engine & API)**: Universal Multilingual Engine, Concept Mapping, Claim Auditor, 16 REST API Endpoints. *(Completed)*
- **Milestone 4 (Verification & Governance)**: 100% Passing Test Gates (Section 54) & OpenAPI Documentation. *(Completed)*
- **Milestone 5 (Production Deployment)**: Live rollout across AMAL OS web, mobile, and scholar portals. *(Ready for Deployment)*
