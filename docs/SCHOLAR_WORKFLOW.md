# AMAL OS — Scholar Escalation & Pastoral Workflow

## 1. Scholar Network Onboarding

Scholars are credentialed human partners in the AMAL ecosystem. The onboarding workflow requires:

```text
Application
  ↓
Identity Verification
  ↓
Academic Credentials (Al-Azhar, Madinah, Darul Uloom, Islamic University)
  ↓
Specialization (Fiqh, Marriage/Family, Youth, Contemporary Ethics)
  ↓
Madhhab Orientation
  ↓
Human Board Review
  ↓
Approved Scholar Account
```

---

## 2. Escalation Workflow

When a sensitive personal situation triggers Class D (*Personalized Fiqh Ruling*):

1. **AI Interception**: The AI stops and explains that a personalized ruling requires qualified human scholarship.
2. **User Consent**: The user is asked for explicit permission to escalate the inquiry.
3. **Structured Case Packaging**: The system compiles a `ScholarCase` object:
   ```json
   {
     "case_id": "case-8102",
     "user_question": "...",
     "sanitized_context": "...",
     "detected_fiqh_issue": "...",
     "relevant_sources": [],
     "urgency": "NORMAL | HIGH",
     "user_consent": true
   }
   ```
4. **Scholar Review**: The assigned scholar reviews the inquiry in the web-first **Scholar Portal** (`/apps/scholar`).
5. **Direct Authoritative Response**: The scholar types and submits their determination.
6. **Integrity Rule**: **The AI never alters, edits, or paraphrases the scholar's substantive answer.** It is delivered directly to the user.
