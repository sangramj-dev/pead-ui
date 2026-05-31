import type { ServiceHealth } from '@/types/health'

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`)
  return res.json() as Promise<T>
}

export const scannerApi = {
  getWatchlist: () => fetchJson<string[]>(`/api/scanner/watchlist`),

  isOnWatchlist: (ticker: string) =>
    fetchJson<{ onWatchlist: boolean }>(`/api/scanner/watchlist/${encodeURIComponent(ticker)}`),

  removeFromWatchlist: async (ticker: string): Promise<void> => {
    const res = await fetch(`/api/scanner/watchlist/${encodeURIComponent(ticker)}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  },

  health: () => fetchJson<ServiceHealth>(`/api/scanner/health`),
}
