import { HybridRetrievalEngine } from './index.js';
export { LexicalSearchEngine } from './lexical/index.js';
export { VectorSearchEngine } from './vector/index.js';
export { KnowledgeGraphTraversalEngine } from './graph/index.js';
export { ReciprocalRankFusionEngine } from './ranking/index.js';
export { HybridRetrievalEngine } from './index.js';

export async function bootstrap() {
  console.log('AMAL Governed Islamic Retrieval Service online.');
  return true;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  bootstrap();
}
