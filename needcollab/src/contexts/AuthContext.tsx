import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

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

// Mock user for development
const MOCK_USERS: Record<string, User> = {
  'client@test.com': { id: '1', email: 'client@test.com', name: 'Jean Client', role: 'client' },
  'vendor@test.com': { id: '2', email: 'vendor@test.com', name: 'Marie Vendor', role: 'vendor' },
  'admin@test.com': { id: '3', email: 'admin@test.com', name: 'Admin User', role: 'admin' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string) => {
    setLoading(true);
    // Mock: simulate OTP sent
    await new Promise(r => setTimeout(r, 500));
    console.log(`OTP sent to ${email}`);
    setLoading(false);
  }, []);

  const verifyOTP = useCallback(async (email: string, _code: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const mockUser = MOCK_USERS[email] || { id: '99', email, name: email.split('@')[0], role: 'client' as UserRole };
    setUser(mockUser);
    setLoading(false);
  }, []);

  const register = useCallback(async (data: { email: string; name: string; role: UserRole }) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setUser({ id: crypto.randomUUID(), ...data });
    setLoading(false);
  }, []);

  const logout = useCallback(() => { setUser(null); }, []);

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
