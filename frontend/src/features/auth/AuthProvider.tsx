import { useApolloClient, useMutation } from '@apollo/client/react';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { session } from '../../services/session';
import type { AuthUser } from '../../types/auth';
import { LOGIN, LOGOUT, REFRESH } from './auth.graphql';

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const ACCESS_REFRESH_INTERVAL_MS = 10 * 60 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const client = useApolloClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const restored = useRef(false);
  const refreshing = useRef<Promise<boolean> | null>(null);
  const [loginMutation] = useMutation<
    { login: { accessToken: string; user: AuthUser } },
    { input: { email: string; password: string } }
  >(LOGIN);
  const [refreshMutation] = useMutation<{ refreshSession: { accessToken: string; user: AuthUser } }>(REFRESH);
  const [logoutMutation] = useMutation<{ logout: boolean }>(LOGOUT);

  const refreshAccess = useCallback(() => {
    if (refreshing.current) return refreshing.current;
    refreshing.current = refreshMutation()
      .then(({ data }) => {
        if (!data?.refreshSession) return false;
        session.set(data.refreshSession.accessToken);
        setUser(data.refreshSession.user);
        return true;
      })
      .catch(() => {
        session.set(null);
        setUser(null);
        return false;
      })
      .finally(() => {
        refreshing.current = null;
      });
    return refreshing.current;
  }, [refreshMutation]);

  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    void refreshAccess().finally(() => setLoading(false));
  }, [refreshAccess]);

  useEffect(() => {
    if (!user) return;
    const timer = window.setInterval(() => void refreshAccess(), ACCESS_REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [refreshAccess, user]);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await loginMutation({ variables: { input: { email, password } } });
    if (!data?.login) throw new Error('Login failed');
    session.set(data.login.accessToken);
    setUser(data.login.user);
    return data.login.user;
  }, [loginMutation]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation();
    } finally {
      session.set(null);
      setUser(null);
      await client.clearStore();
    }
  }, [client, logoutMutation]);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    hasPermission: (permission: string) => Boolean(user?.permissions.includes(permission)),
  }), [user, loading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
