import { useMutation, useQuery } from '@tanstack/react-query'
import { marketApi } from '@/api/market'

export function usePriceBars(ticker: string, limit = 50) {
  return useQuery({
    queryKey: ['market', 'bars', ticker, limit],
    queryFn: () => marketApi.getBars(ticker, limit),
    enabled: !!ticker,
    staleTime: 60_000,
  })
}

export function useLatestIndicator(ticker: string) {
  return useQuery({
    queryKey: ['market', 'indicators', ticker],
    queryFn: () => marketApi.getLatestIndicator(ticker),
    enabled: !!ticker,
    staleTime: 60_000,
  })
}

export function useBackfill() {
  return useMutation({
    mutationFn: ({ ticker, from, to }: { ticker: string; from: string; to: string }) =>
      marketApi.backfill(ticker, from, to),
  })
}
