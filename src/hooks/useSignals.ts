import { useQuery } from '@tanstack/react-query'
import { signalsApi } from '@/api/signals'

export function useValidatedSignals(date: string) {
  return useQuery({
    queryKey: ['signals', 'validated', date],
    queryFn: () => signalsApi.getValidated(date),
    staleTime: 30_000,
  })
}

export function useSignalsByTicker(ticker: string) {
  return useQuery({
    queryKey: ['signals', 'ticker', ticker],
    queryFn: () => signalsApi.getByTicker(ticker),
    enabled: !!ticker,
  })
}

export function useScoringDetails(signalId: string) {
  return useQuery({
    queryKey: ['signals', 'scoring', signalId],
    queryFn: () => signalsApi.getScoringDetails(signalId),
    enabled: !!signalId,
  })
}

export function useRejectedCandidates(date: string) {
  return useQuery({
    queryKey: ['signals', 'rejected', date],
    queryFn: () => signalsApi.getRejected(date),
    staleTime: 30_000,
  })
}
