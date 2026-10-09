/**
 * AMAL OS — LAYER 19: AUTH DOMAIN TYPES (Section 23)
 */
import { User, UserId } from '@amal/types';
export interface Session {
    id: string;
    userId: UserId;
    token: string;
    refreshToken: string;
    expiresAt: string;
    revoked: boolean;
    createdAt: string;
}
export interface AuthResult {
    user: User;
    session: Session;
}
//# sourceMappingURL=auth.types.d.ts.map