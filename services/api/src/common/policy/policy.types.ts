/**
 * AMAL OS — LAYER 20: POLICY TYPES (Section 20.12)
 */

export interface PolicyRequest {
  actor: {
    userId: string;
    roles: string[];
    accountMode: string;
  };

  action: string;

  resource?: {
    type: string;
    id?: string;
    ownerUserId?: string;
  };

  purpose:
    | 'PRODUCT'
    | 'SAFETY'
    | 'SCHOLAR_REVIEW'
    | 'FAMILY'
    | 'ANALYTICS'
    | 'ADMIN'
    | 'COMPLIANCE'
    | 'REFLECTION'
    | 'RECOMMENDATION';
}
