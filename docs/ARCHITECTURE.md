# AMAL OS — System Architecture Specification

## 1. Executive Architecture Overview

AMAL OS is built around a decoupled, multi-layered service architecture that decouples personal user context from canonical Islamic knowledge.

```
                         AMAL OS
                           │
                 ┌─────────┴─────────┐
                 │                   │
             EXPERIENCE           ADMIN
                 │                   │
       ┌─────────┼─────────┐     Content Control
       │         │         │     Scholar Portal
     Mobile     Web     Scholar   Safety Monitor
       │         │         │     Audit Logs
       └─────────┼─────────┘
                 ↓
             API GATEWAY
                 ↓
        ┌────────┼─────────┐
        ↓        ↓         ↓
      USER     JOURNEY   FAMILY
      CORE      CORE      CORE
        │        │         │
        └────────┼─────────┘
                 ↓
             AI GATEWAY
                 ↓
       ┌─────────┼─────────┐
       ↓         ↓         ↓
   RETRIEVAL   SAFETY   ORCHESTRATOR
       │         │         │
       └─────────┼─────────┘
                 ↓
        ISLAMIC EVIDENCE LAYER
                 ↓
       PostgreSQL + pgvector
                 ↓
       Licensed & Approved Sources
```

---

## 2. The 12 Orchestrated AI Agents

Instead of a monolithic generic Islamic chatbot, AMAL uses a deterministic, orchestrated agent pipeline:

1. **IntentRouter**: Analyzes input to detect worship, habit, emotional, fiqh, or crisis intents.
2. **SafetyClassifier**: Classifies the prompt against the Fatwa Safety Firewall (Classes A, B, C, D, E).
3. **ContextRetriever**: Pulls approved user context (routine, available minutes, timezone) with explicit consent boundaries.
4. **IslamicRetriever**: Executes hybrid vector + keyword retrieval across verified Quran and Hadith passages.
5. **EvidenceVerifier**: Validates source authority, editorial review status, and authentic grading metadata.
6. **DeenExplainer**: Synthesizes guidance in understandable, dignified language without formulating fatwas.
7. **AmalPlanner**: Computes the Amal score:  
   $$\text{AMAL\_SCORE} = \text{EvidenceFit} \times \text{ContextFit} \times \text{Feasibility} \times \text{UserIntent} \times \text{Safety}$$
8. **JourneyPlanner**: Configures multi-day progressive journeys with non-shaming adaptive pacing.
9. **ReflectionAgent**: Derives behavioral routine observations from Muhasabah reflections without moral scorecards.
10. **PersonalizationAgent**: Applies preferred madhhab nuances and reminder styles.
11. **ScholarEscalationAgent**: Packages sensitive matters into structured triage cases for human scholars.
12. **FamilyAgent**: Coordinates shared family journeys while maintaining strict reflection privacy.
13. **CitationAuditor & ResponseFinalizer**: Verifies claim citations against primary passages before authorizing response publication.

---

## 3. Data Isolation Architecture

To ensure religious behavior remains private, user data is decoupled from the Islamic Knowledge Graph:
- **Islamic Evidence Graph**: Immutable, public, scholarly verified corpus.
- **Personal Context Layer**: Client-scoped, encrypted, auditable, and subject to user erasure.
- **Family Graph**: Permissions domain ensuring adult personal notes and reflections are strictly isolated from other household members.
