import { API_URL } from '../constants';
import type { ApiError } from '../types/error';

async function parseError(res: Response): Promise<ApiError> {
    let message = `HTTP ${res.status}`;

    try {
        const data = await res.json();
        if (typeof data?.message === 'string') message = data.message;
        if (Array.isArray(data?.message)) message = data.message.join('');
    } catch {
        // ignore JSON parse errors
    }

    return { status: res.status, message}
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}`} : {}),
            ...(options.headers ?? {}),
        },
    });

    if (!res.ok) {
        throw await parseError(res);
    }

    if (res.status === 204) return undefined as T;

    return (await res.json()) as T;
}