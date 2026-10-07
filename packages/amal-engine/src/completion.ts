export type AmalCompletionType = 'FULL' | 'PARTIAL' | 'MINIMUM' | 'SKIPPED';

export interface AmalCompletionInput {
  amalId: string;
  userId: string;
  plannedMinutes: number;
  actualSeconds: number;
  idempotencyKey: string;
}

export class AmalCompletionEngine {
  private static recordedKeys: Set<string> = new Set();

  public static record(input: AmalCompletionInput): {
    completionType: AmalCompletionType;
    durationSeconds: number;
    recorded: boolean;
    duplicate: boolean;
  } {
    if (this.recordedKeys.has(input.idempotencyKey)) {
      return {
        completionType: 'FULL',
        durationSeconds: input.actualSeconds,
        recorded: true,
        duplicate: true,
      };
    }

    this.recordedKeys.add(input.idempotencyKey);
    const actualMinutes = Math.floor(input.actualSeconds / 60);

    let completionType: AmalCompletionType = 'FULL';
    if (actualMinutes === 0) {
      completionType = 'SKIPPED';
    } else if (actualMinutes < 3) {
      completionType = 'MINIMUM';
    } else if (actualMinutes < input.plannedMinutes) {
      completionType = 'PARTIAL';
    }

    return {
      completionType,
      durationSeconds: input.actualSeconds,
      recorded: true,
      duplicate: false,
    };
  }
}
