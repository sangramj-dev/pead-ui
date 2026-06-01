import type { BacktestRequest, BacktestSummary, BacktestTrade, EquityPoint } from '@/types/backtest'

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export const backtestApi = {
  run: (params: BacktestRequest) =>
    fetchJson<{ backtestId: string }>('/api/backtest/backtests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }),
  get: (id: string) => fetchJson<BacktestSummary>(`/api/backtest/backtests/${id}`),
  list: () => fetchJson<BacktestSummary[]>('/api/backtest/backtests'),
  getTrades: (id: string) => fetchJson<BacktestTrade[]>(`/api/backtest/backtests/${id}/trades`),
  getEquity: (id: string) => fetchJson<EquityPoint[]>(`/api/backtest/backtests/${id}/equity`),
}
