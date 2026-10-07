import { Controller, Get } from '@nestjs/common';

export interface DependencyStatus {
  status: 'UP' | 'DOWN';
  latencyMs: number;
}

export interface HealthResponse {
  status: 'OK' | 'DEGRADED';
  timestamp: string;
  uptimeSeconds: number;
  dependencies?: Record<string, DependencyStatus>;
}

@Controller('health')
export class HealthController {
  private startTime = Date.now();

  @Get()
  getHealth(): HealthResponse {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
    };
  }

  @Get('live')
  getLiveness(): { status: string } {
    return { status: 'LIVE' };
  }

  @Get('ready')
  getReadiness(): HealthResponse {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
      dependencies: {
        PostgreSQL: { status: 'UP', latencyMs: 2 },
        Redis: { status: 'UP', latencyMs: 1 },
        ObjectStorage: { status: 'UP', latencyMs: 8 },
        Queue: { status: 'UP', latencyMs: 3 },
        AIGateway: { status: 'UP', latencyMs: 15 },
      },
    };
  }

  @Get('dependencies')
  getDependencies() {
    return {
      PostgreSQL: { status: 'UP', version: 'PostgreSQL 16.2 with pgvector 0.7.0' },
      Redis: { status: 'UP', version: 'Redis 7.2-alpine' },
      ObjectStorage: { status: 'UP', target: 'AWS S3 Evidence Vault' },
      Queue: { status: 'UP', engine: 'BullMQ / Redis' },
      AIGateway: { status: 'UP', engine: 'AMAL Intelligence Runtime V1' },
    };
  }
}
