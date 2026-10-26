import http from 'http';
import { ApiRouter, RequestContext } from './router.js';
import { config } from '@amal/config';
import { JwtService } from './common/auth/jwt.service.js';
import { persistSnapshot } from '@amal/database';

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export class AmalApiServer {
  private server: http.Server;
  private rateLimitMap: Map<string, RateLimitBucket> = new Map();
  private readonly RATE_LIMIT_MAX = 180; // max requests per minute per IP
  private readonly RATE_LIMIT_WINDOW_MS = 60 * 1000;

  constructor() {
    this.server = http.createServer(async (req, res) => {
      const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '127.0.0.1';

      // 1. IP RATE LIMITER GATE
      const now = Date.now();
      let bucket = this.rateLimitMap.get(clientIp);
      if (!bucket || now > bucket.resetAt) {
        bucket = { count: 1, resetAt: now + this.RATE_LIMIT_WINDOW_MS };
        this.rateLimitMap.set(clientIp, bucket);
      } else {
        bucket.count++;
      }

      const remaining = Math.max(0, this.RATE_LIMIT_MAX - bucket.count);
      res.setHeader('X-RateLimit-Limit', String(this.RATE_LIMIT_MAX));
      res.setHeader('X-RateLimit-Remaining', String(remaining));

      if (bucket.count > this.RATE_LIMIT_MAX) {
        res.setHeader('Retry-After', String(Math.ceil((bucket.resetAt - now) / 1000)));
        res.writeHead(429, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please slow down to maintain service availability.',
            retryable: true,
          },
        }));
        return;
      }

      // 2. CORS & Security Headers (OWASP MASVS alignment)
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('Content-Type', 'application/json');

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
      const path = url.pathname;
      const method = req.method || 'GET';

      // Read JSON body if available, or parse query params for GET
      let body: any = {};
      const MAX_BODY_SIZE = 5 * 1024 * 1024; // 5 MB payload protection
      let totalReceived = 0;

      if (method === 'GET') {
        body = Object.fromEntries(url.searchParams.entries());
      } else if (method === 'POST' || method === 'PUT') {
        try {
          const buffers = [];
          for await (const chunk of req) {
            totalReceived += chunk.length;
            if (totalReceived > MAX_BODY_SIZE) {
              res.writeHead(413, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: { code: 'PAYLOAD_TOO_LARGE', message: 'Payload exceeds 5MB size limit.' } }));
              return;
            }
            buffers.push(chunk);
          }
          const raw = Buffer.concat(buffers).toString('utf-8');
          if (raw) {
            body = JSON.parse(raw);
          }
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: { code: 'INVALID_JSON', message: 'Malformed JSON payload.' } }));
          return;
        }
      }

      // 3. Authenticated user context (Dual Bearer Header + Cookie extraction)
      const authHeader = req.headers.authorization;
      const cookieHeader = req.headers.cookie;
      let token = '';

      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7).trim();
      } else if (cookieHeader) {
        const match = cookieHeader.split(';').map((c) => c.trim()).find((c) => c.startsWith('amal_token='));
        if (match) {
          token = match.split('=')[1]?.trim() || '';
        }
      }

      let userId = '';
      let userRole: 'USER' | 'SCHOLAR' | 'ADMIN' | 'ANONYMOUS' = 'ANONYMOUS';

      if (token) {
        const verified = JwtService.verifyToken(token);
        if (verified) {
          userId = verified.sub;
          userRole = (verified.role as 'USER' | 'SCHOLAR' | 'ADMIN') || 'USER';
        }
      }

      const ctx: RequestContext = {
        userId,
        userRole,
        ip: clientIp,
      };

      const response = await ApiRouter.handle(method, path, body, ctx);

      // If login/register succeeds, set a secure SameSite cookie
      const authData = response.data as { session?: { token?: string } } | undefined;
      if (response.success && (path === '/api/v1/auth/login' || path === '/api/v1/auth/register') && authData?.session?.token) {
        const sessionToken = authData.session.token;
        res.setHeader('Set-Cookie', `amal_token=${sessionToken}; Path=/; SameSite=Strict; HttpOnly; Max-Age=2592000`);
      }
      
      let statusCode = 200;
      if (!response.success) {
        const code = response.error?.code;
        if (code === 'ROUTE_NOT_FOUND') statusCode = 404;
        else if (code === 'UNAUTHORIZED') statusCode = 401;
        else if (code === 'FORBIDDEN') statusCode = 403;
        else if (code === 'VALIDATION_ERROR' || code === 'INVALID_JSON') statusCode = 400;
        else if (code === 'PAYLOAD_TOO_LARGE') statusCode = 413;
        else if (code === 'RATE_LIMIT_EXCEEDED') statusCode = 429;
        else statusCode = 500;
      }

      res.writeHead(statusCode);
      res.end(JSON.stringify(response));
    });

    // Clean up expired rate-limit buckets every 5 minutes to prevent memory leaks
    setInterval(() => {
      const now = Date.now();
      for (const [ip, bucket] of this.rateLimitMap.entries()) {
        if (now > bucket.resetAt) {
          this.rateLimitMap.delete(ip);
        }
      }
    }, 5 * 60 * 1000);
  }

  public listen(port: number = config.port): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(port, () => {
        console.log(`[Amal OS V1] API Service running on http://localhost:${port}`);
        resolve();
      });
    });
  }

  public close(): Promise<void> {
    return new Promise((resolve) => {
      this.server.close(() => resolve());
    });
  }
}

export * from './router.js';
export * from './prayer-service.js';

if (process.env.NODE_ENV !== 'test') {
  const apiServer = new AmalApiServer();
  apiServer.listen();

  // Graceful shutdown durability: Save snapshot to disk before exit
  const handleShutdown = async (signal: string) => {
    console.log(`\n[Amal API Service] Received ${signal}. Persisting database snapshot to disk...`);
    try {
      await persistSnapshot();
      console.log('[Amal API Service] Database snapshot successfully secured.');
    } catch (e) {
      console.warn('[Amal API Service] Warning during shutdown snapshot:', e);
    }
    process.exit(0);
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}
