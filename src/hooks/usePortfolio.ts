import { useQuery } from '@tanstack/react-query'
import { portfolioApi } from '@/api/portfolio'

export function usePositions() {
  return useQuery({
    queryKey: ['portfolio', 'positions'],
    queryFn: () => portfolioApi.getPositions(),
    staleTime: 10_000,
  })
}

export function useTrades() {
  return useQuery({
    queryKey: ['portfolio', 'trades'],
    queryFn: () => portfolioApi.getTrades(),
    staleTime: 30_000,
  })
}

export function usePortfolioSummary() {
  return useQuery({
    queryKey: ['portfolio', 'summary'],
    queryFn: () => portfolioApi.getSummary(),
    staleTime: 10_000,
  })
}

export function usePortfolioEquity() {
  return useQuery({
    queryKey: ['portfolio', 'equity'],
    queryFn: () => portfolioApi.getEquity(),
    staleTime: 60_000,
  })
}
