# AMAL OS — VERIFIED KNOWLEDGE CONTROL PLANE MASTER PROMPT
## Master System Specification, Autonomous Audit & Theological Governance Contract
### *"Maximum Trustworthiness with Zero Fabrication: Honest Uncertainty Over Fabricated Certainty"*

---

# 1. CORE OPERATING PRINCIPLE

> **"AMAL MUST NEVER BE DESIGNED TO ALWAYS HAVE AN ANSWER. IT MUST BE DESIGNED TO ALWAYS HAVE AN HONEST ANSWER."**

```text
Verified Answer       ───► Deliver Verified Answer with Canonical Citation
Verified Plurality    ───► Disclose Multi-School Scholarly Positions Respectfully
Insufficient Evidence ───► Return Governed Silence / Insufficient Evidence Response
Scholar Required      ───► Escalate to Two-Scholar Human Triage Desk
Conflicting Sources   ───► Flag Dispute, Preserve Ikhtilāf & Route to Review
Unknown / Unverified  ───► NEVER GUESS
Fabricated Citation   ───► STOP THE LINE (Immediate Circuit-Breaker Freeze)
```

---

# 2. THE 30 CRITICAL GOVERNANCE CONTROLS

### Control 1: Independent Islamic Scholarly Council
The platform is governed by an independent 6-seat scholarly review council:
```text
                         AMAL OS
                            │
               ISLAMIC SCHOLARLY COUNCIL
                            │
   ┌───────────────┬────────┴───────┬───────────────┐
   ↓               ↓                ↓               ↓
 Hadith          Fiqh            Tafsir       Arabic / Usul
Reviewer       Reviewer         Reviewer        Reviewer
   │               │                │               │
   └───────────────┴────────┬───────┴───────────────┘
                            ↓
                Knowledge Governance Lead
```
*High-risk jurisprudence (Divorce, marital disputes, financial transactions) requires mandatory dual independent review (`Two-Person Rule`).*

