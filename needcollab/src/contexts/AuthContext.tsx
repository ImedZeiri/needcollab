import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { sendAuthEmail, verifyOtpCode, getProfile } from '@/services/api';
import type { Profile } from '@/types';

export type UserRole = 'client' | 'vendor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string) => Promise<void>;
  verifyOTP: (email: string, code: string) => Promise<void>;
  register: (data: { email: string; name: string; role: UserRole }) => Promise<void>;
  logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = 'needcollab_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string) => {
    setLoading(true);
    try {
      await sendAuthEmail(email);
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyOTP = useCallback(async (email: string, code: string) => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await verifyOtpCode(email, code) as any;
      if (!result?.success) throw new Error('Invalid OTP');

      const userId = result.user_id;
      let profile: Profile | null = null;
      try {
        profile = await getProfile(userId) as Profile;
      } catch {
        // profile may not exist yet
      }

      const loggedUser: User = {
        id: userId,
        email: profile?.email || email,
        name: profile?.full_name || email.split('@')[0],
        role: profile?.is_vendor ? 'vendor' : 'client',
        avatar: profile?.avatar_url ?? undefined,
      };
      setUser(loggedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(loggedUser));

      // If server returned a magic link, follow it to establish Supabase session
      if (result.action_link) {
        window.location.href = result.action_link;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: { email: string; name: string; role: UserRole }) => {
    setLoading(true);
    try {
      await sendAuthEmail(data.email);
      const tempUser: User = { id: crypto.randomUUID(), ...data };
      setUser(tempUser);
      localStorage.setItem(USER_KEY, JSON.stringify(tempUser));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, verifyOTP, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    // During HMR reloads, context may momentarily be undefined.
    // Return a safe fallback instead of throwing to prevent blank screens.
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      login: async () => {},
      verifyOTP: async () => {},
      register: async () => {},
      logout: () => {},
    };
  }
  return context;
}
