import { TOKEN_KEY } from "../../constants";

export function setToken(accessToken: string) {
  if (!accessToken || accessToken === "undefined") return;
  localStorage.setItem(TOKEN_KEY, accessToken);
}

export function getToken(): string | null {
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw || raw === "undefined") return null;
  return raw;
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}