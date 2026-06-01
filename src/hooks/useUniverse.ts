import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { universeApi } from '@/api/universe'
import type { UniverseStock } from '@/types/universe'

export function useUniverses() {
  return useQuery({
    queryKey: ['universes'],
    queryFn: () => universeApi.getUniverses(),
    staleTime: 60_000,
  })
}

export function useUniverseStocks(id: string | null) {
  return useQuery({
    queryKey: ['universes', id, 'stocks'],
    queryFn: () => universeApi.getStocks(id!),
    enabled: !!id,
  })
}

export function useAddStock(universeId: string | null) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (stock: Omit<UniverseStock, 'sector'> & { sector?: string | null }) =>
      universeApi.addStock(universeId!, stock),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universes', universeId, 'stocks'] })
    },
  })
}

export function useRemoveStock(universeId: string | null) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (ticker: string) => universeApi.removeStock(universeId!, ticker),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universes', universeId, 'stocks'] })
    },
  })
}

export function useBackfillUniverse() {
  return useMutation({
    mutationFn: (universeId: string) => universeApi.backfillUniverse(universeId),
  })
}
