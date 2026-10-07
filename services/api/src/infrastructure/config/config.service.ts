/**
 * AMAL OS — LAYER 20: CONFIG SERVICE (Section 20.1)
 */

import { Injectable } from '@nestjs/common';
import { validateEnv, EnvSchema } from '@amal/config';

@Injectable()
export class ConfigService {
  private readonly env: EnvSchema;

  constructor() {
    this.env = validateEnv(process.env);
  }

  get<K extends keyof EnvSchema>(key: K): EnvSchema[K] {
    return this.env[key];
  }

  isProduction(): boolean {
    return this.env.NODE_ENV === 'production';
  }
}
