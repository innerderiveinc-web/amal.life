# AMAL OS — Master Security Architecture & Governance Specification

## 1. Executive Summary & Security Philosophy

AMAL OS operates at the intersection of spiritual life, intimate personal reflection, family coordination, and Islamic jurisprudence. As such, the platform treats **user trust, spiritual privacy, and data sovereignty** as existential requirements. 

Security in AMAL OS is not a peripheral layer; it is an active architectural control plane enforcing three non-negotiable axioms:
1. **Zero-Knowledge Intimacy**: Personal spiritual reflections and private journal entries are encrypted at rest with field-level encryption and are strictly inaccessible to family members, community members, organization administrators, and unauthorized platform operators.
2. **Defensive AI Perimeter**: AI models are bounded by deterministic input sanitizers, multi-layer prompt injection barriers, and post-generation citation/safety firewalls.
3. **Four-Eyes Administrative Governance**: No single individual, operator, or engineer possesses unilateral access to production sensitive data or security-critical configurations.

---

## 2. Compliance Baseline: OWASP MASVS & Application Security

AMAL OS adheres strictly to the **OWASP Mobile Application Security Verification Standard (MASVS v2.0)** and **OWASP Top 10 API Security**:

### 2.1 Storage & Data At Rest (`MASVS-STORAGE`)
- **Field-Level Encryption (FLE)**: Column-level AES-256-GCM encryption with unique key derivation for sensitive fields (`reflections.content`, `journal_entries.body`, `user_private_context.values`).
- **Mobile Hardware Enclaves**: iOS Keychain (`kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`) and Android Keystore (`KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT`) store user session tokens and decryption key fragments.
- **Prohibition of Plaintext Storage**: `AsyncStorage`, `localStorage`, unencrypted SQLite, and web cookies are strictly prohibited from storing authentication tokens, PII, or reflection content.

### 2.2 Cryptography (`MASVS-CRYPTO`)
- Standardized primitives: AES-GCM-256 with 96-bit random IVs and 128-bit authentication tags.
- Transport security: Strict TLS 1.3 only, disabling legacy ciphers (TLS 1.0/1.1/1.2 CBC suites rejected).
- Key Management: Cloud KMS (AWS KMS / GCP Cloud KMS / HashiCorp Vault) with automated annual rotation and envelope encryption.

### 2.3 Network Communication (`MASVS-NETWORK`)
- **Mobile Certificate Pinning**: SHA-256 SPKI pinning implemented for API endpoints on mobile release builds, with graceful fallback to backup pins.
- **Strict Transport Security (HSTS)**: `max-age=63072000; includeSubDomains; preload`.
- **CORS & Headers**: Strict origin whitelist, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Content-Security-Policy: default-src 'self'`.

---

## 3. Server Authorization Architecture: RBAC & ABAC

Authorization is enforced deterministically by a centralized Policy Decision Point (`PDP`) executing within the NestJS middleware and guard pipeline:

```text
HTTP / RPC Request
       ↓
JWT / Session Guard (Authentication)
       ↓
PolicyEnforcementGuard (PDP)
       ├── Check Role (RBAC)
       ├── Check Context / Attributes (ABAC: Ownership, Household, Consent)
       └── Check Domain Invariants (e.g. INV_03 Reflection Vault)
       ↓
Application Service Handler
```

### 3.1 Role Hierarchy Matrix
| Role | Level | Permitted Scope | Constraints |
| :--- | :---: | :--- | :--- |
| `USER` | 1 | Self-owned records, public Quran/Hadith, joined goals | Cannot inspect other users' records |
| `FAMILY_ADMIN` | 2 | Household settings, child goal assignment, shared journeys | **Strictly 0 access to adult reflections** |
| `SCHOLAR` | 3 | Triage cases assigned to scholar with active user consent | Read-only to case context; cannot view user identity if anonymized |
| `SCHOLAR_REVIEWER`| 4 | Disputed fatwa audit, scholar credential verification | Multi-scholar consensus required for revocations |
| `CONTENT_EDITOR` | 3 | Draft evidence, transliterations, translations | Cannot mark evidence `PUBLISHED` without scholar sign-off |
| `CONTENT_REVIEWER`| 4 | Canonical metadata verification, grading checks | Signs cryptographic verification digest |
| `ADMIN` | 5 | Platform metrics, worker queues, rate limit configuration | Anonymized telemetry only; zero DB browsing |
| `SUPER_ADMIN` | 6 | Break-glass orchestration, KMS rotation, security audit | Requires **Four-Eyes** dual authorization |

---

## 4. Four-Eyes Break-Glass Protocol

To eliminate insider threat and unilateral operator misuse, access to production databases or administrative overrides requires the **Four-Eyes Break-Glass Procedure**:

```text
Operator 1 requests Break-Glass
         ↓
