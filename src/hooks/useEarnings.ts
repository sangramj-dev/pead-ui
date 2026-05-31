import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { earningsApi } from '@/api/earnings'

export function useEarningsByDate(date: string) {
  return useQuery({
    queryKey: ['earnings', 'date', date],
    queryFn: () => earningsApi.getByDate(date),
    staleTime: 60_000,
  })
}

export function useEarningsByRange(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ['earnings', 'range', startDate, endDate],
    queryFn: () => earningsApi.getByRange(startDate, endDate),
    staleTime: 60_000,
  })
}

export function useTriggerIngestion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (date: string) => earningsApi.triggerIngestion(date),
    onSuccess: (_data, date) => {
      void queryClient.invalidateQueries({ queryKey: ['earnings', 'date', date] })
    },
  })
}
