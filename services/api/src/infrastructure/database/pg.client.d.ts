/**
 * AMAL OS — LAYER 20: POSTGRESQL CLIENT (Section 20.6)
 */
import { OnModuleDestroy } from '@nestjs/common';
export interface MockQueryResult<T = any> {
    rows: T[];
    rowCount: number;
}
export declare class PgClient implements OnModuleDestroy {
    readonly pool: {
        query: <T = any>(text: string, values?: unknown[]) => Promise<MockQueryResult<T>>;
        end: () => Promise<void>;
    };
    query<T = any>(_text: string, _values?: unknown[]): Promise<MockQueryResult<T>>;
    connect(): Promise<any>;
    onModuleDestroy(): Promise<void>;
}
//# sourceMappingURL=pg.client.d.ts.map