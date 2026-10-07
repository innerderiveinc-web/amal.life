# Runbook: Wrong Translation Incident

## Severity: HIGH
**Incident Trigger:** An inaccurate, corrupted, or unvetted translation has been published or presented as canonical.

### Detection
- Editorial QA flags semantic drift from canonical Arabic text.
- User or scholar reports mistranslation via dispute queue (`TRANSLATION_ISSUE`).
- Translation hash discrepancy against vetted publisher edition.

### Action Plan
1. **Quarantine Affected Translation:**
   ```sql
   UPDATE quran_translations 
   SET review_status = 'RETIRED' 
   WHERE id = 'TRANSLATION_UUID';
   ```
2. **Fallback to Primary Approved Translation:**
   - Fall back to the verified secondary translation (e.g. Hilali-Khan, Sahih International, or Pickthall).
   - In multilingual contexts (Urdu/Hindi), fall back to vetted Jalandhari or Farooq translations.
3. **Notify Knowledge Operations Board:**
   - File ticket for editorial re-verification.
   - Tag all AI responses that cited this translation within the last 30 days.
