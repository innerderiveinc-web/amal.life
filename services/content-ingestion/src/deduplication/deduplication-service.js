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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeduplicationService = void 0;
const crypto = __importStar(require("crypto"));
class DeduplicationService {
    static seenHashes = new Set();
    static referenceTextMap = new Map();
    static check(reference, normalizedText) {
        const hash = crypto.createHash('sha256').update(normalizedText).digest('hex');
        if (this.seenHashes.has(hash)) {
            return { isDuplicate: true, hasConflict: false };
        }
        if (this.referenceTextMap.has(reference)) {
            const existingText = this.referenceTextMap.get(reference);
            if (existingText !== normalizedText) {
                return {
                    isDuplicate: false,
                    hasConflict: true,
                    conflictDetails: `CONFLICT_DETECTED: Reference '${reference}' exists with conflicting text content.`,
                };
            }
        }
        this.seenHashes.add(hash);
        this.referenceTextMap.set(reference, normalizedText);
        return { isDuplicate: false, hasConflict: false };
    }
}
exports.DeduplicationService = DeduplicationService;
//# sourceMappingURL=deduplication-service.js.map