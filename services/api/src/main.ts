import { AppModule } from './modules/app.module.js';

export async function bootstrap() {
  console.log('AMAL OS Production API bootstrap initialized.');
  console.log('Controllers registered:', AppModule.controllers.map((c: any) => c.name));
  return true;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  bootstrap();
}
