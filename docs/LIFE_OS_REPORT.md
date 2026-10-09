# AMAL OS V2.0 — LIFE OS & SITUATION ENGINE ARCHITECTURE REPORT

> **Comprehensive Technical Architecture & Operations Guide for AMAL Life OS**  
> Formatted according to V2.0 Master Execution Specification.

---

## 1. Overview & Conceptual Evolution

In earlier releases, AMAL OS addressed individual queries (Q&A) and isolated goals (Goal $\rightarrow$ Amal). In V2.0, AMAL evolves into a unified **Life Operating System**:

```text
Life Situation
→ Contextual & Domain Recognition
→ Islamic Evidence Grounding
→ Life Decision Support
→ Decomposed Schedule Proposals
→ Concrete Amal
→ Muhasabah & Adaptation
```

The system recognizes that a seeker does not live in fragmented siloes: a demanding professional project impacts evening family presence, Maghrib prayer punctuality, and bedtime sleep hygiene. The Life Situation Engine evaluates these holistic intersections without violating Islamic bounds or personal privacy.

---

## 2. Multi-Domain Classification Architecture

The `LifeSituationEngine` analyzes situational inputs across 16 canonical domains:

```typescript
export type LifeDomain =
  | 'DEEN'
  | 'WORK'
  | 'STUDY'
  | 'FAMILY'
  | 'CHARACTER'
  | 'TIME'
  | 'KNOWLEDGE'
  | 'RAMADAN'
  | 'MARRIAGE_PREPARATION'
  | 'FINANCE'
  | 'TRAVEL'
  | 'HAJJ'
  | 'UMRAH'
  | 'COMMUNITY'
  | 'SERVICE'
  | 'PERSONAL_GROWTH';
```

### Keyword & Context Detection Matrix
When a situation description (e.g. *"Starting a new high-pressure software engineering job while studying for university exams and struggling to wake up for Fajr"*) is processed:
1. **Domain Detection**: The engine identifies overlapping domains (`DEEN`, `WORK`, `STUDY`).
2. **Constraint Extraction**: Temporal bottlenecks (e.g. late working hours, early Fajr horizon) and cognitive load are quantified.
3. **Epistemic Attribution**: For each suggested intervention or schedule item, the exact source is stamped:
   - Fardh/Wajib obligations (e.g. Fajr, Friday Jumu'ah) $\rightarrow$ `ISLAMIC_EVIDENCE`.
   - Recommended focus methods (e.g. 45-minute deep work intervals) $\rightarrow$ `BEHAVIORAL_SCIENCE`.
   - General workplace communication tips $\rightarrow$ `GENERAL_PRACTICAL_GUIDANCE`.

---

## 3. Today V2 & Prayer-Centered Smart Time Windows

In V2.0, the daily planner is anchored fundamentally around the 5 daily prayers rather than arbitrary calendar grids. 

### Smart Time Windows
| Window | Temporal Definition | Primary Spiritual / Practical Focus |
| :--- | :--- | :--- |
| **`DAWN`** | Fajr horizon until Sunrise | Obligatory Fajr, Morning Adhkar, Quran reflection, high-clarity planning. |
| **`EARLY_MORNING`** | Post-Sunrise until Dhuhr | High-focus deep work, academic study, high-leverage professional tasks. |
| **`MIDDAY`** | Dhuhr horizon to Asr | Dhuhr prayer, midday rest (*Qaylulah*), nutrition, operational tasks. |
| **`AFTERNOON`** | Asr horizon to Maghrib | Asr prayer, Evening Adhkar, transition from professional work to family. |
| **`EVENING`** | Maghrib horizon to Isha | Maghrib prayer, shared family dinner, household connection, community. |
| **`NIGHT`** | Isha horizon to Sleep | Isha prayer, Witr, reading, wind-down sleep hygiene, preparation for Tahajjud. |

---

## 4. Specialized Modes Architecture

AMAL OS V2.0 introduces three specialized, seasonal/event-driven operating modes:

### 1. Ramadan OS
- **Canonical Pacing Engine**: Calculates page/Juz targets based on seeker's chosen Khatm objective (`ONE_KHATM` = ~20 pages/day; `TWO_KHATMS` = ~40 pages/day; `STUDY_PACE` = thematic Tafsir).
- **Suhoor & Iftar Buffers**: Dynamically locks out non-essential notifications 60 minutes prior to Fajr (Suhoor buffer) and 30 minutes prior to Maghrib (Du'a / Iftar buffer).
- **Taraweeh & Tahajjud Accommodations**: Automatically shifts sleep hygiene targets and afternoon work routines.

### 2. Hajj & Umrah Mode
- **Pilgrimage Type Gating**: Supports `HAJJ_TAMATTU`, `HAJJ_QIRAN`, `HAJJ_IFRAD`, and standalone `UMRAH`.
- **Governed Checklists**: Dual-track preparation:
  - *Ritual Readiness*: Ihram conditions, Talbiyah, Miqat boundaries, Tawaf rules, Sa'i, Mina/Arafat logistics.
  - *Practical Readiness*: Passport validity, required vaccinations (meningitis, COVID-19), comfortable walking gear, medication supply.

### 3. Travel Mode & Safar Concession Rules
- **Canonical Distance Threshold**: Implements the authentic majority scholarly consensus regarding the minimum travel distance for Qasr and Jam' concessions ($\ge 80\text{ km}$ / $\approx 48$ miles).
- **Evidence Provenance**: Citations explicitly anchored in Sahih al-Bukhari (1086) and Sahih Muslim (686).
- **Automated Distance Check**: `assertTravelSafarRules(distanceKm)`:
  - If $\ge 80\text{ km}$: Returns `qasrEligible: true`, unlocks shortened 4-rak'ah prayers (Dhuhr, Asr, Isha $\rightarrow$ 2 rak'ahs) and permissible combination (*Jam'*).
  - If $< 80\text{ km}$: Returns `qasrEligible: false` with clear educational explanation that standard prayer counts remain obligatory.

---

## 5. Summary & Verification

All components of the Life Situation Engine and Specialized Modes are verified under Gate 1, 2, 6, 7, and 8 of the V2.0 Master Verification Suite (`test:v20`).
