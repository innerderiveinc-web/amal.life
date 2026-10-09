"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmalApiServer = void 0;
const http_1 = __importDefault(require("http"));
const router_js_1 = require("./router.js");
const config_1 = require("@amal/config");
class AmalApiServer {
    server;
    constructor() {
        this.server = http_1.default.createServer(async (req, res) => {
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
            // Read JSON body if available
            let body = {};
            if (method === 'POST' || method === 'PUT') {
                try {
                    const buffers = [];
                    for await (const chunk of req) {
                        buffers.push(chunk);
                    }
                    const raw = Buffer.concat(buffers).toString('utf-8');
                    if (raw) {
                        body = JSON.parse(raw);
                    }
                }
                catch (e) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ success: false, error: { code: 'INVALID_JSON', message: 'Malformed JSON payload.' } }));
                    return;
                }
            }
            // Simulated authenticated user context
            const authHeader = req.headers.authorization;
            const ctx = {
                userId: authHeader ? authHeader.replace('Bearer ', '').trim() : 'usr-default-ahmad',
                userRole: 'USER',
                ip: req.socket.remoteAddress,
            };
            const response = await router_js_1.ApiRouter.handle(method, path, body, ctx);
            res.writeHead(response.success ? 200 : 404);
            res.end(JSON.stringify(response));
        });
    }
    listen(port = config_1.config.port) {
        return new Promise((resolve) => {
            this.server.listen(port, () => {
                console.log(`[Amal OS V1] API Service running on http://localhost:${port}`);
                resolve();
            });
        });
    }
    close() {
        return new Promise((resolve) => {
            this.server.close(() => resolve());
        });
    }
}
exports.AmalApiServer = AmalApiServer;
__exportStar(require("./router.js"), exports);
__exportStar(require("./prayer-service.js"), exports);
if (process.env.NODE_ENV !== 'test') {
    const apiServer = new AmalApiServer();
    apiServer.listen();
}
//# sourceMappingURL=index.js.map