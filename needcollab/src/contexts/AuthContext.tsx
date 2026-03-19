import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { sendAuthEmail, verifyOtpCode } from '@/services/api';

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
      const result = await verifyOtpCode(code) as any;
      const profile = Array.isArray(result) ? result[0] : result;
      if (!profile) throw new Error('Invalid OTP');
      const loggedUser: User = {
        id: profile.user_id || profile.id || crypto.randomUUID(),
        email: profile.email || email,
        name: profile.full_name || profile.name || email.split('@')[0],
        role: (profile.role as UserRole) || 'client',
        avatar: profile.avatar_url,
      };
      setUser(loggedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(loggedUser));
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: { email: string; name: string; role: UserRole }) => {
    setLoading(true);
    try {
      await sendAuthEmail(data.email);
      // Profile will be created after OTP verification
      const tempUser: User = { id: crypto.randomUUID(), ...data };
      setUser(tempUser);
      localStorage.setItem(USER_KEY, JSON.stringify(tempUser));
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
