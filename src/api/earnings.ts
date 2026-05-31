import type { EarningsAnnouncement, TriggerIngestionResponse } from '@/types/earnings'

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`)
  return res.json() as Promise<T>
}

export const earningsApi = {
  getByDate: (date: string) =>
    fetchJson<EarningsAnnouncement[]>(`/api/earnings/date/${date}`),

  getByRange: (startDate: string, endDate: string) =>
    fetchJson<EarningsAnnouncement[]>(
      `/api/earnings/range?startDate=${startDate}&endDate=${endDate}`
    ),

  triggerIngestion: (date: string) =>
    fetchJson<TriggerIngestionResponse>(`/api/earnings/trigger/${date}`, { method: 'POST' }),

  health: () => fetchJson<{ status: string; components?: unknown }>(`/api/earnings/actuator/health`),
}
