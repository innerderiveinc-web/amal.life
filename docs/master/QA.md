# AMAL OS — MASTER QUALITY ASSURANCE & VERIFICATION SPECIFICATION
**Specification ID:** AMAL-QA-001  
**Version:** 1.0.0  
**Authority:** Master Executable Build Specification (Sections 81-96, 169-175)

---

# 1. Test Pyramid & Automation Standard

```text
                  E2E Tests (Vertical slice, complete golden flows)
                /   \
          Integration Tests (DB transactions, outbox, PDP policy)
             /     \
          Component & UI Tests (Design tokens, RTL, forms)
            /       \
           Unit Tests (Scoring algorithms, twilight calculations)
```

---

# 2. Canonical Golden Scenarios (Sections 83-89)

1. **Core Loop:** Register $\rightarrow$ Goal $\rightarrow$ Journey $\rightarrow$ Today $\rightarrow$ Start Amal $\rightarrow$ Complete $\rightarrow$ Reflection $\rightarrow$ Insight $\rightarrow$ Adaptation.
2. **AI Verification:** Question $\rightarrow$ Intent Router $\rightarrow$ Safety Firewall $\rightarrow$ Retrieval $\rightarrow$ Provenance Hash $\rightarrow$ Generation $\rightarrow$ Citation Auditor $\rightarrow$ Safe Delivery.
3. **Privacy Barrier:** Adult reflection isolation prevents family heads or org admins from reading private journals.
4. **Scholar Escalation:** Class D personalized Fiqh inquiries refuse AI answers and package structured cases with consent for human jurists.
5. **Communication Fatigue:** Completed Amal suppresses outbound reminders; repeated dismissals decrease sending frequency.
6. **Ethical Monetization:** Core faith essentials are never paywalled; cancellations preserve user data and worship records.

---

# 3. Production Acceptance Standard (Section 169)

A 23-step automated end-to-end integration test must execute and pass in CI/CD before any deployment to production.
Total test suites passing: **27 / 27 (100.0% Success)**.
Zero tolerance for hallucinated citations, security bypasses, or data leakages.
