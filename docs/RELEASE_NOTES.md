# AMAL OS V1 — RELEASE NOTES & CHANGELOG

**Release:** AMAL OS V1 (Controlled Production Ready)  
**Codename:** *Niyyah to Amal*  
**Date:** October 2026

---

## 1. Major Architectural Deliverables

### Core Application & Today OS
- **Canonical Today OS:** Unified daily operating dashboard displaying prayer times, 1 primary action, 0–2 optional actions, active journey progress, and evening Muhasabah prompt.
- **10-State Journey Engine:** Spiritual habit progression state machine ensuring active journeys are pinned to immutable template versions.
- **Adaptive Action Planner:** Daily feasibility scoring based on available minutes, energy, and prayer proximity without streak pressure or moral shaming.

### Islamic Evidence & Epistemic Trust
- **Medina Mushaf Ingestion:** Canonical immutable Arabic text with cryptographic SHA-256 provenance hashes for every ayah.
- **Hadith Collections:** Authentic gradings with preservation of scholarly attribution.
- **Ikhtilāf Plurality:** Classical differences between Hanafi, Shafi'i, Maliki, and Hanbali madhhabs preserved without artificial consensus.
- **Zero-Fabrication Citation Auditor:** Strict validator blocking hallucinated citations.

### Safety, Governance & Scholar Desk
- **5-Tier Fatwa Safety Firewall:** Automated answers for Classes A–C; mandatory human scholar escalation for Class D; crisis intervention for Class E.
- **Verified Scholar Desk:** Case assignment, peer review, two-person rule, and transparent 85/15 fee split with escrow.
- **Adult Reflection Isolation:** Cryptographic and policy separation guaranteeing adult Muhasabah journals are strictly private.

### Communication & Operations
- **Silence First Communication:** Fatigue throttles automatically reduce frequency upon repeated dismissals.
- **Transactional Outbox Worker:** Exponential backoff, lease management, and dead-letter queueing.
- **Multi-Cloud Deployment:** Production Docker multi-stage images, multi-AZ Kubernetes manifests, and Terraform cloud topology.

---

## 2. Invariants Certified
- `INV_01_UNCONDITIONAL_FAITH_ACCESS`: Core faith resources are never paywalled.
- `INV_02_ZERO_FABRICATED_CITATIONS`: Zero fabricated Quranic/Hadith citations tolerated.
- `INV_03_ADULT_REFLECTION_ISOLATION`: Reflections are strictly private to the user.
- `INV_04_TWO_SCHOLAR_RULE`: Sensitive Fiqh cases require two distinct jurists.
- `INV_05_FATIGUE_SILENCE_FIRST`: Notification dismissals reduce frequency.
- `INV_06_NO_BROKEN_STREAKS`: Worship habits never scored with guilt or broken streaks.
- `INV_07_EPISTEMIC_TRANSPARENCY`: 4-quadrant response labeling enforced.
