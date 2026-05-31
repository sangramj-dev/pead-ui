import type { PriceBar, DailyIndicator, BackfillResponse } from '@/types/market'

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`)
  return res.json() as Promise<T>
}

export const marketApi = {
  getBars: (ticker: string, limit = 50) =>
    fetchJson<PriceBar[]>(`/api/market/bars/${encodeURIComponent(ticker)}?limit=${limit}`),

  getLatestIndicator: (ticker: string) =>
    fetchJson<DailyIndicator>(`/api/market/indicators/${encodeURIComponent(ticker)}/latest`),

  backfill: (ticker: string, from: string, to: string) =>
    fetchJson<BackfillResponse>(
      `/api/market/backfill/${encodeURIComponent(ticker)}?from=${from}&to=${to}`,
      { method: 'POST' }
    ),

  health: () => fetchJson<{ status: string; components?: unknown }>(`/api/market/actuator/health`),
}
