"use strict";
/**
 * AMAL OS — LAYER 20: OUTBOX SERVICE (Section 20.14)
 * Transactional atomic event append ensuring zero event-loss.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendOutboxEvent = appendOutboxEvent;
const database_1 = require("@amal/database");
async function appendOutboxEvent(tx, event) {
    // Append to transactional repository
    await database_1.outboxRepository.insert({
        type: event.eventType,
        aggregateType: event.aggregateType,
        aggregateId: event.aggregateId,
        payload: event.payload,
    });
    // Mirror to SQL transaction if supported
    if (tx && typeof tx.query === 'function') {
        await tx.query(`
      INSERT INTO event_outbox (
        id,
        event_type,
        aggregate_type,
        aggregate_id,
        payload,
        attempts,
        status,
        available_at,
        created_at
      )
      VALUES (
        gen_random_uuid(),
        $1,$2,$3,$4,
        0,
        'PENDING',
        now(),
        now()
      )
      `, [
            event.eventType,
            event.aggregateType,
            event.aggregateId,
            JSON.stringify(event.payload),
        ]);
    }
}
//# sourceMappingURL=outbox.service.js.map