/**
 * AMAL OS — LAYER 20: CRYPTOGRAPHIC JWT & CREDENTIAL SERVICE
 * Zero-dependency HMAC-SHA256 JWT signer and PBKDF2/scrypt credential verifier.
 * Strictly enforces token signature verification, expiration, and password security.
 */

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const JWT_SECRET = process.env.AMAL_JWT_SECRET || 'amal-secure-jwt-secret-key-prod-2026';
const ISSUER = 'amal.life';
const AUDIENCE = 'amal.os';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  sessionId?: string;
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

export class JwtService {
  /**
   * Hashes a password using scrypt with a unique cryptographically random salt.
   */
  public static hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  /**
   * Verifies a plain text password against a stored salt:hash string using constant-time comparison.
   */
  public static verifyPassword(password: string, storedHash: string): boolean {
    try {
      const [salt, key] = storedHash.split(':');
      if (!salt || !key) return false;
      const keyBuffer = Buffer.from(key, 'hex');
      const derivedKey = scryptSync(password, salt, 64);
      return timingSafeEqual(keyBuffer, derivedKey);
    } catch {
      return false;
    }
  }

  /**
   * Generates a signed JWT with standard claims and expiration (default 3600 seconds = 1 hr).
   */
  public static signToken(
    userId: string,
    email: string,
    role: string = 'USER',
    expiresInSeconds: number = 3600,
    sessionId?: string,
  ): string {
    const now = Math.floor(Date.now() / 1000);
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };
    const payload: JwtPayload = {
      sub: userId,
      email,
      role,
      iat: now,
      exp: now + expiresInSeconds,
      iss: ISSUER,
      aud: AUDIENCE,
      sessionId,
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const signature = createHmac('sha256', JWT_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Cryptographically verifies a JWT signature and checks expiration.
   * Returns decoded payload if valid; returns null if invalid, tampered, or expired.
   */
  public static verifyToken(token: string): JwtPayload | null {
    if (!token || typeof token !== 'string') return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;

    try {
      // 1. Verify cryptographic signature
      const expectedSignature = createHmac('sha256', JWT_SECRET)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

      const sigBuffer = Buffer.from(signature);
      const expectedBuffer = Buffer.from(expectedSignature);

      if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
        return null;
      }

      // 2. Decode payload and check expiration
      const payload: JwtPayload = JSON.parse(base64UrlDecode(encodedPayload));
      const now = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < now) {
        return null; // Expired token
      }

      if (payload.iss !== ISSUER || payload.aud !== AUDIENCE) {
        return null; // Invalid issuer / audience
      }

      return payload;
    } catch {
      return null;
    }
  }
}
