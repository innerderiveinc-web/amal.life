import { ApiRouter } from '../services/api/src/router.js';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const res = await ApiRouter.handle('GET', '/api/v1/openapi.json', {}, { userId: 'admin', userRole: 'ADMIN' });
  if (res.success && res.data) {
    const targetPath = path.resolve(process.cwd(), 'docs/openapi.json');
    fs.writeFileSync(targetPath, JSON.stringify(res.data, null, 2));
    console.log(`✓ Wrote OpenAPI specification to ${targetPath}`);
  } else {
    console.error('Failed to retrieve OpenAPI specification:', res);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
