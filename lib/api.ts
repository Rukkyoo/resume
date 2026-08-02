import { API_BASE_URL } from '@/lib/constants';
import type { ApiError, RequestOptions } from '@/types';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit & RequestOptions = {}
): Promise<T> {
  const { headers: extraHeaders, revalidate, tags, ...fetchOptions } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    next: {
      ...(revalidate !== undefined && { revalidate }),
      ...(tags && { tags }),
    },
  });

  if (!res.ok) {
    let errorBody: Partial<ApiError> = {};
    try {
      errorBody = await res.json();
    } catch {
      // Non-JSON error body — ignore
    }
    const error: ApiError = {
      message: errorBody.message ?? res.statusText,
      code: errorBody.code,
      status: res.status,
      errors: errorBody.errors,
    };
    throw error;
  }

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    }),

  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { method: 'DELETE', ...options }),
};
