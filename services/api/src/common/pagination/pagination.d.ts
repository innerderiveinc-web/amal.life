/**
 * AMAL OS — LAYER 20: PAGINATION HELPERS (Section 20.1)
 */
export interface PaginationParams {
    page?: number;
    limit?: number;
}
export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare function paginate<T>(items: T[], params?: PaginationParams): PaginatedResult<T>;
//# sourceMappingURL=pagination.d.ts.map