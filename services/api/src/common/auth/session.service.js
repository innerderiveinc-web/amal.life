"use strict";
/**
 * AMAL OS — LAYER 20: SESSION SERVICE (Section 20.11)
 * Secure session manager storing SHA-256 hashed refresh tokens.
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const pg_client_js_1 = require("../../infrastructure/database/pg.client.js");
function hash(value) {
    return (0, crypto_1.createHash)('sha256').update(value).digest('hex');
}
let SessionService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SessionService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SessionService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        db;
        inMemorySessions = new Map();
        constructor(db = new pg_client_js_1.PgClient()) {
            this.db = db;
        }
        async create(userId, metadata = {}) {
            const sessionId = (0, crypto_1.randomUUID)();
            const refreshToken = (0, crypto_1.randomBytes)(48).toString('base64url');
            const refreshTokenHash = hash(refreshToken);
            const now = new Date();
            const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
            const record = {
                id: sessionId,
                userId,
                refreshTokenHash,
                deviceId: metadata.deviceId,
                userAgent: metadata.userAgent,
                ipHash: metadata.ipHash,
                expiresAt,
                createdAt: now.toISOString(),
                lastSeenAt: now.toISOString(),
            };
            this.inMemorySessions.set(sessionId, record);
            await this.db.query(`
      INSERT INTO auth_sessions (
        id,
        user_id,
        refresh_token_hash,
        device_id,
        user_agent,
        ip_hash,
        expires_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,now() + interval '30 days')
      `, [
                sessionId,
                userId,
                refreshTokenHash,
                metadata.deviceId ?? null,
                metadata.userAgent ?? null,
                metadata.ipHash ?? null,
            ]);
            return {
                sessionId,
                refreshToken,
            };
        }
        async createSession(userId, metadata = {}) {
            return this.create(userId, metadata);
        }
        async refreshSession(sessionId, refreshToken) {
            const session = await this.findActive(sessionId);
            if (!session || session.refreshTokenHash !== hash(refreshToken)) {
                throw new Error('Invalid refresh token');
            }
            await this.revoke(sessionId);
            return this.create(session.userId);
        }
        async revoke(sessionId) {
            const session = this.inMemorySessions.get(sessionId);
            if (session) {
                session.revokedAt = new Date().toISOString();
            }
            await this.db.query(`
      UPDATE auth_sessions
      SET revoked_at = now()
      WHERE id = $1
      `, [sessionId]);
        }
        async findActive(sessionId) {
            const session = this.inMemorySessions.get(sessionId);
            if (session && !session.revokedAt)
                return session;
            return null;
        }
    };
    return SessionService = _classThis;
})();
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map