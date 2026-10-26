/**
 * AMAL OS — LAYER 19: USER REPOSITORY (Section 114)
 */

import { User, UserId, toUserId } from '@amal/types';
import { db, InMemoryAmalDatabase } from '../index.js';

export interface UserRepository {
  create(input: Partial<User> & { email?: string }, tx?: InMemoryAmalDatabase): Promise<User>;
  findById(id: UserId, tx?: InMemoryAmalDatabase): Promise<User | null>;
  findByEmail(email: string, tx?: InMemoryAmalDatabase): Promise<User | null>;
  update(id: UserId, input: Partial<User>, tx?: InMemoryAmalDatabase): Promise<User>;
}

export class InMemoryUserRepository implements UserRepository {
  async create(input: Partial<User> & { email?: string }, _tx?: InMemoryAmalDatabase): Promise<User> {
    const id = (input.id as UserId) || toUserId(`usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
    const now = new Date().toISOString();
    const user: User = {
      id,
      email: input.email || `${id}@amal.local`,
      role: input.role || 'USER',
      status: input.status || 'ACTIVE',
      accountMode: input.accountMode || 'ADULT',
      locale: input.locale || 'en',
      timezone: input.timezone || 'Asia/Kolkata',
      createdAt: now,
      updatedAt: now,
    };
    db.users.set(id, user);
    return user;
  }

  async findById(id: UserId, _tx?: InMemoryAmalDatabase): Promise<User | null> {
    return db.users.get(id) || null;
  }

  async findByEmail(email: string, _tx?: InMemoryAmalDatabase): Promise<User | null> {
    for (const u of db.users.values()) {
      if (u.email === email) return u;
    }
    return null;
  }

  async update(id: UserId, input: Partial<User>, _tx?: InMemoryAmalDatabase): Promise<User> {
    const existing = db.users.get(id);
    if (!existing) throw new Error(`User ${id} not found.`);
    const updated: User = {
      ...existing,
      ...input,
      updatedAt: new Date().toISOString(),
    };
    db.users.set(id, updated);
    return updated;
  }
}

export const userRepository = new InMemoryUserRepository();
