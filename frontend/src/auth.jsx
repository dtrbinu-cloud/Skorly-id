import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch, clearAccessToken, setAccessToken, refreshSession } from './lib/api';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshSession().then(session => setUser(session.user)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const payload = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }, false);
    setAccessToken(payload.data.accessToken);
    setUser(payload.data.user);
    return payload.data.user;
  };

  const register = async (nama, email, password, role = 'murid') => {
    const payload = await apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ nama, email, password, role }) }, false);
    return payload.data.user;
  };

  const logout = async () => {
    try { await apiFetch('/auth/logout', { method: 'POST' }, false); } finally { clearAccessToken(); setUser(null); }
  };

  return <Ctx.Provider value={{ user, loading, login, register, logout }}>{children}</Ctx.Provider>;
}
