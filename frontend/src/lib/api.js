const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
let accessToken = null;
let attemptToken = null;
let refreshInFlight = null;

export function setAccessToken(token) { accessToken = token || null; }
export function clearAccessToken() { accessToken = null; }
export function setAttemptToken(token) { attemptToken = token || null; try { sessionStorage.setItem('skorly_attempt_token', attemptToken || ''); } catch {} }
try { attemptToken = sessionStorage.getItem('skorly_attempt_token') || null; } catch {}

async function refreshSession() {
  if (!refreshInFlight) {
    refreshInFlight = fetch(`${API_URL}/auth/refresh`, { method: 'POST', credentials: 'include' })
      .then(async response => { if (!response.ok) throw new Error('SESSION_EXPIRED'); const payload = await response.json(); setAccessToken(payload.data.accessToken); return payload.data; })
      .finally(() => { refreshInFlight = null; });
  }
  return refreshInFlight;
}

export async function apiFetch(path, options = {}, canRefresh = true) {
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  if (attemptToken) headers.set('X-Attempt-Token', attemptToken);
  const response = await fetch(`${API_URL}${path}`, { ...options, headers, credentials: 'include' });
  if (response.status === 401 && canRefresh && !path.endsWith('/auth/refresh')) {
    try { await refreshSession(); return apiFetch(path, options, false); } catch { clearAccessToken(); }
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) { const error = new Error(payload.error?.message || payload.message || 'Request gagal.'); error.status = response.status; error.code = payload.error?.code; throw error; }
  return payload;
}

export { refreshSession };
