import http from 'http';
import { ApiRouter, RequestContext } from './router.js';
import { config } from '@amal/config';

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
      if (method === 'GET') {
        body = Object.fromEntries(url.searchParams.entries());
      } else if (method === 'POST' || method === 'PUT') {
        try {
          const buffers = [];
          for await (const chunk of req) {
            buffers.push(chunk);
          }
          const raw = Buffer.concat(buffers).toString('utf-8');
          if (raw) {
            body = JSON.parse(raw);
          }
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: { code: 'INVALID_JSON', message: 'Malformed JSON payload.' } }));
          return;
        }
      }

      // Simulated authenticated user context
      const authHeader = req.headers.authorization;
      const ctx: RequestContext = {
        userId: authHeader ? authHeader.replace('Bearer ', '').trim() : 'usr-default-ahmad',
        userRole: 'USER',
        ip: req.socket.remoteAddress,
      };

      const response = await ApiRouter.handle(method, path, body, ctx);
      res.writeHead(response.success ? 200 : 404);
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
