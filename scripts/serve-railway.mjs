/**
 * AMAL OS — Production Railway Runtime Server
 * Supports both Web App static export & API service dynamically based on SERVICE env var.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const targetService = (process.env.SERVICE || process.env.RAILWAY_SERVICE_NAME || 'web').toLowerCase();
const port = parseInt(process.env.PORT || (targetService.includes('api') ? '4000' : '3000'), 10);

if (targetService.includes('api')) {
  console.log(`[Railway] Starting AMAL OS API Service on port ${port}...`);
  process.env.PORT = String(port);
  const apiPath = path.join(rootDir, 'services/api/dist/index.js');
  if (fs.existsSync(apiPath)) {
    await import(apiPath);
  } else {
    console.error(`[Railway Error] API dist not found at ${apiPath}. Please ensure build ran first.`);
    process.exit(1);
  }
} else {
  // Web Application Server (Serving apps/web/out)
  const webOutDir = path.join(rootDir, 'apps/web/out');

  const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.txt': 'text/plain; charset=utf-8',
    '.mp3': 'audio/mpeg',
  };

  const server = http.createServer((req, res) => {
    // Healthcheck endpoint for Railway
    if (req.url === '/health' || req.url === '/healthz') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', service: 'amal-web', uptime: process.uptime() }));
      return;
    }

    const safeUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    let reqPath = decodeURIComponent(safeUrl.pathname);

    let filePath = path.join(webOutDir, reqPath);

    // If directory or no extension, check for exact html or index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (!fs.existsSync(filePath)) {
      if (fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      }
    }

    // Serve file if found
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      const headers = {
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
      };

      // Immutable cache for Next.js static chunks
      if (reqPath.startsWith('/_next/static/')) {
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
      } else {
        headers['Cache-Control'] = 'public, max-age=0, must-revalidate';
      }

      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // Fallback to 404 or index.html
    const notFoundPath = path.join(webOutDir, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFoundPath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`[Railway] AMAL OS Web App running on http://0.0.0.0:${port}`);
    console.log(`[Railway] Serving files from: ${webOutDir}`);
  });
}