### Control 2: Governed Source Whitelist
Content from arbitrary internet scraping, social media, or random websites is strictly blocked.
```text
APPROVED SOURCE ──► APPROVED EDITION ──► APPROVED VERSION ──► PRODUCTION
```
Any source not explicitly registered in [`SourceRegistry`](file:///Users/irfanashraf/Downloads/Amal/packages/evidence/src/integrity/source-registry.ts) is treated as `UNKNOWN` and **BLOCKED**.

### Control 3: Complete Disabling of Internet Fallback
When evidence is not found in the verified knowledge base:
* ❌ No fallback to live Google / Bing search.
* ❌ No fallback to ungrounded LLM memory.
* ❌ No Wikipedia, social media, or YouTube transcript crawling.
* ✅ Return approved fallback:
  > *"I couldn't verify sufficient evidence from approved canonical Islamic sources to answer this question with certainty."*

### Control 4: Exact Source Artifact Snapshot & Cryptographic Hashes
Every source stores its reviewed raw artifact snapshot with:
* Canonical Work Title & Author
* Specific Critical Edition & Publisher
* Atomic Passage Text
* SHA-256 Cryptographic Hash Digest
* Version Tag & Reviewer Digital Signature

### Control 5: The Immutable Claim Ledger
Every religious statement in AMAL OS is recorded as an atomic claim in the [`ClaimLedger`](file:///Users/irfanashraf/Downloads/Amal/packages/evidence/src/integrity/claim-ledger.ts):
```text
CLAIM-000001
├── Claim Text: "Actions are judged by intentions"
├── Source: Sahih al-Bukhari (Dar Tuq al-Najat Edition)
├── Reference: Sahih al-Bukhari 1
├── Support Level: DIRECT
├── Epistemic Domain: REVELATION
├── Scholar Reviewer: Dr. Tariq Al-Hashimi
├── Review Status: VERIFIED
└── Content Hash: sha256_bukhari_1_niyyah_canonical
```
*Rule: Before an AI sentence is emitted, every theological assertion must resolve to an entry in the Claim Ledger.*

### Control 6: Template-Bounded Response Generation (No Free-Form Writing)
AI models never write religious advice on a blank canvas. Generation is bounded:
```text
Retrieved Evidence ──► Structured Claims ──► Approved Interpretation ──► Response Template ──► User Answer
```

### Control 7: Claim-Level Citation Mapping
Citations are mapped claim-by-claim rather than appending a generic reference to the end of a long paragraph:
```text
[Claim A: "Fajr recitation is witnessed"] ────► [Quran 17:78]
[Claim B: "Consistency is beloved"]       ────► [Sahih al-Bukhari 6464]
[Claim C: "Shafi'i position on Qunūt"]    ────► [Fiqh Subgraph: Madhhab Shafi'i]
```

### Control 8: Machine-Checkable Citations
Every citation is parsed by [`ReferenceValidator`](file:///Users/irfanashraf/Downloads/Amal/packages/evidence/src/integrity/reference-validator.ts) checking:
* Collection bounds (e.g. Bukhari 1..7563)
* Quran bounds (Surah 1..114, exact Ayah limits)
* Passage existence in canonical database
* Review status = `APPROVED`

### Control 9: Epistemic Separation of Authenticity vs. Juristic Acceptance
AMAL OS explicitly distinguishes:
$$\text{Text Existence} \ne \text{Hadith Grading} \ne \text{Scholarly Acceptance} \ne \text{Fiqh Implication}$$
A Sahih narration does not automatically establish universal consensus if recognized classical schools differ in its juristic application.

### Control 10: Madhhab & Scholarly Plurality Layer (*Ikhtilāf*)
Where classical schools legitimately differ:
* Display recognized parallel positions attributed to their respective schools (*Hanafi, Maliki, Shafi'i, Hanbali*).
* Never enforce artificial homogenization or silently pick one school.

### Control 11: Consensus Detector (*Ijma'* Gate)
If an AI candidate text asserts:
> *"All scholars agree..."* or *"Scholars unanimously agree..."*
The [`DangerousPhraseDetector`](file:///Users/irfanashraf/Downloads/Amal/packages/evidence/src/integrity/dangerous-phrase-detector.ts) intercepts the output and verifies if an explicit Ijma' node exists. If no verified consensus record exists: **IMMEDIATE REJECTION**.

### Control 12: Translation Verification System
* Translations are stored separately from Arabic revelation.
* AI cannot invent or modify Quran translations.
* Displays vetted editions only (e.g., Saheeh International, Clear Quran).

### Control 13: Arabic Text Diff Checker
[`ArabicTextDiffChecker`](file:///Users/irfanashraf/Downloads/Amal/packages/evidence/src/integrity/arabic-diff-checker.ts) runs continuous bitwise and Unicode glyph diffs against the King Fahd Medina Mushaf baseline. Any glyph, diacritic, or normalization alteration triggers an immediate **SEV-0 Alert** and freezes publication.

### Control 14: Islamic Knowledge CI/CD
Knowledge changes ship like software code:
```text
Knowledge PR ──► Reference Check ──► Diff Check ──► License Gate ──► Two-Scholar Signoff ──► Gold Benchmark ──► Release
```

### Control 15: Full Knowledge Version Pinning
Every AI response audit log records:
```json
{
  "response_id": "resp_001",
  "knowledge_release": "rel_2026_10_07",
  "source_version": "v1.4",
  "retrieval_version": "ret_hybrid_v2",
  "prompt_version": "sys_prompt_deen_v3",
  "model_version": "claude-3-5-sonnet-20241022",
  "policy_version": "pol_pdp_v1"
}
```

### Control 16: Frozen Production Corpus
Production databases are read-only to AI and workers. Changes only enter via signed, versioned release candidates using Blue-Green aliases (`index_A` / `index_B`).

### Control 17: No Automatic Self-Learning of Islamic Truth
User behavioral adaptations and AI chat transcripts **NEVER** write back into or alter the Islamic knowledge base. Sacred tradition is immutable.

### Control 18: User Report $\ne$ Truth Update
User reports create an auditable review case for the Scholar Council. They never automatically alter or delete production knowledge.

### Control 19: Islamic Knowledge Red Team by Muslim Scholars
Adversarial evaluations specifically test:
* Fake Hadith injections
* Guessed gradings
* False consensus assertions
* Deliberate translation distortions
* Talaq / Fiqh traps

### Control 20: External Pre-Launch Audit
Independent academic jurists audit the Claim Ledger, Evidence Graph, and Citation Auditor prior to public launch.

### Control 21: "Stop the Line" Policy
Implemented in [`StopTheLineController`](file:///Users/irfanashraf/Downloads/Amal/packages/evidence/src/integrity/stop-the-line-controller.ts):
If a serious citation fabrication occurs in production, the system automatically:
1. Halts the AI inference path across the platform (`KnowledgePolicyEngine.setIslamicAiEnabled(false)`).
2. Identifies and quarantines affected nodes.
3. Requires root-cause investigation and regression benchmark passage before resumption.

### Control 22: Dangerous Phrase Detector
Production output is parsed by [`DangerousPhraseDetector`](file:///Users/irfanashraf/Downloads/Amal/packages/evidence/src/integrity/dangerous-phrase-detector.ts) for:
* *"Allah says"*
* *"the Prophet said"*
* *"authentic hadith"*
* *"all scholars agree"*
* *"it is haram"*
* *"it is wajib"*
* *"Islam clearly says"*
Each phrase requires verified `DIRECT` support in the Claim Ledger; otherwise, output is blocked.

### Control 23: Confidence Language Controller
Framing is governed by [`ConfidenceLanguageController`](file:///Users/irfanashraf/Downloads/Amal/packages/evidence/src/integrity/confidence-language-controller.ts):
* `DIRECT` $\to$ *"The Quran states:"*
* `INTERPRETATION` $\to$ *"Classical commentators explain:"*
* `PLURALITY` $\to$ *"Recognized jurists hold differing valid positions:"*
* `UNCERTAIN` $\to$ *"I could not verify sufficient evidence from approved canonical sources."*

### Control 24: No Ranking by Popularity
Relevance is calculated by: $\text{Provenance} \times \text{Authority} \times \text{Direct Citation Fit}$. Search engine clicks or social media virality carry **zero weight**.

### Control 25: Knowledge Passport System
Every passage carries a cryptographic passport verified by [`KnowledgePassport`](file:///Users/irfanashraf/Downloads/Amal/packages/evidence/src/integrity/knowledge-passport.ts) verifying Level 7 publication eligibility.

### Control 26: The Knowledge Firewall
Physical separation ensuring unverified or quarantined materials are physically segregated and prevented from entering the retrieval index.

### Control 27: AI Religious Hallucination Firewall
Post-generation verification pipeline:
```text
LLM Generation ──► Claim Extraction ──► Ledger Match ──► Citation Match ──► Plurality Check ──► Final Delivery
```

### Control 28: 1,000–3,000 Scholar-Reviewed Gold Dataset
Master benchmark dataset testing Quran, Hadith, Tafsir, Aqeedah, Fiqh, and sensitive pastoral questions with 0 tolerated fabrications.

### Control 29: Separation of Knowledge Confidence from Answer Confidence
A verified source does not justify unverified extrapolations. If the source is authentic but the application is speculative, the system flags the uncertainty.

### Control 30: Final Locked Control Plane Architecture
```text
                         AMAL OS
                            │
                  TRUST CONTROL PLANE
                            │
       ┌────────────────────┼────────────────────┐
       ↓                    ↓                    ↓
    PRIVACY              SAFETY              GOVERNANCE
       ↓                    ↓                    ↓
  Vault (INV_03)      Fatwa Firewall     Scholar Council
       │                    │                    │
       └────────────────────┼────────────────────┘
                            ↓
                   KNOWLEDGE FIREWALL
                            ↓
                 VERIFIED FROZEN CORPUS
               (Medina Quran + Kutub Sittah)
                            ↓
                     EVIDENCE GRAPH
                            ↓
                    HYBRID RETRIEVAL
                            ↓
                       AI RUNTIME
                            ↓
                   CLAIM LEDGER AUDITOR
                            ↓
                     CITATION AUDITOR
                            ↓
                  DANGEROUS PHRASE GATE
                            ↓
                   FINAL SAFETY GATE
                            ↓
                       END USER
```

---

# 3. REPOSITORY AUDIT & QUARANTINE MANDATE

All existing JSON, SQL, and database fixtures in AMAL OS must comply with this contract:
1. **Existing Datasets**: All seed records in [`packages/database/src/seeds/data.ts`](file:///Users/irfanashraf/Downloads/Amal/packages/database/src/seeds/data.ts) audited and certified.
2. **Missing Hashes**: Any item lacking SHA-256 provenance is moved to Quarantine.
3. **Unlicensed Items**: Moved to Quarantine until copyright clearance is recorded.
4. **Pre-Production Audit**: Verified passing 10/10 health dimensions.
