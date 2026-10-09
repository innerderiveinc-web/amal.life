# AMAL OS — UNIVERSAL KNOWLEDGE & SCHOLARLY NEUTRALITY CHARTER

> **Canonical Epistemic Constitution & Governance Standard for AMAL OS**  
> Governing the four Sunni legal schools (Hanafi, Maliki, Shafi'i, Hanbali), scholarly parity, evidence immutability, and multi-tier personalized presentation.

---

## 1. Core Mission & Principle

AMAL provides Muslims with a trustworthy, evidence-governed, broad and practical knowledge environment that respects established Islamic scholarship, Sunni legal diversity, legitimate scholarly differences, and individual user preferences.

AMAL is built for beginners, practicing Muslims, students of knowledge, families, scholars, and users from different Sunni madhhabs and scholarly traditions.

### The Foundational Principle
> **AMAL is not built for one madhhab.**  
> **AMAL is built around trustworthy Islamic knowledge, scholarly integrity, and beneficial action.**

---

## 2. The Knowledge Principle

The knowledge corpus must be broad.  
The presentation must be personalized.  
The evidence must remain unchanged.

### What User Preference MAY Influence:
- Ordering and prioritization of recommendations.
- Language (Arabic, English, Urdu, etc.).
- Depth of juristic analysis (`BEGINNER_SIMPLE`, `PRACTICING`, `ADVANCED_STUDENT`).
- Scholar and source preference.
- Madhhab preference (`HANAFI`, `MALIKI`, `SHAFI_I`, `HANBALI`, or `GENERAL_SUNNI`).
- Spiritual literature preference (e.g. *Ihya Ulum al-Din*, *Kitab al-Hikam*, *Riyad al-Salihin*).
- Learning style and practical daily recommendations.

### What User Preference Must NEVER Modify (Hard Invariant):
- Quranic text (Surah, Ayah, Arabic bitwise orthography).
- Source provenance and textual lineage.
- Hadith identity, chain of transmission (*Isnad*), and grading.
- Scholarly attribution and classical quotations.
- Established Fiqh positions of the classical academies.
- Evidence classification.
- Canonical citations.
- Historical facts.
- Source authority metadata.

```text
Universal Evidence Layer
        ↓
Scholarly Interpretation Layer
        ↓
User Preference Layer
        ↓
Personalized Presentation
        ↓
Practical Amal
```

**NEVER**:
```text
User Preference
        ↓
AI
        ↓
Modified Evidence  (STRICTLY FORBIDDEN)
```

---

## 3. Sunni Madhhab Coverage & Parity

AMAL OS provides first-class, independently governed architectures for all four canonical Sunni schools:

| School | Eponym | Canonical Foundational Works | Major Legal Manuals & Commentaries | Core Usul Principles |
| :--- | :--- | :--- | :--- | :--- |
| **Hanafi** | Imam Abu Hanifah al-Nu'man (80–150 AH) | *Al-Asl (Al-Mabsut)* by Imam Muhammad al-Shaybani; *Al-Jami' al-Saghir* | *Al-Hidayah* by al-Marghinani; *Mukhtasar al-Quduri*; *Radd al-Muhtar (Ibn Abidin)* | Zahir al-Riwayah priority; Istihsan; 'Urf as secondary validator. |
| **Maliki** | Imam Malik ibn Anas (93–179 AH) | *Al-Muwatta* by Imam Malik; *Al-Mudawwanah* by Sahnun | *Mukhtasar Khalil*; *Al-Risalah* by Ibn Abi Zayd; *Bidayat al-Mujtahid* by Ibn Rushd | 'Amal Ahl al-Madinah; Maslahah Mursalah; Sadd al-Dhara'i. |
| **Shafi'i** | Imam Muhammad ibn Idris al-Shafi'i (150–204 AH) | *Al-Risalah*; *Al-Umm* by Imam al-Shafi'i | *Minhaj al-Talibin* by Imam al-Nawawi; *Matn Abi Shuja'*; *Al-Majmu'* | Strict text-linked Qiyas; Rejection of Istihsan; Istishab. |
| **Hanbali** | Imam Ahmad ibn Hanbal (164–241 AH) | *Al-Masa'il* (Transmitted Responsa); *Musnad Ahmad* | *Al-Mughni* by Ibn Qudamah; *Zad al-Mustaqni'* by al-Hajjawi; *Al-Muqni'* | Text/Athar over Qiyas; Mursal over personal Ra'y; Ibadah invalidity unless sanctioned. |

### The Parity Invariant
> **AMAL must not rank one madhhab as universally superior.**  
> Any heuristic or algorithm attempting to brand one school as "more authentic" or "invalid" triggers a hard exception (`SECTARIAN_RANKING_VIOLATION`).

When a user asks for comparative guidance, the system decomposes the inquiry into:
1. **Areas of Agreement** (Ijma' / Consensual Core).
2. **Areas of Disagreement** (Legitimate branches / Furu').
3. **Position of Each School** (with textual evidence references).
4. **Conditions & Exceptions**.
5. **Reliable Classical References**.

---

## 4. Source Governance & Verification Principle

Every authoritative knowledge object within the AMAL Evidence Graph must possess:
- Identity & UUID
- Provenance & chain of transmission
- Critical Edition & Volume/Page
- Exact textual reference
- License & commercial permissions
- Semantic version & artifact hash (SHA-256)
- Content integrity diff
- Scholarly classification & Two-Scholar sign-off (`INV_07`)
- Publication status

### Rejection of Spurious Authority
No source becomes authoritative in AMAL merely because:
- It exists on the internet.
- It appears in search results.
- A large language model remembers it.
- Social media repeats it.
- Users upvote it.
- Another AI cites it.

---

## 5. Epistemic Separation

AMAL strictly classifies and labels every piece of content according to its epistemic reality:

1. **`REVELATION`**: Infallible divine word of Allah (Quran).
2. **`PROPHETIC_REPORT`**: Prophetic Sunnah and Hadith with authentic grading.
3. **`SCHOLARLY_INTERPRETATION`**: Classical exegesis (*Tafsir*) and juristic derivation.
4. **`FIQH_POSITION`**: Codified legal rulings of the classical academies.
5. **`SCHOLARLY_OPINION`**: Contemporary Fatwa or individual scholar evaluation.
6. **`SPIRITUAL_ETHICAL_TRADITION`**: Tazkiyah and Akhlaq literature.
7. **`HISTORICAL_INFORMATION`**: Seerah and Islamic history records.
8. **`ACADEMIC_RESEARCH`**: Contemporary peer-reviewed studies.
9. **`BEHAVIORAL_SCIENCE`**: Cognitive load theory, habit formation, pacing.
10. **`GENERAL_PRACTICAL_GUIDANCE`**: Operational advice and schedule planning.
11. **`USER_PREFERENCE`**: Personal selections and chosen madhhab path.
12. **`AI_INFERENCE`**: Computational heuristics (strictly separated from revelation).

These categories are never silently merged. AI inference is strictly barred from speaking in the tone of divine revelation.

---

## 6. Multi-Tier Personalized Presentation

AMAL provides three distinct presentation experiences tailored to user capacity:

1. **`BEGINNER_SIMPLE`**:
   - Clear, uplifting, non-sectarian tone.
   - Focuses on immediate, tranquil execution of obligatory worship without overwhelming the seeker with conflicting juristic debates.
2. **`PRACTICING`**:
   - Practical ruling aligned with the seeker's chosen school (e.g. Hanafi, Maliki, Shafi'i, Hanbali).
   - Core textual citation and classical manual reference.
   - Respectful acknowledgement of legitimate differences.
3. **`ADVANCED_STUDENT`**:
   - Full comparative matrix across all four Sunni schools.
   - Detailed evidentiary breakdown (*Dalil*), usul methodologies, conditions, exceptions, and classical page citations.

---

## 7. Practical Deen Transformation

AMAL refuses to be merely an abstract Islamic encyclopedia. Knowledge is operationalized into sustainable spiritual practice:

```text
KNOWLEDGE
   ↓
UNDERSTANDING
   ↓
CONTEXT
   ↓
PRACTICAL GUIDANCE
   ↓
AMAL
   ↓
REFLECTION
   ↓
ADAPTATION
```

---

## 8. Verification & Test Certification

The Universal Knowledge & Scholarly Neutrality Charter is verified by:
- **`pnpm run test:neutrality`**: 7/7 comprehensive automated tests passing (100%).
- Integrated into `ApiRouter` endpoints:
  - `GET /api/v1/knowledge/madhhabs`
  - `GET /api/v1/knowledge/madhhabs/:school`
  - `GET /api/v1/knowledge/comparative-fiqh/:id`
  - `POST /api/v1/knowledge/fiqh-guidance`
- Zero sectarian ranking violations. Zero evidence tampering.

---

## 9. Final Governing Invariant

> **AMAL must be broad enough for Muslims to benefit according to their own legitimate scholarly preferences, yet disciplined enough that Islamic knowledge is never reshaped merely to satisfy those preferences.**  
> **The platform remains broad. The evidence remains disciplined. The user remains free to follow their trusted scholarly path.**
