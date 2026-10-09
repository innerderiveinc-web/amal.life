import { PrivacyService } from './privacy.service.js';
import { AuthenticatedUser } from '../../common/auth/auth.types.js';
export declare class PrivacyController {
    private readonly service;
    constructor(service: PrivacyService);
    requestExport(user: AuthenticatedUser): Promise<import("./privacy.service.js").PrivacyRequestRecord>;
    requestDeletion(user: AuthenticatedUser, body: {
        reason?: string;
    }): Promise<import("./privacy.service.js").PrivacyRequestRecord>;
    getStatus(user: AuthenticatedUser, id: string): Promise<import("./privacy.service.js").PrivacyRequestRecord>;
}
//# sourceMappingURL=privacy.controller.d.ts.map