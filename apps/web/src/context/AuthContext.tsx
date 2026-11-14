import React, { createContext, useContext, useState, useEffect } from 'react';
import { showAmalToast } from '../components/Toast';
import { api, AmalApiClient } from '../lib/api';
import { userKey, generateCryptoSalt, hashSecret } from '../lib/storage-adapter';

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  email?: string;
  role: 'USER' | 'SCHOLAR' | 'ADMIN';
  madhhab: 'Hanafi' | 'Shafi\'i' | 'Maliki' | 'Hanbali';
  city: string;
  isGuest: boolean;
  cloudSyncEnabled: boolean;
  lastSyncedAt?: string;
  createdAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (username: string, password?: string) => Promise<boolean>;
  register: (data: {
    username: string;
    name: string;
    password?: string;
    madhhab: 'Hanafi' | 'Shafi\'i' | 'Maliki' | 'Hanbali';
    city: string;
    email?: string;
  }) => Promise<boolean>;
  continueAsGuest: () => void;
  signOut: () => void;
  updateProfile: (data: Partial<AuthUser>) => void;
  exportSovereignData: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEFAULT_GUEST_USER: AuthUser = {
  id: 'guest_local_seeker',
  username: 'sovereign_guest',
  name: 'Sovereign Seeker',
  email: 'local@device.vault',
  role: 'USER',
  madhhab: 'Hanafi',
  city: 'Delhi, India',
  isGuest: true,
  cloudSyncEnabled: false,
  createdAt: new Date().toISOString(),
};

/**
 * Returns a stable device-local user ID for the given username.
 * On first use a UUID-style ID is generated and stored in localStorage
 * keyed by username — so the same user always gets the same ID back,
 * even across sign-out / sign-in cycles.
 */
