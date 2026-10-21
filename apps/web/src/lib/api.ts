/**
 * AMAL OS — Web Client API Adapter
 * Connects to configured AMAL Backend API with explicit local device storage mode.
 * ZERO FABRICATION: Never sends default mock identity and never fakes remote sync.
 */

const API_BASE_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || '')
  : (process.env.NEXT_PUBLIC_API_URL || '');

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  isLocalOnly?: boolean;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export class AmalApiClient {
  private static token: string = '';

  public static setAuthToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('amal_token', token);
      } else {
        localStorage.removeItem('amal_token');
      }
    }
  }

  public static getAuthToken(): string {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('amal_token');
      if (stored) return stored;
    }
    return this.token;
  }

  public static clearAuth() {
    this.token = '';
    if (typeof window !== 'undefined') {
      localStorage.removeItem('amal_token');
    }
  }

  public static async request<T = any>(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
    body?: any
  ): Promise<ApiResponse<T>> {
    // If no backend API URL is configured, operate directly in documented Local Device Mode
    if (!API_BASE_URL) {
      return this.handleLocalDeviceStorage<T>(path, method, body);
    }

    const token = this.getAuthToken();
    const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();
      if (!data || !data.success) {
        return this.handleLocalDeviceStorage<T>(path, method, body);
      }
      return data;
    } catch (err: any) {
      // Return honest local device storage fallback
      return this.handleLocalDeviceStorage<T>(path, method, body);
    }
  }

  /**
   * Explicit local device storage handler.
   * Clearly flags responses with `isLocalOnly: true` so the user is informed
   * that records reside strictly in the local browser and are not cloud-synced.
   */
  private static handleLocalDeviceStorage<T = any>(
    path: string,
    method: string,
    body?: any
  ): ApiResponse<T> {
    if (typeof window === 'undefined') {
      return { success: false, isLocalOnly: true, error: { code: 'OFFLINE', message: 'Offline server environment' } };
    }

    // 1. Goals (Local Device Only)
    if (path === '/goals' && method === 'GET') {
      const stored = localStorage.getItem('amal_goals');
      const list = stored ? JSON.parse(stored) : [];
      return { success: true, isLocalOnly: true, data: list as T };
    }

    if (path === '/goals' && method === 'POST') {
      const stored = localStorage.getItem('amal_goals');
      const existing = stored ? JSON.parse(stored) : [];
      const newGoal = {
        id: `goal_local_${Date.now()}`,
        category: body?.category || 'GENERAL',
        title: body?.title || 'Untitled Goal',
        intent: body?.intent || 'IMPROVE',
        desired_outcome: body?.desired_outcome || '',
        created_at: new Date().toISOString(),
      };
      const updated = [newGoal, ...existing];
      localStorage.setItem('amal_goals', JSON.stringify(updated));
      return { success: true, isLocalOnly: true, data: newGoal as T };
    }

    if (path.startsWith('/goals/') && method === 'DELETE') {
      const id = path.split('/')[2];
      const stored = localStorage.getItem('amal_goals');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.filter((g: any) => (g.id || g.goalId) !== id);
      localStorage.setItem('amal_goals', JSON.stringify(updated));
      return { success: true, isLocalOnly: true, data: { deleted: true } as T };
    }

    if (path.startsWith('/goals/') && method === 'PATCH') {
      const id = path.split('/')[2];
      const stored = localStorage.getItem('amal_goals');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.map((g: any) => (g.id || g.goalId) === id ? { ...g, ...body } : g);
      localStorage.setItem('amal_goals', JSON.stringify(updated));
      return { success: true, isLocalOnly: true, data: { updated: true } as T };
    }

    // 2. Journeys (Local Device Only)
    if (path === '/journeys' && method === 'GET') {
      const stored = localStorage.getItem('amal_journeys');
      const list = stored ? JSON.parse(stored) : [];
      return { success: true, isLocalOnly: true, data: list as T };
    }

    if (path === '/journeys' && method === 'POST') {
      const stored = localStorage.getItem('amal_journeys');
      const existing = stored ? JSON.parse(stored) : [];
      const newJourney = {
        id: `journey_local_${Date.now()}`,
        templateId: body?.template_id || 'tmpl-custom',
        templateVersionId: 'v1.0.0',
        title: body?.title || 'New Journey',
        state: 'ACTIVE',
        currentPhase: 1,
        startedAt: new Date().toISOString(),
      };
      const updated = [newJourney, ...existing];
      localStorage.setItem('amal_journeys', JSON.stringify(updated));
      return { success: true, isLocalOnly: true, data: newJourney as T };
    }

    if (path.startsWith('/journeys/') && method === 'PATCH') {
      const id = path.split('/')[2];
      const stored = localStorage.getItem('amal_journeys');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.map((j: any) => (j.id || j.journeyId) === id ? { ...j, ...body } : j);
      localStorage.setItem('amal_journeys', JSON.stringify(updated));
      return { success: true, isLocalOnly: true, data: { updated: true } as T };
    }

    // 3. Reflections (Local Device Only — No Fake Pre-existing History)
    if (path === '/reflections' && method === 'GET') {
      const stored = localStorage.getItem('amal_reflections');
      const existing = stored ? JSON.parse(stored) : [];
      return { success: true, isLocalOnly: true, data: existing as T };
    }

    if (path === '/reflections' && method === 'POST') {
      const stored = localStorage.getItem('amal_reflections');
      const existing = stored ? JSON.parse(stored) : [];
      const newReflection = {
        id: `refl_local_${Date.now()}`,
        content: body?.content || '',
        type: body?.type || 'DAILY_MUHASABAH',
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('amal_reflections', JSON.stringify([newReflection, ...existing]));
      return { success: true, isLocalOnly: true, data: newReflection as T };
    }

    if (path.startsWith('/reflections/') && method === 'DELETE') {
      const id = path.split('/')[2];
      const stored = localStorage.getItem('amal_reflections');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.filter((r: any) => r.id !== id);
      localStorage.setItem('amal_reflections', JSON.stringify(updated));
      return { success: true, isLocalOnly: true, data: { deleted: true } as T };
    }

    // 4. Privacy Export (Local Device Only)
    if (path === '/privacy/export' && method === 'GET') {
      const exportBlob = {
        exportedAt: new Date().toISOString(),
        mode: 'LOCAL_BROWSER_SOVEREIGN_STORAGE',
        goals: JSON.parse(localStorage.getItem('amal_goals') || '[]'),
        journeys: JSON.parse(localStorage.getItem('amal_journeys') || '[]'),
        reflections: JSON.parse(localStorage.getItem('amal_reflections') || '[]'),
      };
      return { success: true, isLocalOnly: true, data: exportBlob as T };
    }

    // 5. Account/Data Purge
    if (path === '/privacy/delete-account' && method === 'POST') {
      const keysToClear = ['amal_goals', 'amal_journeys', 'amal_reflections', 'amal_user_profile', 'amal_token'];
      keysToClear.forEach(k => localStorage.removeItem(k));
      return { success: true, isLocalOnly: true, data: { purged: true, message: 'All local device records cleared.' } as T };
    }

    return {
      success: false,
      isLocalOnly: true,
      error: {
        code: 'ENDPOINT_UNAVAILABLE_OFFLINE',
        message: 'This action requires an active, connected AMAL Backend API.',
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
