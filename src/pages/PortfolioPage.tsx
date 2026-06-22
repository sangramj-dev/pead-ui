import { usePositions, useTrades, usePortfolioSummary, usePortfolioEquity } from '@/hooks/usePortfolio'
import { PositionsTable } from '@/components/portfolio/PositionsTable'
import { TradeHistory } from '@/components/portfolio/TradeHistory'
import { EquityChart } from '@/components/portfolio/EquityChart'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

function formatInr(value: number): string {
  return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

function SummaryCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={cn('text-lg font-mono tabular-nums font-semibold mt-1', color)}>
          {value}
        </p>
      </CardContent>
    </Card>
  )
}

export function PortfolioPage() {
  const { data: summary, isLoading: summaryLoading } = usePortfolioSummary()
  const { data: positions } = usePositions()
  const { data: trades } = useTrades()
  const { data: equity } = usePortfolioEquity()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Portfolio</h1>

      {summaryLoading && (
        <p className="py-4 text-sm text-muted-foreground">Loading...</p>
      )}

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard label="Total Equity" value={formatInr(summary.totalEquity)} />
          <SummaryCard
            label="Unrealised P&L"
            value={formatInr(summary.unrealisedPnl)}
            color={summary.unrealisedPnl >= 0 ? 'text-green-500' : 'text-red-500'}
          />
          <SummaryCard label="Open Positions" value={String(summary.openPositionsCount)} />
          <SummaryCard label="Win Rate" value={`${(summary.winRate * 100).toFixed(1)}%`} />
        </div>
      )}

      <Tabs defaultValue="positions">
        <TabsList>
          <TabsTrigger value="positions">
            Positions ({positions?.length ?? 0})
          </TabsTrigger>
          <TabsTrigger value="history">
            Trade History ({trades?.length ?? 0})
          </TabsTrigger>
          <TabsTrigger value="equity">Equity Curve</TabsTrigger>
        </TabsList>
        <TabsContent value="positions">
          {positions ? (
            <PositionsTable positions={positions} />
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading...</p>
          )}
        </TabsContent>
        <TabsContent value="history">
          {trades ? (
            <TradeHistory trades={trades} />
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading...</p>
          )}
        </TabsContent>
        <TabsContent value="equity">
          {equity ? (
            <EquityChart data={equity} />
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading...</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
