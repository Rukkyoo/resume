import { apiFetch } from '@/lib/api';


export const fetcher = <T>(url: string): Promise<T> => apiFetch<T>(url);
