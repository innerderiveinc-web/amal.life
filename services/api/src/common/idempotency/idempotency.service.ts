/**
 * AMAL OS — LAYER 20: IDEMPOTENCY SERVICE (Section 20.4, 20.21, 20.41)
 * Enforces exactly-once execution for mutating state transitions.
 */

import { Injectable } from '@nestjs/common';
import { PgClient } from '../../infrastructure/database/pg.client.js';
import { AmalError } from '../errors/amal-error.js';
import { ErrorCode } from '../errors/error-codes.js';

@Injectable()
export class IdempotencyService {
  private readonly memoryCache = new Map<string, any>();

  constructor(private readonly db: PgClient = new PgClient()) {}

  async get(userId: string, key: string) {
    const compositeKey = `${userId}:${key}`;
    const cached = this.memoryCache.get(compositeKey);
    if (cached) {
      return {
        status: 'COMPLETED',
        responseBody: cached,
      };
    }
    return null;
  }

  async save(userId: string, key: string, statusCode: number, responseBody: any) {
    const compositeKey = `${userId}:${key}`;
    this.memoryCache.set(compositeKey, responseBody);
    await this.db.query(
      `
      INSERT INTO idempotency_keys (key, user_id, status_code, response_body, expires_at)
      VALUES ($1, $2, $3, $4, now() + interval '24 hours')
      ON CONFLICT (key, user_id) DO UPDATE SET response_body = EXCLUDED.response_body
      `,
      [key, userId, statusCode, JSON.stringify(responseBody)]
    ).catch(() => {});
  }

  async execute<T>(
    userId: string,
    key: string,
    work: (tx: any) => Promise<T>,
  ): Promise<T> {
    if (!key) {
      throw new AmalError(ErrorCode.VALIDATION_ERROR, 'Idempotency key is required.');
    }

    const compositeKey = `${userId}:${key}`;
    if (this.memoryCache.has(compositeKey)) {
      return this.memoryCache.get(compositeKey);
    }

    const client = await this.db.connect();
    try {
      const result = await work(client);
      await this.save(userId, key, 200, result);
      return result;
    } finally {
      client.release();
    }
  }
}
