import type {
  PortfolioPosition,
  PortfolioTrade,
  PortfolioSummary,
  PortfolioEquityPoint,
} from '@/types/portfolio'

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export const portfolioApi = {
  getPositions: () => fetchJson<PortfolioPosition[]>('/api/portfolio/positions'),
  getTrades: () => fetchJson<PortfolioTrade[]>('/api/portfolio/trades'),
  getSummary: () => fetchJson<PortfolioSummary>('/api/portfolio/summary'),
  getEquity: () => fetchJson<PortfolioEquityPoint[]>('/api/portfolio/equity'),
}
