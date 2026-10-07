/**
 * AMAL OS — LAYER 20: TRANSACTION WRAPPER (Section 20.7)
 */

export async function withTransaction<T>(
  client: any,
  work: (tx: any) => Promise<T>,
): Promise<T> {
  await client.query('BEGIN');

  try {
    const result = await work(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}
