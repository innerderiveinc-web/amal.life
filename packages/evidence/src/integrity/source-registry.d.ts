import { SourceAuthorityDimensions, VerificationLevel } from '@amal/types';
export interface RegisteredSource {
    id: string;
    sourceType: string;
    title: string;
    author: string;
    publisher?: string;
    edition?: string;
    publicationYear?: number;
    digitalArtifactHash: string;
    authorityDimensions: SourceAuthorityDimensions;
    verificationLevel: VerificationLevel;
    locked: boolean;
    version: number;
    createdAt: string;
    updatedAt: string;
}
export declare class SourceRegistry {
    private static sources;
    /**
     * Register a new canonical or candidate Islamic source
     */
    static registerSource(data: {
        id: string;
        sourceType: string;
        title: string;
        author: string;
        publisher?: string;
        edition?: string;
        publicationYear?: number;
        rawArtifactContent?: Buffer | string;
        authorityDimensions?: Partial<SourceAuthorityDimensions>;
    }): RegisteredSource;
    static getSource(id: string): RegisteredSource | undefined;
    static getAllSources(): RegisteredSource[];
    /**
     * Check if a source meets production publication requirements
     */
    static isProductionEligible(sourceId: string): boolean;
    /**
     * Invariant: Locked published sources cannot be modified without new version
     */
    static updateSource(id: string, updates: Partial<RegisteredSource>): RegisteredSource;
    static clear(): void;
}
//# sourceMappingURL=source-registry.d.ts.map