function getOrCreateLocalUserId(username: string): string {
  if (typeof window === 'undefined') return `usr_${username}`;
  const storageKey = `amal_local_uid_${username}`;
  const existing = localStorage.getItem(storageKey);
  if (existing) return existing;
  // Generate a stable UUID-style ID once
  const uid = `usr_${username}_${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem(storageKey, uid);
  return uid;
}

const getLang = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('amal_app_language') || 'ur';
  }
  return 'ur';
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('amal_auth_user');
        if (saved) {
          const parsed = JSON.parse(saved);
          setUser(parsed);
          if (!parsed.isGuest) {
            const token = localStorage.getItem('amal_token') || `token_${parsed.id}`;
            AmalApiClient.setAuthToken(token);
          }
        } else {
          // Default to Sovereign Guest Mode
          setUser(DEFAULT_GUEST_USER);
        }
      } catch (_) {
        setUser(DEFAULT_GUEST_USER);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const saveUser = (u: AuthUser) => {
    setUser(u);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_auth_user', JSON.stringify(u));
      if (!u.isGuest) {
        const token = `token_${u.id}_${Date.now()}`;
        AmalApiClient.setAuthToken(token);
      } else {
        AmalApiClient.setAuthToken('');
      }
      window.dispatchEvent(new CustomEvent('amal_auth_changed', { detail: u }));
    }
  };

  const signIn = async (username: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const cleanUsername = username.trim().toLowerCase().replace(/^@/, '');
      if (!cleanUsername) throw new Error('Empty username');

      // Verify password if one was set for this local profile
      const storedHash = localStorage.getItem(userKey.pwdHash(cleanUsername));
      const storedSalt = localStorage.getItem(userKey.pwdSalt(cleanUsername));

      if (storedHash && storedSalt) {
        if (!password || !password.trim()) {
          const lang = getLang();
          showAmalToast(
            lang === 'ur'
              ? 'براہ کرم پاسورڈ درج کریں۔'
              : lang === 'ar'
              ? 'يرجى إدخال كلمة المرور.'
              : lang === 'ru'
              ? 'Baraye meharbani password darj karein.'
              : 'Please enter your password.',
            'warning'
          );
          return false;
        }

        const inputHash = await hashSecret(storedSalt, password.trim());
        if (inputHash !== storedHash) {
          const lang = getLang();
          showAmalToast(
            lang === 'ur'
              ? 'پاسورڈ درست نہیں ہے۔ دوبارہ کوشش کریں۔'
              : lang === 'ar'
              ? 'كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.'
              : lang === 'ru'
              ? 'Password ghalat hai. Dobara koshish karein.'
              : 'Incorrect password. Please try again.',
            'warning'
          );
          return false;
        }
      }

      // Restore existing profile for this username, or create a fresh one
      const savedProfileRaw = localStorage.getItem(`amal_profile_${cleanUsername}`);
      const savedProfile = savedProfileRaw ? (JSON.parse(savedProfileRaw) as Partial<AuthUser>) : null;

      const stableId = getOrCreateLocalUserId(cleanUsername);
      const existingUser: AuthUser = {
        id: stableId,
        username: cleanUsername,
        name: savedProfile?.name || (cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1)),
        email: savedProfile?.email || `${cleanUsername}@amal.vault`,
        role: (savedProfile?.role) || (cleanUsername.includes('scholar') ? 'SCHOLAR' : 'USER'),
        madhhab: savedProfile?.madhhab || 'Hanafi',
        city: savedProfile?.city || 'Delhi, India',
        isGuest: false,
        cloudSyncEnabled: false,         // Honest: local-only until backend is configured
        lastSyncedAt: undefined,
        createdAt: savedProfile?.createdAt || new Date().toISOString(),
      };
      saveUser(existingUser);
      // Persist profile so it's restored next sign-in
      localStorage.setItem(`amal_profile_${cleanUsername}`, JSON.stringify(existingUser));

      const lang = getLang();
      showAmalToast(
        lang === 'ur'
          ? `خوش آمدید، @${existingUser.username}! آپ کا ڈیٹا اس ڈیوائس پر محفوظ ہے۔`
          : lang === 'ar'
          ? `مرحباً بعودتك، @${existingUser.username}! بياناتك محفوظة على هذا الجهاز.`
          : lang === 'ru'
          ? `Khush aamdeed, @${existingUser.username}! Data is device pe mahfooz hai.`
          : `Welcome back, @${existingUser.username}! Your data is saved on this device.`,
        'success'
      );
      return true;
    } catch {
      const lang = getLang();
      showAmalToast(
        lang === 'ur'
          ? 'لاگ ان نامکمل رہا۔ براہ کرم صارف کا نام چیک کریں۔'
          : lang === 'ar'
          ? 'فشل تسجيل الدخول. يرجى التحقق من اسم المستخدم.'
          : lang === 'ru'
          ? 'Sign in nakam raha. Baraye meharbani username check karein.'
          : 'Sign in failed. Please check your username.',
        'warning'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    username: string;
    name: string;
    password?: string;
    madhhab: 'Hanafi' | 'Shafi\'i' | 'Maliki' | 'Hanbali';
    city: string;
    email?: string;
  }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const cleanUsername = data.username.trim().toLowerCase().replace(/[^a-z0-9_.-]/g, '');
      if (!cleanUsername) throw new Error('Empty username');

      // Securely salt & hash password using Web Crypto SHA-256
      if (data.password && data.password.trim()) {
        const salt = generateCryptoSalt();
        const hash = await hashSecret(salt, data.password.trim());
        localStorage.setItem(userKey.pwdSalt(cleanUsername), salt);
        localStorage.setItem(userKey.pwdHash(cleanUsername), hash);
      }

      const stableId = getOrCreateLocalUserId(cleanUsername);
      const newUser: AuthUser = {
        id: stableId,
        username: cleanUsername,
        name: data.name.trim(),
        email: data.email?.trim() || `${cleanUsername}@amal.vault`,
        role: 'USER',
        madhhab: data.madhhab,
        city: data.city,
        isGuest: false,
        cloudSyncEnabled: false,         // Honest: local-only until backend is configured
        lastSyncedAt: undefined,
        createdAt: new Date().toISOString(),
      };
      saveUser(newUser);
      // Persist full profile so sign-in can restore it
      localStorage.setItem(`amal_profile_${cleanUsername}`, JSON.stringify(newUser));

      // Also persist chosen madhhab in app settings
      if (typeof window !== 'undefined') {
        localStorage.setItem('amal_user_madhhab', data.madhhab === 'Hanafi' ? 'HANAFI' : 'STANDARD_JUMHUR');
      }

      const lang = getLang();
      showAmalToast(
        lang === 'ur'
          ? `پروفائل بن گئی! خوش آمدید @${newUser.username} — آپ کا ڈیٹا اس ڈیوائس پر محفوظ ہے۔`
          : lang === 'ar'
          ? `تم إنشاء الملف الشخصي! أهلاً بك @${newUser.username} — بياناتك محفوظة على هذا الجهاز.`
          : lang === 'ru'
          ? `Profile ban gayi! Khush aamdeed @${newUser.username} — data is device pe mahfooz hai.`
          : `Profile created! Welcome @${newUser.username} — your data is saved on this device.`,
        'success'
      );
      return true;
    } catch {
      const lang = getLang();
      showAmalToast(
        lang === 'ur'
          ? 'رجسٹریشن مکمل نہ ہو سکی۔ دوبارہ کوشش کریں۔'
          : lang === 'ar'
          ? 'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.'
          : lang === 'ru'
          ? 'Registration nakam rahi. Dobara koshish karein.'
          : 'Registration failed. Please try again.',
        'warning'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const continueAsGuest = () => {
    saveUser(DEFAULT_GUEST_USER);
    const lang = getLang();
    showAmalToast(
      lang === 'ur'
        ? 'خود مختار مہمان موڈ (آف لائن لوکل اسٹوریج) میں جاری ہے۔'
        : lang === 'ar'
        ? 'المتابعة كضيف سيادي (وضع التخزين المحلي).'
        : lang === 'ru'
        ? 'Sovereign Guest mode (Local Storage) mein jari hai.'
        : 'Continuing as Sovereign Guest (Local Storage Mode).',
      'info'
    );
  };

  const signOut = () => {
    saveUser(DEFAULT_GUEST_USER);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('amal_last_cloud_sync');
      localStorage.removeItem('amal_token');
    }
    const lang = getLang();
    showAmalToast(
      lang === 'ur'
        ? 'سائن آؤٹ ہو گیا۔ لوکل گیسٹ موڈ بحال کر دیا گیا۔'
        : lang === 'ar'
        ? 'تم تسجيل الخروج. تمت استعادة وضع الضيف المحلي.'
        : lang === 'ru'
        ? 'Sign out ho gaya. Local guest mode bahal ho gaya.'
        : 'Signed out. Local guest mode restored.',
      'info'
    );
  };

  const updateProfile = (data: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...data, lastSyncedAt: new Date().toISOString() };
    saveUser(updated);
    const lang = getLang();
    showAmalToast(
      lang === 'ur'
        ? 'پروفائل کامیابی سے اپ ڈیٹ ہو گئی۔'
        : lang === 'ar'
        ? 'تم تحديث الملف الشخصي بنجاح.'
        : lang === 'ru'
        ? 'Profile kamyabi se update ho gayi.'
        : 'Profile updated successfully.',
      'success'
    );
  };

  const exportSovereignData = () => {
    if (typeof window === 'undefined') return;
    api.exportData();
    const lang = getLang();
    showAmalToast(
      lang === 'ur'
        ? 'خود مختار ڈیٹا کا بیک اپ کامیابی سے ڈاؤنلوڈ ہو گیا (.json)'
        : lang === 'ar'
        ? 'تم تنزيل النسخة الاحتياطية الشاملة للبيانات السيادية (.json)'
        : lang === 'ru'
        ? 'Sovereign data backup kamyabi se download ho gaya (.json)'
        : 'Comprehensive sovereign data backup downloaded (.json)',
      'success'
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        register,
        continueAsGuest,
        signOut,
        updateProfile,
        exportSovereignData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
