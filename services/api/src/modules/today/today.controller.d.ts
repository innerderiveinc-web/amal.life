import { TodayService } from './today.service';
import { TodayResponse } from '@amal/types';
export declare class TodayController {
    private readonly todayService;
    constructor(todayService: TodayService);
    getToday(req: any): Promise<TodayResponse>;
}
//# sourceMappingURL=today.controller.d.ts.map