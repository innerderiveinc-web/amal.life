export * from './wave1-canonical-corpus.js';
export * from './wave2-canonical-corpus.js';
export * from './wave3-canonical-corpus.js';
export * from './treasures-canonical-corpus.js';

import { WAVE_1_CANONICAL_CORPUS, CanonicalEditionRecord } from './wave1-canonical-corpus.js';
import { WAVE_2_CANONICAL_CORPUS } from './wave2-canonical-corpus.js';
import { WAVE_3_CANONICAL_CORPUS } from './wave3-canonical-corpus.js';
import { TREASURES_CANONICAL_CORPUS } from './treasures-canonical-corpus.js';

export const MASTER_CANONICAL_CORPUS: CanonicalEditionRecord[] = [
  ...WAVE_1_CANONICAL_CORPUS,
  ...WAVE_2_CANONICAL_CORPUS,
  ...WAVE_3_CANONICAL_CORPUS,
  ...TREASURES_CANONICAL_CORPUS,
];
