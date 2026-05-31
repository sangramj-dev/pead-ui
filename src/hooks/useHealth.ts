import { useQueries } from '@tanstack/react-query'
import { signalsApi } from '@/api/signals'
import { earningsApi } from '@/api/earnings'
import { marketApi } from '@/api/market'
import { scannerApi } from '@/api/scanner'

const HEALTH_SERVICES = [
  { name: 'Earnings', fn: earningsApi.health },
  { name: 'Market Data', fn: marketApi.health },
  { name: 'Scanner', fn: scannerApi.health },
  { name: 'Signals', fn: signalsApi.health },
] as const

export function useServiceHealth() {
  const results = useQueries({
    queries: HEALTH_SERVICES.map((svc) => ({
      queryKey: ['health', svc.name],
      queryFn: svc.fn,
      refetchInterval: 30_000,
      retry: false,
    })),
  })

  return HEALTH_SERVICES.map((svc, i) => {
    const result = results[i]
    let status: 'UP' | 'DOWN' | 'LOADING' | 'ERROR'
    if (result.isLoading) status = 'LOADING'
    else if (result.isError) status = 'ERROR'
    else if (result.data?.status === 'UP') status = 'UP'
    else status = 'DOWN'
    return { name: svc.name, status }
  })
}
