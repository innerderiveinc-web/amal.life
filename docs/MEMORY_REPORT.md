# AMAL OS — TIERED MEMORY SYSTEM & DATA GOVERNANCE REPORT

## 1. Overview & Memory Quality Criteria
The AMAL OS Memory System organizes user context into distinct, governed tiers. Every item stored in memory must satisfy strict criteria:
- **Why stored?** To support continuity and feasibility in chosen goals.
- **How learned?** Explicit choice, confirmed insight, or verified activity log.
- **Is it sensitive?** Sensitive items require explicit confirmation and cannot be stored via passive inference.
- **User controls:** Every memory item can be inspected, edited, or permanently deleted.

## 2. Memory Tiering Architecture

| Tier | Category | Persistence | User Visibility | Storage Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **L0** | Session Context | Ephemeral (Session TTL) | Runtime Debug | In-Memory / Redis Cache |
| **L1** | Active Journey | Journey Duration | Journey Dashboard | PostgreSQL `journeys` |
| **L2** | Confirmed Personal Memory | Long-Term (Until deleted) | User Memory Center | PostgreSQL `user_memories` |
| **L3** | Derived Insights | Proactive (Decays over time) | Insights Center | PostgreSQL `user_insights` |

## 3. Right-to-be-Forgotten & Cascading Deletion
- **Cryptographic Purge**: When a user triggers `DELETE /api/v1/memory/:id`, the record is purged immediately from active database tables.
- **Cascading Invalidation**: Deleting a confirmed memory automatically invalidates any downstream derived context signals and resets recommendation weights back to neutral baseline.
- **Exportability**: Users can export their entire memory footprint in portable JSON format via Privacy Center.

## 4. Context Firewall V2
Before any personal memory or context signal is provided to an AI prompt context:
1. **Purpose Filter**: Memory must directly pertain to the specific question topic.
2. **Minimization**: Redacts personal names, private reflection journal texts, and unrelated habits.
3. **Snapshot Isolation**: The resulting minimized payload is passed as a stateless snapshot, preventing the model from writing persistent state directly.
