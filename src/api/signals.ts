import type { ValidatedSignal, ScoringDetail, RejectedCandidate } from '@/types/signals'
import type { ServiceHealth } from '@/types/health'

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`)
  return res.json() as Promise<T>
}

export const signalsApi = {
  getValidated: (date: string) =>
    fetchJson<ValidatedSignal[]>(`/api/signals/validated?date=${date}`),

  getByTicker: (ticker: string) =>
    fetchJson<ValidatedSignal[]>(`/api/signals/validated/${encodeURIComponent(ticker)}`),

  getScoringDetails: (signalId: string) =>
    fetchJson<ScoringDetail[]>(`/api/signals/validated/${signalId}/scoring`),

  getRejected: (date: string) =>
    fetchJson<RejectedCandidate[]>(`/api/signals/rejected?date=${date}`),

  health: () => fetchJson<ServiceHealth>(`/api/signals/health`),
}
