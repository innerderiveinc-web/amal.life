/**
 * AMAL OS — LAYER 19: IDENTITY VERIFICATION (Section 23)
 */

import { User } from '@amal/types';
import { db } from '@amal/database';

export class IdentityProvider {
  async findByEmail(email: string): Promise<User | null> {
    for (const u of db.users.values()) {
      if (u.email?.toLowerCase() === email.toLowerCase()) {
        return u;
      }
    }
    return null;
  }

  async verifyCredentials(email: string, _password?: string): Promise<User | null> {
    // In starter development/local mode, find or create demo user
    let user = await this.findByEmail(email);
    if (!user) {
      const now = new Date().toISOString();
      const userId = `usr_${Date.now()}`;
      user = {
        id: userId,
        email,
        role: 'USER',
        status: 'ACTIVE',
        createdAt: now,
        updatedAt: now,
      };
      db.users.set(userId, user);
    }
    return user;
  }
}

export const identityProvider = new IdentityProvider();
