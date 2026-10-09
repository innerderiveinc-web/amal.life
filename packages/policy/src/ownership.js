"use strict";
/**
 * AMAL OS — LAYER 19: USER OWNERSHIP & PRIVATE RESOURCE GUARDS (Sections 184-185)
 * Strict boundary assertions preventing cross-tenant and inter-family privacy leaks.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertOwner = assertOwner;
exports.assertPrivateResourceAccess = assertPrivateResourceAccess;
const types_1 = require("@amal/types");
function assertOwner(actorId, resourceOwnerId) {
    if (actorId !== resourceOwnerId) {
        throw new types_1.AppError('FORBIDDEN', 'Access denied: Actor is not the owner of this resource.');
    }
}
function assertPrivateResourceAccess(params) {
    // Family head relationship alone MUST NOT satisfy private adult reflection access (Section 185)
    if (params.actorId !== params.resourceOwnerId) {
        throw new types_1.AppError('FORBIDDEN', 'Access denied: Private spiritual reflections are strictly isolated and cannot be viewed by other users or family heads.');
    }
}
//# sourceMappingURL=ownership.js.map