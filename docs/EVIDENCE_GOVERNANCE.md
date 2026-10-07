# AMAL OS — Islamic Evidence Governance & Knowledge Graph

## 1. Source Hierarchy

Islamic evidence is structured across six strict authority classes:

- **Tier 1 — Quranic Text**: Absolute primary revelation. Direct Arabic text, vetted translations (e.g. Saheeh International), and licensed tafsir.
- **Tier 2 — Authentic Hadith**: Canonical collections (Sahih al-Bukhari, Sahih Muslim, Sunan collections). Records must possess complete reference, grading metadata (*Sahih*, *Hasan*), and verified provenance.
- **Tier 3 — Classical Tafsir & Scholarship**: Established classical commentaries (Tafsir Ibn Kathir, Al-Qurtubi, Al-Tabari).
- **Tier 4 — Recognized Contemporary Scholarship**: Peer-reviewed and credentialed contemporary jurisprudence.
- **Tier 5 — Editorial Educational Content**: Curated habit-building and educational materials authored by qualified editors.
- **Tier 6 — AI Synthesis**: Generated explanatory prose. **AI synthesis is never treated as primary religious evidence.**

---

## 2. Ingestion & Verification Workflow

No text is ingested by scraping arbitrary internet sites. Every Islamic source must pass through a multi-stage approval funnel:

```text
IMPORT
  ↓
NORMALIZE
  ↓
DUPLICATE CHECK
  ↓
METADATA ENRICHMENT (Author, Collection, Volume, Grading)
  ↓
SOURCE VERIFICATION
  ↓
EDITORIAL REVIEW
  ↓
SCHOLAR REVIEW & SIGN-OFF
  ↓
APPROVED & PUBLISHED
```

---

## 3. Citation Verification & Zero-Tolerance Fabrication

Before any AI response is transmitted to a user:
1. Every claim is checked against the database of approved passages.
2. If a reference does not exist or fails verification, the response is rejected and regenerated.
3. If verification fails after two attempts, the authoritative claim is stripped, and the response is published with a safe fallback: *"I could not verify that claim sufficiently against approved Islamic sources."*
4. Release criteria: **>99% verified citation accuracy** and **0 tolerated fabricated citations**.
