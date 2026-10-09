import { IntelligenceRuntimeV1 } from './runtime.js';

export async function bootstrap() {
  console.log('AMAL Intelligence Runtime V1 engine online.');
  return true;
}

if (process.argv[1]?.endsWith('main.js') || process.argv[1]?.endsWith('main.ts')) {
  bootstrap();
}
