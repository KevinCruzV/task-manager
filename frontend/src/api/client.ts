import { API_URL } from '../constants';
import type { ApiError } from '../types/error';
import { TOKEN_KEY } from '../constants';

async function parseError(res: Response): Promise<ApiError> {
    let message = `HTTP ${res.status}`;

    try {
        const data = await res.json();
        if (typeof data?.message === 'string') message = data.message;
        if (Array.isArray(data?.message)) message = data.message.join('\n');
    } catch {
        // ignore JSON parse errors
    }

    return { status: res.status, message}
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
    const raw = localStorage.getItem(TOKEN_KEY);
    const token = raw && raw !== "undefined" ? raw : null;

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}`} : {}),
            ...(options.headers ?? {}),
        },
    });

    if (!res.ok) {
        const err = await parseError(res);
        throw new Error(err.message);
    }

    if (res.status === 204) return undefined as T;

    return (await res.json()) as T;
}