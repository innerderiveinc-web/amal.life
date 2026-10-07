import { AmalService } from './amal.service.js';

export class AmalController {
  public static handleCreateGoal(body: any, userId: string): any {
    const goal = AmalService.createGoal(userId, body);
    return { success: true, data: goal };
  }

  public static handleCompleteAmal(body: any, userId: string, amalId: string): any {
    const completion = AmalService.completeAmal(
      userId,
      amalId,
      body.actual_duration_minutes ?? 10,
      body.planned_duration_minutes ?? 10,
      body.notes
    );
    return { success: true, data: completion };
  }
}
