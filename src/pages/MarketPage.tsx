import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePriceBars, useLatestIndicator } from '@/hooks/useMarket'
import { CandlestickChart } from '@/components/charts/CandlestickChart'
import { IndicatorPanel } from '@/components/market/IndicatorPanel'
import { BackfillPanel } from '@/components/market/BackfillPanel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export function MarketPage() {
  const { ticker: paramTicker } = useParams<{ ticker?: string }>()
  const [input, setInput] = useState(paramTicker ?? '')
  const [activeTicker, setActiveTicker] = useState(paramTicker ?? '')
  const navigate = useNavigate()

  const barsQuery = usePriceBars(activeTicker)
  const indicatorQuery = useLatestIndicator(activeTicker)

  function handleSearch() {
    const t = input.trim().toUpperCase()
    if (!t) return
    setActiveTicker(t)
    navigate(`/market/${t}`, { replace: true })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Market Data</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="AAPL"
            className="rounded-md border bg-background px-3 py-1.5 text-sm w-28 font-mono"
          />
          <Button variant="outline" size="icon" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {activeTicker && (
        <>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Price Chart — {activeTicker}</CardTitle>
            </CardHeader>
            <CardContent>
              {barsQuery.isLoading && <p className="text-sm text-muted-foreground">Loading chart…</p>}
              {barsQuery.isError && <p className="text-sm text-red-400">Failed to load price data.</p>}
              {barsQuery.data && barsQuery.data.length > 0 && (
                <CandlestickChart bars={barsQuery.data} />
              )}
              {barsQuery.data?.length === 0 && (
                <p className="text-sm text-muted-foreground">No price data available.</p>
              )}
            </CardContent>
          </Card>

          {indicatorQuery.data && <IndicatorPanel indicator={indicatorQuery.data} />}
          <BackfillPanel ticker={activeTicker} />
        </>
      )}
    </div>
  )
}
