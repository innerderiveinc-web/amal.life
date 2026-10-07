import { db } from '@amal/database';

export class AmalRepository {
  private static amals: Map<string, any> = new Map();

  public static saveAmal(amal: any): void {
    this.amals.set(amal.id, amal);
  }

  public static findById(id: string): any | undefined {
    return this.amals.get(id);
  }

  public static findByUserId(userId: string): any[] {
    return Array.from(this.amals.values()).filter((a) => a.userId === userId);
  }
}
