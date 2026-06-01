import { useQuery, useMutation } from '@tanstack/react-query'
import { backtestApi } from '@/api/backtest'
import type { BacktestRequest } from '@/types/backtest'

export function useBacktest(id: string | null) {
  return useQuery({
    queryKey: ['backtest', id],
    queryFn: () => backtestApi.get(id!),
    enabled: !!id,
    refetchInterval: (query) => {
      const status = query.state.data?.status
      return status === 'RUNNING' ? 3000 : false
    },
  })
}

export function useBacktestTrades(id: string | null) {
  return useQuery({
    queryKey: ['backtest', id, 'trades'],
    queryFn: () => backtestApi.getTrades(id!),
    enabled: !!id,
  })
}

export function useBacktestEquity(id: string | null) {
  return useQuery({
    queryKey: ['backtest', id, 'equity'],
    queryFn: () => backtestApi.getEquity(id!),
    enabled: !!id,
  })
}

export function useRunBacktest() {
  return useMutation({
    mutationFn: (params: BacktestRequest) => backtestApi.run(params),
  })
}
