import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { PortfolioEquityPoint } from '@/types/portfolio'

interface EquityChartProps {
  data: PortfolioEquityPoint[]
}

function formatInr(value: number): string {
  return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

export function EquityChart({ data }: EquityChartProps) {
  if (data.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No equity data available.</p>
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Portfolio Equity Curve</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <XAxis
                dataKey="equityDate"
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
                formatter={(value: number, name: string) => {
                  if (name === 'totalEquity') return [formatInr(value), 'Equity']
                  if (name === 'drawdownPct') return [`${value.toFixed(2)}%`, 'Drawdown']
                  return [formatInr(value), name]
                }}
              />
              <Line
                yAxisId="equity"
                type="monotone"
                dataKey="totalEquity"
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
  )
}