Webhook dispatched to Security Officer channel + PagerDuty
         ↓
Operator 2 (Super Admin) authenticates with WebAuthn/Passkey & signs approval
         ↓
KMS decrypts temporary 15-minute credential pair
         ↓
Audit Log records: [Operator 1, Operator 2, Purpose, Session ID, Timestamp]
         ↓
Session automatically revoked after 900 seconds
```

### 4.1 Technical Invariants
1. `INV_SEC_01`: No single credential can access production read/write credentials without a cryptographic signature from a second distinct Super Admin.
2. `INV_SEC_02`: All actions executed during a break-glass session are streamed directly to an append-only, tamper-evident log group backed by write-once-read-many (WORM) storage.
3. `INV_SEC_03`: Any session exceeding 15 minutes is terminated abruptly via automated credential revocation.

---

## 5. Anti-Exfiltration & Context Privacy Firewall

When personal context is leveraged to enrich AI prompts (e.g., in the Amal Life Coach or Reflection Companion), data exfiltration to external LLM providers is prevented by the **Context Privacy Firewall**:

```text
User Request + Private Reflections
         ↓
Context Privacy Firewall
   ├── 1. PII Redaction (Names, emails, phone numbers, exact addresses replaced with tokens)
   ├── 2. Adult Reflection Vault Sanitizer (Reflections filtered strictly to current semantic topic)
   ├── 3. Epistemic Tagging (Inject non-bypassable system constraints)
         ↓
Sanitized LLM Prompt
         ↓
External AI Engine (e.g., Claude, GPT-4, Llama)
         ↓
Output Sanitizer (Verify no canary leakage, verify citation hashes)
         ↓
Client Delivery
```

### 5.1 Defense Invariants
- `INV_SEC_04`: Raw unredacted reflection text is never transmitted to third-party model inference providers without field-level masking or synthetic pseudonymization.
- `INV_SEC_05`: Embedded Canary Tokens are randomly seeded in prompt contexts to detect any potential data regurgitation or training extraction attacks.

---

## 6. Prompt Injection & AI Red-Team Defenses

AMAL OS implements multi-tiered guardrails against adversarial prompt manipulation:

1. **Delimiter Encapsulation & Structural Framing**: All user inputs and retrieved context are encapsulated inside strict XML/JSON delimiters with parser-enforced boundary checks.
2. **System Prompt Extraction Resistance**: Prompts are structurally isolated; system directives instruct models to treat any instruction within user tags requesting system instructions as unverified text data.
3. **Fatwa Firewall (Classes A–E)**:
   - Any adversarial prompt attempting to force the AI to issue an authoritative Islamic legal ruling (*Fatwa*), declare something halal/haram definitively, or roleplay as a Mufti is intercepted by the deterministic regex/AST scanner and rejected before LLM invocation.
4. **Adversarial Benchmark & Regression Suite**: The test suite `test/redteam/redteam-runner.ts` tests 100+ prompt injection patterns across 4 adversarial vectors:
   - *Mufti Roleplay Attack*
   - *Fake Hadith Generation Exploit*
   - *System Prompt Leakage Attack*
   - *Delimiter Escape & Execution Inject*

---

## 7. Rate Limiting, DDoS & WAF Rules

- **Distributed Rate Limiting**: Managed via Redis sliding-window token buckets.
  - Public endpoints (`/api/v1/auth/*`): 10 requests / minute per IP.
  - Standard authenticated endpoints: 120 requests / minute per user ID.
  - AI Orchestration (`/api/v1/ai/*`): 15 requests / minute per user ID.
- **WAF Layer (Cloudflare / AWS WAF)**:
  - Geo-blocking according to compliance profiles.
  - Automated OWASP Core Rule Set (CRS) inspection.
  - Heuristic bot mitigation with invisible Turnstile validation on authentication flows.
