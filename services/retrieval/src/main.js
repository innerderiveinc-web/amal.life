"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HybridRetrievalEngine = exports.ReciprocalRankFusionEngine = exports.KnowledgeGraphTraversalEngine = exports.VectorSearchEngine = exports.LexicalSearchEngine = void 0;
exports.bootstrap = bootstrap;
var index_js_1 = require("./lexical/index.js");
Object.defineProperty(exports, "LexicalSearchEngine", { enumerable: true, get: function () { return index_js_1.LexicalSearchEngine; } });
var index_js_2 = require("./vector/index.js");
Object.defineProperty(exports, "VectorSearchEngine", { enumerable: true, get: function () { return index_js_2.VectorSearchEngine; } });
var index_js_3 = require("./graph/index.js");
Object.defineProperty(exports, "KnowledgeGraphTraversalEngine", { enumerable: true, get: function () { return index_js_3.KnowledgeGraphTraversalEngine; } });
var index_js_4 = require("./ranking/index.js");
Object.defineProperty(exports, "ReciprocalRankFusionEngine", { enumerable: true, get: function () { return index_js_4.ReciprocalRankFusionEngine; } });
var index_js_5 = require("./index.js");
Object.defineProperty(exports, "HybridRetrievalEngine", { enumerable: true, get: function () { return index_js_5.HybridRetrievalEngine; } });
async function bootstrap() {
    console.log('AMAL Governed Islamic Retrieval Service online.');
    return true;
}
if (import.meta.url === `file://${process.argv[1]}`) {
    bootstrap();
}
//# sourceMappingURL=main.js.map