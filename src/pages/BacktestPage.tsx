import { useState } from 'react'
import { BacktestForm } from '@/components/backtest/BacktestForm'
import { BacktestResults } from '@/components/backtest/BacktestResults'
import { TradeTable } from '@/components/backtest/TradeTable'
import { MonthlyReturns } from '@/components/backtest/MonthlyReturns'
import { useBacktest, useBacktestTrades } from '@/hooks/useBacktest'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2 } from 'lucide-react'

export function BacktestPage() {
  const [backtestId, setBacktestId] = useState<string | null>(null)
  const { data: summary } = useBacktest(backtestId)
  const { data: trades } = useBacktestTrades(
    summary?.status === 'COMPLETED' ? backtestId : null
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Backtesting</h1>

      <BacktestForm onSubmit={setBacktestId} />

      {backtestId && summary?.status === 'RUNNING' && (
        <div className="flex items-center gap-2 py-8 justify-center text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Backtest running...</span>
        </div>
      )}

      {backtestId && summary?.status === 'FAILED' && (
        <p className="py-8 text-center text-sm text-red-500">
          Backtest failed. Please check parameters and try again.
        </p>
      )}

      {backtestId && summary?.status === 'COMPLETED' && (
        <Tabs defaultValue="stats">
          <TabsList>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="trades">Trades ({summary.totalTrades})</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="stats">
            <BacktestResults backtestId={backtestId} />
          </TabsContent>
          <TabsContent value="trades">
            {trades ? (
              <TradeTable trades={trades} />
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">Loading...</p>
            )}
          </TabsContent>
          <TabsContent value="monthly">
            {trades ? (
              <MonthlyReturns trades={trades} initialCapital={1000000} />
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">Loading...</p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
