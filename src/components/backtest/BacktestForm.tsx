import { useState } from 'react'
import { format, subYears } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRunBacktest } from '@/hooks/useBacktest'
import type { BacktestRequest } from '@/types/backtest'
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react'

interface BacktestFormProps {
  onSubmit: (backtestId: string) => void
}

export function BacktestForm({ onSubmit }: BacktestFormProps) {
  const today = format(new Date(), 'yyyy-MM-dd')
  const threeYearsAgo = format(subYears(new Date(), 3), 'yyyy-MM-dd')

  const [startDate, setStartDate] = useState(threeYearsAgo)
  const [endDate, setEndDate] = useState(today)
  const [initialCapital, setInitialCapital] = useState(1000000)
  const [universeId, setUniverseId] = useState('nifty50')
  const [exchange, setExchange] = useState('NSE')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Strategy params
  const [minEps, setMinEps] = useState(3)
  const [minRev, setMinRev] = useState(2)
  const [minGap, setMinGap] = useState(5)
  const [minRelVol, setMinRelVol] = useState(2)
  const [minScore, setMinScore] = useState(60)
  const [maxPositions, setMaxPositions] = useState(5)
  const [riskPct, setRiskPct] = useState(1)
  const [target1R, setTarget1R] = useState(2)
  const [target2R, setTarget2R] = useState(3)

  const mutation = useRunBacktest()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const req: BacktestRequest = {
      startDate,
      endDate,
      initialCapital,
      riskPerTradePct: riskPct,
      minEpsSurprisePct: minEps,
      minRevenueSurprisePct: minRev,
      minGapPct: minGap,
      minRelativeVolume: minRelVol,
      minPeadScore: minScore,
      maxConcurrentPositions: maxPositions,
      profitTarget1R: target1R,
      profitTarget2R: target2R,
      universeId,
      exchange,
    }
    mutation.mutate(req, {
      onSuccess: (data) => onSubmit(data.backtestId),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Run Backtest</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Initial Capital</label>
              <input
                type="number"
                value={initialCapital}
                onChange={(e) => setInitialCapital(Number(e.target.value))}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Universe</label>
              <input
                type="text"
                value={universeId}
                onChange={(e) => setUniverseId(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Exchange</label>
            <input
              type="text"
              value={exchange}
              onChange={(e) => setExchange(e.target.value)}
              className="w-48 rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            Strategy Parameters
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg border p-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Min EPS Surprise (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={minEps}
                  onChange={(e) => setMinEps(Number(e.target.value))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Min Revenue Surprise (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={minRev}
                  onChange={(e) => setMinRev(Number(e.target.value))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Min Gap (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={minGap}
                  onChange={(e) => setMinGap(Number(e.target.value))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Min Relative Volume</label>
                <input
                  type="number"
                  step="0.5"
                  value={minRelVol}
                  onChange={(e) => setMinRelVol(Number(e.target.value))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Min PEAD Score</label>
                <input
                  type="number"
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Max Positions</label>
                <input
                  type="number"
                  value={maxPositions}
                  onChange={(e) => setMaxPositions(Number(e.target.value))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Risk per Trade (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={riskPct}
                  onChange={(e) => setRiskPct(Number(e.target.value))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Profit Target 1R</label>
                <input
                  type="number"
                  step="0.5"
                  value={target1R}
                  onChange={(e) => setTarget1R(Number(e.target.value))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Profit Target 2R</label>
                <input
                  type="number"
                  step="0.5"
                  value={target2R}
                  onChange={(e) => setTarget2R(Number(e.target.value))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          )}

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Run Backtest
          </Button>

          {mutation.isError && (
            <p className="text-sm text-red-500">
              Error: {mutation.error instanceof Error ? mutation.error.message : 'Failed to run backtest'}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
