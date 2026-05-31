import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from '@/components/layout/Layout'
import { Toaster } from '@/components/ui/toaster'
import { DashboardPage } from '@/pages/DashboardPage'
import { SignalsPage } from '@/pages/SignalsPage'
import { SignalDetailPage } from '@/pages/SignalDetailPage'
import { EarningsPage } from '@/pages/EarningsPage'
import { MarketPage } from '@/pages/MarketPage'
import { WatchlistPage } from '@/pages/WatchlistPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="signals" element={<SignalsPage />} />
            <Route path="signals/:signalId" element={<SignalDetailPage />} />
            <Route path="earnings" element={<EarningsPage />} />
            <Route path="market" element={<MarketPage />} />
            <Route path="market/:ticker" element={<MarketPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
