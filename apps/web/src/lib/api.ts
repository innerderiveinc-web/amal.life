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

  /**
   * Set authentication token with strict character sanitization to defend against XSS poisoning.
   * Note: In production cloud mode, the backend sets an HttpOnly SameSite=Strict session cookie,
   * which takes priority over localStorage tokens.
   */
  public static setAuthToken(token: string) {
    const sanitized = token ? token.trim().replace(/[^a-zA-Z0-9_\-\.]/g, '') : '';
    this.token = sanitized;
    if (typeof window !== 'undefined') {
      if (sanitized) {
        localStorage.setItem('amal_token', sanitized);
        // Also mirror to cookie with SameSite=Strict protection
        try {
          const isSecure = window.location.protocol === 'https:' ? '; Secure' : '';
          document.cookie = `amal_token=${sanitized}; Path=/; SameSite=Strict; Max-Age=2592000${isSecure}`;
        } catch {}
      } else {
        localStorage.removeItem('amal_token');
        try {
          document.cookie = 'amal_token=; Path=/; SameSite=Strict; Max-Age=0';
        } catch {}
      }
    }
  }

  public static getAuthToken(): string {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('amal_token');
      if (stored) return stored.replace(/[^a-zA-Z0-9_\-\.]/g, '');

      // Check cookie fallback if localStorage was cleared
      try {
        const match = document.cookie.split(';').map((c) => c.trim()).find((c) => c.startsWith('amal_token='));
        if (match) {
          const val = match.split('=')[1]?.replace(/[^a-zA-Z0-9_\-\.]/g, '');
          if (val) return val;
        }
      } catch {}
    }
    return this.token;
  }

  public static clearAuth() {
    this.token = '';
    if (typeof window !== 'undefined') {
      localStorage.removeItem('amal_token');
      try {
        document.cookie = 'amal_token=; Path=/; SameSite=Strict; Max-Age=0';
      } catch {}
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
        credentials: 'include', // Enables secure HttpOnly, SameSite=Strict cookie session exchange
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
      const templateDaysMap: Record<string, number> = {
        'tmpl-fajr-14d': 14,
        'tmpl-salah-consistency': 21,
        'tmpl-quran-restart': 30,
        'tmpl-anger-patience': 10,
      };
      const templateId = body?.template_id || 'tmpl-custom';
      const totalDays = body?.target_duration_days || templateDaysMap[templateId] || 14;
      const newJourney = {
        id: `journey_local_${Date.now()}`,
        templateId,
        templateVersionId: 'v1.0.0',
        title: body?.title || 'New Journey',
        state: 'ACTIVE',
        currentPhase: 1,
        currentDay: 1,
        totalDays,
        completedDays: [],
        dailyCheckins: {},
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

    if (path.startsWith('/journeys/') && method === 'DELETE') {
      const id = path.split('/')[2];
      const stored = localStorage.getItem('amal_journeys');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.filter((j: any) => (j.id || j.journeyId) !== id);
      localStorage.setItem('amal_journeys', JSON.stringify(updated));
      return { success: true, isLocalOnly: true, data: { deleted: true } as T };
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
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        mode: 'LOCAL_BROWSER_SOVEREIGN_STORAGE',
        goals: JSON.parse(localStorage.getItem('amal_goals') || '[]'),
        journeys: JSON.parse(localStorage.getItem('amal_journeys') || '[]'),
        reflections: JSON.parse(localStorage.getItem('amal_reflections') || '[]'),
        bookmarks: JSON.parse(localStorage.getItem('amal_saved_bookmarks') || '[]'),
        quranWisdomBookmarks: JSON.parse(localStorage.getItem('amal_quran_wisdom_bookmarks') || '[]'),
        location: JSON.parse(localStorage.getItem('amal_user_location') || '{}'),
        madhhab: localStorage.getItem('amal_user_madhhab') || 'HANAFI',
        method: localStorage.getItem('amal_user_method') || 'KARACHI',
        prayerOffsets: JSON.parse(localStorage.getItem('amal_user_prayer_offsets') || '{}'),
        hijriOffset: Number(localStorage.getItem('amal_user_hijri_offset') || '0'),
        azaanSettings: JSON.parse(localStorage.getItem('amal_azaan_settings') || '{}'),
        focusMode: localStorage.getItem('amal_focus_mode') !== 'false',
        appLanguage: localStorage.getItem('amal_app_language') || 'en',
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

  public static async deleteJourney(id: string) {
    return this.request(`/journeys/${id}`, 'DELETE');
  }

  public static async resetJourney(id: string) {
    return this.request(`/journeys/${id}`, 'PATCH', {
      currentDay: 1,
      currentPhase: 1,
      completedDays: [],
      dailyCheckins: {},
      state: 'ACTIVE',
      resetAt: new Date().toISOString(),
    });
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

  public static async restoreData(backupData: any): Promise<ApiResponse<{ restoredCount: number }>> {
    if (typeof window === 'undefined') {
      return { success: false, error: { code: 'OFFLINE', message: 'Window not available' } };
    }
    try {
      if (!backupData || typeof backupData !== 'object') {
        return { success: false, error: { code: 'INVALID_BACKUP', message: 'Invalid backup file structure' } };
      }
      let count = 0;
      if (Array.isArray(backupData.goals)) {
        localStorage.setItem('amal_goals', JSON.stringify(backupData.goals));
        count += backupData.goals.length;
      }
      if (Array.isArray(backupData.journeys)) {
        localStorage.setItem('amal_journeys', JSON.stringify(backupData.journeys));
        count += backupData.journeys.length;
      }
      if (Array.isArray(backupData.reflections)) {
        localStorage.setItem('amal_reflections', JSON.stringify(backupData.reflections));
        count += backupData.reflections.length;
      }
      if (Array.isArray(backupData.bookmarks)) {
        localStorage.setItem('amal_saved_bookmarks', JSON.stringify(backupData.bookmarks));
        count += backupData.bookmarks.length;
      }
      if (Array.isArray(backupData.quranWisdomBookmarks)) {
        localStorage.setItem('amal_quran_wisdom_bookmarks', JSON.stringify(backupData.quranWisdomBookmarks));
        count += backupData.quranWisdomBookmarks.length;
      }
      if (backupData.location && typeof backupData.location === 'object') {
        localStorage.setItem('amal_user_location', JSON.stringify(backupData.location));
      }
      if (backupData.madhhab) {
        localStorage.setItem('amal_user_madhhab', backupData.madhhab);
      }
      if (backupData.method) {
        localStorage.setItem('amal_user_method', backupData.method);
      }
      if (backupData.prayerOffsets) {
        localStorage.setItem('amal_user_prayer_offsets', JSON.stringify(backupData.prayerOffsets));
      }
      if (backupData.hijriOffset !== undefined) {
        localStorage.setItem('amal_user_hijri_offset', String(backupData.hijriOffset));
      }
      if (backupData.azaanSettings) {
        localStorage.setItem('amal_azaan_settings', JSON.stringify(backupData.azaanSettings));
      }
      if (backupData.focusMode !== undefined) {
        localStorage.setItem('amal_focus_mode', backupData.focusMode ? 'true' : 'false');
      }
      if (backupData.appLanguage) {
        localStorage.setItem('amal_app_language', backupData.appLanguage);
      }

      window.dispatchEvent(new CustomEvent('amal_prayer_settings_changed'));
      window.dispatchEvent(new CustomEvent('amal_bookmarks_updated'));
      window.dispatchEvent(new CustomEvent('amal_data_restored'));

      return { success: true, data: { restoredCount: count } };
    } catch (e: any) {
      return { success: false, error: { code: 'RESTORE_FAILED', message: e.message || 'Restoration failed' } };
    }
  }

  public static async deleteAccount() {
    return this.request('/privacy/delete-account', 'POST');
  }
}

export const api = AmalApiClient;
