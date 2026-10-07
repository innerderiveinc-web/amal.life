/**
 * AMAL OS — LAYER 19: LOG REDACTION RUNTIME (Section 149)
 * Sanitizes structured log payloads to prevent PII and security secret leaks.
 */

const REDACTED_KEYS = new Set([
  'password',
  'token',
  'access_token',
  'refresh_token',
  'authorization',
  'private_reflection',
  'reflection_text',
  'freeText',
  'secret',
  'apiKey',
  'api_key',
]);

export function redactSensitiveData<T = any>(data: T): T {
  if (!data || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => redactSensitiveData(item)) as unknown as T;
  }

  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (REDACTED_KEYS.has(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = redactSensitiveData(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}
