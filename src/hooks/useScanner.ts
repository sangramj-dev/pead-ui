import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { scannerApi } from '@/api/scanner'

export function useWatchlist() {
  return useQuery({
    queryKey: ['scanner', 'watchlist'],
    queryFn: () => scannerApi.getWatchlist(),
    staleTime: 30_000,
  })
}

export function useRemoveFromWatchlist() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (ticker: string) => scannerApi.removeFromWatchlist(ticker),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['scanner', 'watchlist'] })
    },
  })
}
