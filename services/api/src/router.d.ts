import { ApiResponse } from '@amal/types';
export interface RequestContext {
    userId: string;
    userRole: string;
    ip?: string;
}
export declare class ApiRouter {
    static handle(method: string, path: string, body: any, ctx: RequestContext): Promise<ApiResponse<any>>;
}
//# sourceMappingURL=router.d.ts.map