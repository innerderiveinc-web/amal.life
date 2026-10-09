/**
 * AMAL OS — LAYER 20: IDEMPOTENCY SERVICE (Section 20.4, 20.21, 20.41)
 * Enforces exactly-once execution for mutating state transitions.
 */
import { PgClient } from '../../infrastructure/database/pg.client.js';
export declare class IdempotencyService {
    private readonly db;
    private readonly memoryCache;
    constructor(db?: PgClient);
    get(userId: string, key: string): Promise<{
        status: string;
        responseBody: any;
    } | null>;
    save(userId: string, key: string, statusCode: number, responseBody: any): Promise<void>;
    execute<T>(userId: string, key: string, work: (tx: any) => Promise<T>): Promise<T>;
}
//# sourceMappingURL=idempotency.service.d.ts.map