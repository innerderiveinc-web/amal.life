# AMAL OS — ADAPTIVE AMAL ENGINE, MULTI-FRICTION & CAUSAL CAUTION REPORT

**Module:** Adaptive Amal Engine & Friction Relief (V1.5 Edition)  
**Status:** FULLY INTEGRATED & PRODUCTION VERIFIED  
**Governing Principle:** Shame-Free, Non-Punitive Friction Relief & Sustainable Habit Building  
**Verification Date:** October 8, 2026

---

## 1. Pedagogical Objective

Mainstream habit and productivity software frequently relies on punitive mechanisms: broken streaks, alarming shame notifications, guilt induction, or punitive scoring.

AMAL OS rejects this paradigm as spiritually and psychologically counterproductive. In Islamic spirituality (*Tarbiyah*):
> *"Take on only that which you are capable of doing, for Allah does not grow weary until you grow weary. The most beloved of deeds to Allah are those that are most consistent, even if they are small."* (Sahih al-Bukhari 6464, Sahih Muslim 782)

When a seeker experiences friction or misses scheduled amals, the system intervenes **with compassion and adaptation, not judgment or guilt**.

---

## 2. Multi-Friction Detection & Intervention Ranking (V1.5)

A seeker's journey may face simultaneous friction signals:
- **`TIME_SCARCITY`**: Insufficient available time during the day.
- **`COMPLEXITY_OVERLOAD`**: Too many supplementary actions causing cognitive fatigue.
- **`REMINDER_FATIGUE`**: Repeated dismissed notifications.

### Intervention Ranking Engine
Candidates are ranked according to expected feasibility gain, preference fit, reversibility, and risk:
$$\text{Intervention Score} = \frac{\text{FeasibilityGain} \times \text{PreferenceFit} \times \text{Reversibility}}{1 + \text{Risk}}$$

Ranked candidate interventions:
1. `SHORTEN_DURATION`: Reduce target from 15m to 3-5m to protect consistency.
2. `RESCHEDULE_WINDOW`: Shift difficult evening actions to quiet post-Fajr windows.
3. `SIMPLIFY_ACTION`: Focus exclusively on the core Minimum Viable Amal.
4. `REDUCE_FREQUENCY`: Pause notifications for 3 days to eliminate pressure.

---

## 3. Causal Caution in Outcome Evaluation (Section 19)

AMAL OS strictly differentiates correlation from causation in all user-facing adaptation reports:
- **Prohibited Formulation:** *"This adaptation caused your 45% improvement."*
- **Mandated Formulation:** *"Your completion improved after this adjustment (from 20% to 75%)."*

Every outcome record stores:
- `beforeMetrics`: Baseline completion rate and skip counts.
- `afterMetrics`: Post-adaptation completion rate and skip counts.
- `timeWindowDays`: Observation window (default: 14 days).
- `confidence`: Statistical confidence score.

---

## 4. Endpoints & API Contract

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/v1/journeys/:id/adaptations` | `GET` | Returns active adaptation proposals triggered by detected friction. |
| `/api/v1/journeys/:id/adaptation-preview` | `POST` | Comparative preview (Current Plan vs Suggested Plan + Why + Expected Feasibility). |
| `/api/v1/journeys/:id/adaptation-approve` | `POST` | Commits simplified plan and records outcome metrics. |
| `/api/v1/journeys/:id/adaptation-reject` | `POST` | Retains current targets gracefully with zero guilt or streak penalty. |
