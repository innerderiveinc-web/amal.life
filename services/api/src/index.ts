import http from 'http';
import { ApiRouter, RequestContext } from './router.js';
import { config } from '@amal/config';
import { JwtService } from './common/auth/jwt.service.js';

export class AmalApiServer {
  private server: http.Server;

  constructor() {
    this.server = http.createServer(async (req, res) => {
      // CORS & Security Headers (OWASP MASVS alignment)
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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

      // Authenticated user context (Cryptographically verified JWT token)
      const authHeader = req.headers.authorization;
      let userId = '';
      let userRole: 'USER' | 'SCHOLAR' | 'ADMIN' | 'ANONYMOUS' = 'ANONYMOUS';

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7).trim();
        if (token) {
          const verified = JwtService.verifyToken(token);
          if (verified) {
            userId = verified.sub;
            userRole = (verified.role as any) || 'USER';
          }
        }
      }

      const ctx: RequestContext = {
        userId,
        userRole,
        ip: req.socket.remoteAddress,
      };

      const response = await ApiRouter.handle(method, path, body, ctx);
      
      let statusCode = 200;
      if (!response.success) {
        const code = response.error?.code;
        if (code === 'ROUTE_NOT_FOUND') statusCode = 404;
        else if (code === 'UNAUTHORIZED') statusCode = 401;
        else if (code === 'FORBIDDEN') statusCode = 403;
        else if (code === 'VALIDATION_ERROR' || code === 'INVALID_JSON') statusCode = 400;
        else if (code === 'PAYLOAD_TOO_LARGE') statusCode = 413;
        else statusCode = 500;
      }

      res.writeHead(statusCode);
      res.end(JSON.stringify(response));
    });
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
}
