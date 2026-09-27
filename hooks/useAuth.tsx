import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { UserProfile, UserRole } from '../types/user';
import { authStorageService } from '../services/authStorage';

export interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (role: UserRole, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (newRole: UserRole, newDisplayName?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStoredSession() {
      try {
        const storedProfile = await authStorageService.getProfile();
        if (isMounted) {
          setUser(storedProfile);
        }
      } catch (err) {
        console.warn('Erro ao carregar sessão local:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStoredSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (role: UserRole, displayName?: string) => {
    const saved = await authStorageService.saveProfile({ role, displayName });
    setUser(saved);
  };

  const logout = async () => {
    await authStorageService.clearProfile();
    setUser(null);
  };

  const switchRole = async (newRole: UserRole, newDisplayName?: string) => {
    const currentName = newDisplayName !== undefined ? newDisplayName : user?.displayName;
    const saved = await authStorageService.saveProfile({ role: newRole, displayName: currentName });
    setUser(saved);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      switchRole,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um <AuthProvider>');
  }
  return context;
}
