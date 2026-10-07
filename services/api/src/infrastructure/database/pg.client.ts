/**
 * AMAL OS — LAYER 20: POSTGRESQL CLIENT (Section 20.6)
 */

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { db } from '@amal/database';

export interface MockQueryResult<T = any> {
  rows: T[];
  rowCount: number;
}

@Injectable()
export class PgClient implements OnModuleDestroy {
  public readonly pool = {
    query: async <T = any>(text: string, values: unknown[] = []): Promise<MockQueryResult<T>> => {
      return this.query<T>(text, values);
    },
    end: async () => {},
  };

  async query<T = any>(_text: string, _values: unknown[] = []): Promise<MockQueryResult<T>> {
    return {
      rows: [] as T[],
      rowCount: 0,
    };
  }

  async connect(): Promise<any> {
    return {
      query: async <T = any>(text: string, values: unknown[] = []): Promise<MockQueryResult<T>> => {
        return this.query<T>(text, values);
      },
      release: () => {},
    };
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
