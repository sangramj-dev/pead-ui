import { useParams, useLocation, Link } from 'react-router-dom'
import { useSignalsByTicker, useScoringDetails } from '@/hooks/useSignals'
import { usePriceBars } from '@/hooks/useMarket'
import { SignalCard } from '@/components/signals/SignalCard'
import { TradeSetupPanel } from '@/components/signals/TradeSetupPanel'
import { ScoringDetailTable } from '@/components/signals/ScoringDetailTable'
import { PeadScoreRadar } from '@/components/charts/PeadScoreRadar'
import { CandlestickChart } from '@/components/charts/CandlestickChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function SignalDetailPage() {
  const { signalId } = useParams<{ signalId: string }>()
  const location = useLocation()
  const ticker = (location.state as { ticker?: string } | null)?.ticker

  const signalsQuery = useSignalsByTicker(ticker ?? '')
  const signal = signalsQuery.data?.find((s) => s.signalId === signalId)

  const scoringQuery = useScoringDetails(signalId ?? '')
  const barsQuery = usePriceBars(signal?.ticker ?? '')

  if (!ticker) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">Signal not found. Navigate from the Signals page.</p>
        <Link to="/signals">
          <Button variant="outline" className="mt-4">
            Go to Signals
          </Button>
        </Link>
      </div>
    )
  }

  if (signalsQuery.isLoading) return <p className="text-muted-foreground">Loading…</p>
  if (!signal) return <p className="text-muted-foreground py-8 text-center">Signal not found.</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/signals">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Signal Detail</h1>
      </div>

      <SignalCard signal={signal} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TradeSetupPanel signal={signal} />
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">PEAD Score Radar</CardTitle>
          </CardHeader>
          <CardContent>
            {scoringQuery.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
            {scoringQuery.data && <PeadScoreRadar details={scoringQuery.data} />}
          </CardContent>
        </Card>
      </div>

      {scoringQuery.data && <ScoringDetailTable details={scoringQuery.data} />}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Chart — {signal.ticker}</CardTitle>
        </CardHeader>
        <CardContent>
          {barsQuery.isLoading && <p className="text-sm text-muted-foreground">Loading chart…</p>}
          {barsQuery.data && barsQuery.data.length > 0 && (
            <CandlestickChart
              bars={barsQuery.data}
              levels={{
                entry: signal.entryPrice,
                stop: signal.stopLoss,
                target1: signal.target1,
                target2: signal.target2,
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
