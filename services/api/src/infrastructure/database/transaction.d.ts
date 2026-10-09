/**
 * AMAL OS — LAYER 20: TRANSACTION WRAPPER (Section 20.7)
 */
export declare function withTransaction<T>(client: any, work: (tx: any) => Promise<T>): Promise<T>;
//# sourceMappingURL=transaction.d.ts.map