"use strict";
/**
 * AMAL OS — LAYER 20: PAGINATION HELPERS (Section 20.1)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
function paginate(items, params = {}) {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 20));
    const offset = (page - 1) * limit;
    const paginatedItems = items.slice(offset, offset + limit);
    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    return {
        items: paginatedItems,
        total,
        page,
        limit,
        totalPages,
    };
}
//# sourceMappingURL=pagination.js.map