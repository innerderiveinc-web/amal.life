/**
 * AMAL OS — Web Client API Adapter
 * Connects directly to http://localhost:4000/api/v1 (Amal API Server)
 * with 100% resilient offline and local fallback storage.
 */

const API_BASE_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1')
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1');

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export class AmalApiClient {
  private static token: string = 'usr-default-ahmad';

  public static setAuthToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_token', token);
    }
  }

  public static getAuthToken(): string {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('amal_token');
      if (stored) return stored;
    }
    return this.token;
  }

  public static async request<T = any>(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
    body?: any
  ): Promise<ApiResponse<T>> {
    const token = this.getAuthToken();
    const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout before graceful local fallback

      const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();
      return data;
    } catch (err: any) {
      // Graceful local resilience handling
      return this.handleLocalFallback<T>(path, method, body);
    }
  }

  private static handleLocalFallback<T = any>(
    path: string,
    method: string,
    body?: any
  ): ApiResponse<T> {
    if (typeof window === 'undefined') {
      return { success: false, error: { code: 'OFFLINE', message: 'Offline server environment' } };
    }

    // 1. Goals Fallback
    if (path === '/goals' && method === 'GET') {
      const stored = localStorage.getItem('amal_goals');
      if (stored) {
        try {
          return { success: true, data: JSON.parse(stored) as T };
        } catch (_) {}
      }
      const initialGoals = [
        {
          id: 'goal_fajr_init',
          category: 'SALAH',
          title: 'Establish Fajr in Congregation with Presence',
          intent: 'IMPROVE',
          desired_outcome: 'Perform Fajr prayer on time every morning with family or at local mosque.',
          created_at: new Date().toISOString(),
        },
        {
          id: 'goal_quran_init',
          category: 'QURAN',
          title: 'Daily Recitation & Tajweed Contemplation',
          intent: 'MAINTAIN',
          desired_outcome: 'Read at least 1-2 pages of the Quran with meaning and clear makharij.',
          created_at: new Date().toISOString(),
        },
      ];
      localStorage.setItem('amal_goals', JSON.stringify(initialGoals));
      return { success: true, data: initialGoals as T };
    }

    if (path === '/goals' && method === 'POST') {
      const stored = localStorage.getItem('amal_goals');
      const existing = stored ? JSON.parse(stored) : [];
      const newGoal = {
        id: `goal_${Date.now()}`,
        category: body?.category || 'GENERAL',
        title: body?.title || 'Untitled Goal',
        intent: body?.intent || 'IMPROVE',
        desired_outcome: body?.desired_outcome || '',
        created_at: new Date().toISOString(),
      };
      const updated = [newGoal, ...existing];
      localStorage.setItem('amal_goals', JSON.stringify(updated));
      return { success: true, data: newGoal as T };
    }

    if (path.startsWith('/goals/') && method === 'DELETE') {
      const id = path.split('/')[2];
      const stored = localStorage.getItem('amal_goals');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.filter((g: any) => (g.id || g.goalId) !== id);
      localStorage.setItem('amal_goals', JSON.stringify(updated));
      return { success: true, data: { deleted: true } as T };
    }

    if (path.startsWith('/goals/') && method === 'PATCH') {
      const id = path.split('/')[2];
      const stored = localStorage.getItem('amal_goals');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.map((g: any) => (g.id || g.goalId) === id ? { ...g, ...body } : g);
      localStorage.setItem('amal_goals', JSON.stringify(updated));
      return { success: true, data: { updated: true } as T };
    }

    // 2. Journeys Fallback
    if (path === '/journeys' && method === 'GET') {
      const stored = localStorage.getItem('amal_journeys');
      const list = stored ? JSON.parse(stored) : [
        {
          id: 'journey_active_1',
          templateId: 'tmpl-salah-consistency',
          templateVersionId: 'v1.0.0',
          title: 'Salah Consistency & Presence',
          state: 'ACTIVE',
          currentPhase: 1,
          startedAt: new Date().toISOString(),
        },
      ];
      return { success: true, data: list as T };
    }

    if (path === '/journeys' && method === 'POST') {
      const stored = localStorage.getItem('amal_journeys');
      const existing = stored ? JSON.parse(stored) : [];
      const newJourney = {
        id: `journey_${Date.now()}`,
        templateId: body?.template_id || 'tmpl-custom',
        templateVersionId: 'v1.0.0',
        title: body?.title || 'New Journey',
        state: 'ACTIVE',
        currentPhase: 1,
        startedAt: new Date().toISOString(),
      };
      const updated = [newJourney, ...existing];
      localStorage.setItem('amal_journeys', JSON.stringify(updated));
      return { success: true, data: newJourney as T };
    }

    if (path.startsWith('/journeys/') && method === 'PATCH') {
      const id = path.split('/')[2];
      const stored = localStorage.getItem('amal_journeys');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.map((j: any) => (j.id || j.journeyId) === id ? { ...j, ...body } : j);
      localStorage.setItem('amal_journeys', JSON.stringify(updated));
      return { success: true, data: { updated: true } as T };
    }

    // 3. Reflections Fallback
    if (path === '/reflections' && method === 'GET') {
      const stored = localStorage.getItem('amal_reflections');
      const existing = stored ? JSON.parse(stored) : [
        {
          id: 'refl_initial_1',
          content: 'Alhamdulillah, completed morning Fajr on time. Reflecting on practicing sabr and mindfulness in speech.',
          type: 'DAILY_MUHASABAH',
          timestamp: new Date().toISOString(),
        },
      ];
      return { success: true, data: existing as T };
    }

    if (path === '/reflections' && method === 'POST') {
      const stored = localStorage.getItem('amal_reflections');
      const existing = stored ? JSON.parse(stored) : [];
      const newReflection = {
        id: `refl_${Date.now()}`,
        content: body?.content || '',
        type: body?.type || 'DAILY_MUHASABAH',
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('amal_reflections', JSON.stringify([newReflection, ...existing]));
      return { success: true, data: newReflection as T };
    }

    if (path.startsWith('/reflections/') && method === 'DELETE') {
      const id = path.split('/')[2];
      const stored = localStorage.getItem('amal_reflections');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.filter((r: any) => r.id !== id);
      localStorage.setItem('amal_reflections', JSON.stringify(updated));
      return { success: true, data: { deleted: true } as T };
    }

    // 4. Privacy Export Fallback
    if (path === '/privacy/export' && method === 'GET') {
      const exportBlob = {
        exportedAt: new Date().toISOString(),
        userId: 'usr_sovereign_local',
        profile: JSON.parse(localStorage.getItem('amal_user_profile') || '{}'),
        goals: JSON.parse(localStorage.getItem('amal_goals') || '[]'),
        journeys: JSON.parse(localStorage.getItem('amal_journeys') || '[]'),
        reflections: JSON.parse(localStorage.getItem('amal_reflections') || '[]'),
        notes: JSON.parse(localStorage.getItem('amal_notes') || '[]'),
      };
      return { success: true, data: exportBlob as T };
    }

    // 5. Account Deletion Fallback
    if (path === '/privacy/delete-account' && method === 'POST') {
      const keysToClear = ['amal_goals', 'amal_journeys', 'amal_reflections', 'amal_user_profile', 'amal_notes', 'amal_token'];
      keysToClear.forEach(k => localStorage.removeItem(k));
      return { success: true, data: { purged: true, message: 'All local records successfully erased.' } as T };
    }

    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Amal offline resilience layer processed locally.',
      },
    };
  }

  // Auth
  public static async register(email: string, displayName?: string) {
    const res = await this.request('/auth/register', 'POST', { email, display_name: displayName });
    if (res.success && res.data?.tokens?.access_token) {
      this.setAuthToken(res.data.tokens.access_token);
    }
    return res;
  }

  // Today
  public static async getTodayBurden() {
    return this.request('/today/burden', 'GET');
  }

  public static async getTodayPrayers() {
    return this.request('/prayers/today', 'GET');
  }

  // Goals
  public static async getGoals() {
    return this.request('/goals', 'GET');
  }

  public static async createGoal(category: string, title: string, intent: string, desiredOutcome: string) {
    return this.request('/goals', 'POST', {
      category,
      title,
      intent,
      desired_outcome: desiredOutcome,
    });
  }

  public static async updateGoal(id: string, updates: Record<string, any>) {
    return this.request(`/goals/${id}`, 'PATCH', updates);
  }

  public static async deleteGoal(id: string) {
    return this.request(`/goals/${id}`, 'DELETE');
  }

  // Journeys
  public static async getJourneys() {
    return this.request('/journeys', 'GET');
  }

  public static async startJourney(templateId: string, title: string, targetDurationDays: number = 14) {
    return this.request('/journeys', 'POST', {
      template_id: templateId,
      title,
      target_duration_days: targetDurationDays,
    });
  }

  public static async updateJourney(id: string, updates: Record<string, any>) {
    return this.request(`/journeys/${id}`, 'PATCH', updates);
  }

  // Amal Actions
  public static async completeAmal(amalId: string, completionType: 'FULL' | 'MINIMUM' | 'PARTIAL' = 'FULL') {
    return this.request(`/amal/${amalId}/complete`, 'POST', {
      completion_type: completionType,
      notes: 'Completed with intention.',
    });
  }

  // Reflections
  public static async getReflections() {
    return this.request('/reflections', 'GET');
  }

  public static async submitReflection(content: string, type: 'DAILY_MUHASABAH' | 'WEEKLY' = 'DAILY_MUHASABAH') {
    return this.request('/reflections', 'POST', {
      content,
      type,
    });
  }

  public static async deleteReflection(id: string) {
    return this.request(`/reflections/${id}`, 'DELETE');
  }

  // Evidence Search
  public static async searchEvidence(query: string) {
    return this.request('/evidence/search', 'POST', { query });
  }

  // Privacy & Governance
  public static async getTrustCenter() {
    return this.request('/governance/user-trust-center', 'GET');
  }

  public static async exportData() {
    return this.request('/privacy/export', 'GET');
  }

  public static async deleteAccount() {
    return this.request('/privacy/delete-account', 'POST');
  }
}
