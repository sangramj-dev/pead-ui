import type { StockUniverse, UniverseStock } from '@/types/universe'

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export const universeApi = {
  getUniverses: () => fetchJson<StockUniverse[]>('/api/market/universes'),
  getStocks: (id: string) => fetchJson<UniverseStock[]>(`/api/market/universes/${id}/stocks`),
  addStock: (id: string, stock: Omit<UniverseStock, 'sector'> & { sector?: string | null }) =>
    fetchJson<UniverseStock>(`/api/market/universes/${id}/stocks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stock),
    }),
  removeStock: (id: string, ticker: string) =>
    fetchJson<void>(`/api/market/universes/${id}/stocks/${encodeURIComponent(ticker)}`, {
      method: 'DELETE',
    }),
  backfillUniverse: (id: string) =>
    fetchJson<{ message: string }>(`/api/market/universes/${id}/backfill`, {
      method: 'POST',
    }),
}
