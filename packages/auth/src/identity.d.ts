/**
 * AMAL OS — LAYER 19: IDENTITY VERIFICATION (Section 23)
 */
import { User } from '@amal/types';
export declare class IdentityProvider {
    findByEmail(email: string): Promise<User | null>;
    verifyCredentials(email: string, _password?: string): Promise<User | null>;
}
export declare const identityProvider: IdentityProvider;
//# sourceMappingURL=identity.d.ts.map