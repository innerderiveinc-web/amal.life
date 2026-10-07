# AMAL OS — AI INTELLIGENCE RUNTIME SPECIFICATION

## 1. Operating Principle & Non-Negotiables

```text
USER QUERY
    ↓
INTENT ROUTER
    ↓
PRE-RETRIEVAL SAFETY FIREWALL (Classes A–E)
    ↓
CONTEXT FIREWALL 2.0 (L0–L6 Minimum Context)
    ↓
HYBRID ISLAMIC RETRIEVAL (Lexical + Vector + Graph)
    ↓
EVIDENCE VERIFICATION (Medina Hash Provenance)
    ↓
EPISTEMIC RESPONSE COMPOSER
    ↓
ZERO-FABRICATION CITATION AUDITOR
    ↓
FINAL SAFETY GATE
    ↓
USER RESPONSE
```

### Core Invariants:
1. **AI Never Directly Mutates the Database:** All mutations must flow through: `AI Proposal` $\to$ `Policy PDP` $\to$ `Authorization` $\to$ `Application Service` $\to$ `Database`.
2. **Zero Fabricated Citations:** If an exact Quranic ayah or Hadith reference cannot be validated against the immutable corpus graph, the citation is stripped and the claim is downgraded.
3. **Epistemic Segregation:** Revealatary evidence, scholarly opinions, personalized guidance, and behavioral techniques must never be presented in a single undifferentiated voice.
4. **Deterministic Faith Mode:** When AI is disabled (`AI_ENABLED=false`) or external model providers are down, the core application (Goals, Journeys, Today OS, Amal completion, Muhasabah, Prayer times, Quran) continues to function deterministically.

---

## 2. 14 Governed AI Agents

1. **Master Orchestrator:** 13-stage deterministic state pipeline coordinating safety, retrieval, generation, and auditing.
2. **Intent Router:** Multi-intent extraction classifying seeker inquiries into 4 confidence tiers.
3. **Safety Agent:** Real-time adversarial prompt injection detection, data exfiltration prevention, and 988 emergency crisis interception.
4. **Context Agent:** Ephemeral `AIDataEnvelope` assembly respecting context boundaries.
5. **Memory Agent:** Governed memory lifecycle enforcing: `Explicit User Choice` > `Confirmed Preference` > `Observed Pattern` > `AI Inference`. Sensitive journals are never committed to long-term memory.
6. **Islamic Retrieval Agent:** Hybrid BM25 lexical, dense pgvector, and relational graph traversal of approved sources only.
7. **Evidence Verification Agent:** Medina Mushaf SHA-256 hash provenance and Hadith chain checks.
8. **Deen Explanation Agent:** Calm, accessible articulation of universal virtues and foundational concepts.
9. **Fiqh Plurality Agent:** Explains documented differences across classical madhhabs without sectarian bias or false consensus.
10. **Amal Planner Agent:** Generates daily action candidates constrained to 1 primary and 0–2 optional actions.
11. **Journey Agent:** Evaluates phase progression and suggests gentle adaptations without guilt.
12. **Muhasabah Reflection Agent:** Pattern analysis of friction and intentions without assigning spiritual worth or sin scores.
13. **Scholar Escalation Agent:** Assembles structured Class D pastoral dossiers for human jurist review.
14. **Islamic Citation Auditor:** Strict verification gate verifying every reference before response delivery.

---

## 3. Four-Tier Epistemic Response Quadrants

Every response touching faith matters must explicitly label its epistemic authority:

- `[ISLAM SAYS]`: Direct, unequivocal Quranic text or authentic Hadith agreed upon across Ahl al-Sunnah.
- `[SCHOLARS DISCUSS]`: Historical juristic reasoning, Tafsir commentary, or differing madhhab positions.
- `[AMAL RECOMMENDS]`: Algorithmic synthesis tailoring a sustainable action to the user's available time and energy.
- `[YOU MAY FIND THIS PRACTICAL]`: Universal psychological or behavioral habit strategies clearly marked as human advice.

---

## 4. Fatwa Safety Firewall (Classes A–E)

- **Class A (Universal Basics):** Five pillars, fasting, prayer basics $\to$ Automated answer with verified text.
- **Class B (Virtues & Character):** Honesty, patience, gratitude $\to$ Automated answer with prophetic narration.
- **Class C (Documented School Differences):** Wudu invalidators, Qunut in Fajr $\to$ Automated pluralistic presentation showing Hanbali, Hanafi, Shafi'i, and Maliki positions neutrally.
- **Class D (Personalized / Sensitive Fiqh):** Divorce, inheritance disputes, medical ethics $\to$ Autonomous answering refused. Escalated to Two-Scholar Human Triage Desk with user consent.
- **Class E (Crisis & Harm):** Self-harm, domestic violence $\to$ Immediate blocking with pastoral care and crisis hotline referrals (Dial 988).

---

## 5. Cost Control & Infinite Loop Prevention

- Maximum agent turns: 4
- Maximum tool invocations per turn: 2
- Model timeout: 15 seconds
- Fallback chain: Primary Reasoning Model $\to$ Fast Local Model $\to$ Deterministic Offline Cache $\to$ Scholar Referral.
