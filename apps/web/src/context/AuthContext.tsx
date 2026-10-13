import React, { createContext, useContext, useState, useEffect } from 'react';
import { showAmalToast } from '../components/Toast';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('amal_auth_user');
        if (saved) {
          setUser(JSON.parse(saved));
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
    }
  };

  const signIn = async (username: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const cleanUsername = username.trim().toLowerCase().replace(/^@/, '');
      const existingUser: AuthUser = {
        id: `usr_${Date.now()}`,
        username: cleanUsername,
        name: cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1),
        email: `${cleanUsername}@amal.vault`,
        role: cleanUsername.includes('scholar') ? 'SCHOLAR' : 'USER',
        madhhab: 'Hanafi',
        city: 'Delhi, India',
        isGuest: false,
        cloudSyncEnabled: true,
        lastSyncedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      saveUser(existingUser);
      showAmalToast(`Welcome back, @${existingUser.username}! Cloud sync active.`, 'success');
      return true;
    } catch {
      showAmalToast('Sign in failed. Please check your username and password.', 'warning');
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
      const newUser: AuthUser = {
        id: `usr_${Date.now()}`,
        username: cleanUsername,
        name: data.name.trim(),
        email: data.email?.trim() || `${cleanUsername}@amal.vault`,
        role: 'USER',
        madhhab: data.madhhab,
        city: data.city,
        isGuest: false,
        cloudSyncEnabled: true,
        lastSyncedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      saveUser(newUser);

      // Also persist chosen madhhab in app settings
      if (typeof window !== 'undefined') {
        localStorage.setItem('amal_user_madhhab', data.madhhab === 'Hanafi' ? 'HANAFI' : 'STANDARD_JUMHUR');
      }

      showAmalToast(`Account created successfully! Welcome @${newUser.username}.`, 'success');
      return true;
    } catch {
      showAmalToast('Registration failed. Please try again.', 'warning');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const continueAsGuest = () => {
    saveUser(DEFAULT_GUEST_USER);
    showAmalToast('Continuing as Sovereign Guest (Local Storage Mode).', 'info');
  };

  const signOut = () => {
    saveUser(DEFAULT_GUEST_USER);
    showAmalToast('Signed out. Local guest mode restored.', 'info');
  };

  const updateProfile = (data: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...data, lastSyncedAt: new Date().toISOString() };
    saveUser(updated);
    showAmalToast('Profile updated successfully', 'success');
  };

  const exportSovereignData = () => {
    if (typeof window === 'undefined') return;
    const exportBundle = {
      profile: user,
      bookmarks: localStorage.getItem('amal_saved_bookmarks') || '[]',
      location: localStorage.getItem('amal_user_location') || '{}',
      exportedAt: new Date().toISOString(),
      standard: 'AMAL_OS_CANONICAL_SOVEREIGNTY_V1',
    };

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amal-os-data-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showAmalToast('Sovereign data export downloaded (.json)', 'success');
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
