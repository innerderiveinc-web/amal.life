/**
 * AMAL OS — LAYER 20: AUTHENTICATED USER CONTRACT (Section 20.10)
 */

export interface AuthenticatedUser {
  userId: string;
  sessionId: string;
  accountMode: 'ADULT' | 'YOUNG_USER' | 'CHILD';
  roles: Array<'USER' | 'FAMILY_OWNER' | 'SCHOLAR' | 'ADMIN'>;
}

export interface AuthenticatedRequest {
  user: AuthenticatedUser;
  requestId: string;
  headers: Record<string, string | undefined>;
}
