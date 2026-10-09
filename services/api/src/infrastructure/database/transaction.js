"use strict";
/**
 * AMAL OS — LAYER 20: TRANSACTION WRAPPER (Section 20.7)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTransaction = withTransaction;
async function withTransaction(client, work) {
    await client.query('BEGIN');
    try {
        const result = await work(client);
        await client.query('COMMIT');
        return result;
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
}
//# sourceMappingURL=transaction.js.map