/**
 * AMAL OS — LAYER 20: REQUEST ID MIDDLEWARE (Section 20.8)
 * Assigns or propagates x-request-id for end-to-end request tracing.
 */

import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const incomingId = (req.headers['x-request-id'] || req.headers['X-Request-Id']) as string | undefined;
  const requestId = incomingId || `req_${randomUUID()}`;

  req.headers['x-request-id'] = requestId;
  (req as Request & { requestId?: string }).requestId = requestId;

  res.setHeader('x-request-id', requestId);
  next();
}
