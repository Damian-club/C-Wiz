"use client";

import type { User } from 'firebase/auth'; // Using User type for structure, not full Firebase Auth
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Simulate a user object
interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  login: (email: string) => void; // Simplified login
  logout: () => void;
  signup: (email: string) => void; // Simplified signup
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking auth state on load
    const storedUser = localStorage.getItem('c-wiz-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string) => {
    const mockUser: AppUser = { uid: 'mock-uid-' + Date.now(), email, displayName: email.split('@')[0] };
    setUser(mockUser);
    localStorage.setItem('c-wiz-user', JSON.stringify(mockUser));
    router.push('/');
  };

  const signup = (email: string) => {
    // In a real app, this would involve password, etc.
    const mockUser: AppUser = { uid: 'mock-uid-' + Date.now(), email, displayName: email.split('@')[0] };
    setUser(mockUser);
    localStorage.setItem('c-wiz-user', JSON.stringify(mockUser));
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('c-wiz-user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
