/**
 * AMAL OS — LAYER 20: CONFIG SERVICE (Section 20.1)
 */
import { EnvSchema } from '@amal/config';
export declare class ConfigService {
    private readonly env;
    constructor();
    get<K extends keyof EnvSchema>(key: K): EnvSchema[K];
    isProduction(): boolean;
}
//# sourceMappingURL=config.service.d.ts.map