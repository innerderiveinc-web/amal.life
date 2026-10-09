export interface DeduplicationCheckResult {
    isDuplicate: boolean;
    hasConflict: boolean;
    conflictDetails?: string;
}
export declare class DeduplicationService {
    private static seenHashes;
    private static referenceTextMap;
    static check(reference: string, normalizedText: string): DeduplicationCheckResult;
}
//# sourceMappingURL=deduplication-service.d.ts.map