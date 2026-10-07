# AMAL OS — Security Architecture & Baseline

## 1. Compliance Baseline: OWASP MASVS

AMAL OS enforces security controls aligned with the **OWASP Mobile Application Security Verification Standard (MASVS)**:

- **MASVS-STORAGE**: Sensitive religious behavior, personal reflections, and authentication tokens are encrypted at rest. On mobile devices, credentials leverage iOS Keychain and Android Keystore. Plaintext local storage (`AsyncStorage`/`localStorage`) is prohibited for sensitive tokens.
- **MASVS-CRYPTO**: Standardized cryptographic primitives (AES-GCM-256 for field-level encryption, TLS 1.3 for in-transit communication).
- **MASVS-AUTH**: Passkey-first authentication with OIDC/OAuth2 fallback. Role-based access control (RBAC) is strictly enforced on the server.
- **MASVS-NETWORK**: Certificate pinning on mobile production binaries, strict CORS origins, and OWASP security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`).
- **MASVS-PLATFORM**: Root and jailbreak detection heuristics, screenshot privacy masking on reflection views.

---

## 2. Server Authorization Matrix (RBAC)

The system implements 8 distinct roles:
1. `USER`: Standard consumer; access restricted strictly to own records.
2. `FAMILY_ADMIN`: Household creator; manages family memberships and shared goals; zero access to adult reflections.
3. `SCHOLAR`: Verified jurist; access limited strictly to assigned triage cases with explicit user consent.
4. `SCHOLAR_REVIEWER`: Senior scholar; oversees scholar credentialing and disputed case audits.
5. `CONTENT_EDITOR`: Ingests and normalizes Islamic sources; cannot publish without scholar sign-off.
6. `CONTENT_REVIEWER`: Validates translation provenance, grading metadata, and edge mappings.
7. `ADMIN`: System operational administration and anonymized telemetry review.
8. `SUPER_ADMIN`: Security officer; root operations, key rotation, and compliance auditing.

---

## 3. Cryptographic Secret Management

- Secrets are injected strictly via container environment variables or cloud secret managers.
- Zero client-side exposure of third-party AI keys or administrative credentials.
- All database backups are encrypted with KMS-managed customer keys.
