import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBacktest, useBacktestEquity } from '@/hooks/useBacktest'
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts'
import { cn } from '@/lib/utils'

interface BacktestResultsProps {
  backtestId: string
}

function formatInr(value: number): string {
  return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
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

export function BacktestResults({ backtestId }: BacktestResultsProps) {
  const { data: summary } = useBacktest(backtestId)
  const { data: equity } = useBacktestEquity(backtestId)

  if (!summary) return null

  const pnlColor = summary.totalPnl >= 0 ? 'text-green-500' : 'text-red-500'

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Total P&L"
          value={formatInr(summary.totalPnl)}
          color={pnlColor}
        />
        <StatCard
          label="Win Rate"
          value={`${(summary.winRate * 100).toFixed(1)}%`}
        />
        <StatCard
          label="Sharpe Ratio"
          value={summary.sharpeRatio.toFixed(2)}
        />
        <StatCard
          label="Max Drawdown"
          value={`${summary.maxDrawdownPct.toFixed(1)}%`}
          color="text-red-500"
        />
        <StatCard
          label="CAGR"
          value={`${(summary.cagr * 100).toFixed(1)}%`}
          color={summary.cagr >= 0 ? 'text-green-500' : 'text-red-500'}
        />
        <StatCard
          label="Profit Factor"
          value={summary.profitFactor.toFixed(2)}
        />
      </div>

      {equity && equity.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Equity Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={equity}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v: string) => v.slice(5)}
                  />
                  <YAxis
                    yAxisId="equity"
                    orientation="left"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`}
                  />
                  <YAxis
                    yAxisId="dd"
                    orientation="right"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v: number) => `${v.toFixed(0)}%`}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) =>
                      name === 'equity'
                        ? [formatInr(value), 'Equity']
                        : [`${value.toFixed(2)}%`, 'Drawdown']
                    }
                  />
                  <Line
                    yAxisId="equity"
                    type="monotone"
                    dataKey="equity"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Area
                    yAxisId="dd"
                    type="monotone"
                    dataKey="drawdownPct"
                    stroke="hsl(0 84% 60%)"
                    fill="hsl(0 84% 60% / 0.1)"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
