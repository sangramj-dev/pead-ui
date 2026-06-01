import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import type { BacktestTrade } from '@/types/backtest'

interface MonthlyReturnsProps {
  trades: BacktestTrade[]
  initialCapital: number
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function MonthlyReturns({ trades, initialCapital }: MonthlyReturnsProps) {
  const { grid, years } = useMemo(() => {
    const monthlyPnl: Record<string, number> = {}

    for (const trade of trades) {
      if (trade.pnl == null || !trade.exitDate) continue
      const [year, month] = trade.exitDate.split('-')
      const key = `${year}-${month}`
      monthlyPnl[key] = (monthlyPnl[key] || 0) + trade.pnl
    }

    const allYears = [...new Set(Object.keys(monthlyPnl).map((k) => k.split('-')[0]))].sort()

    const gridData: Record<string, Record<string, number>> = {}
    for (const year of allYears) {
      gridData[year] = {}
      for (let m = 1; m <= 12; m++) {
        const key = `${year}-${String(m).padStart(2, '0')}`
        if (monthlyPnl[key] !== undefined) {
          gridData[year][String(m)] = (monthlyPnl[key] / initialCapital) * 100
        }
      }
    }

    return { grid: gridData, years: allYears }
  }, [trades, initialCapital])

  if (years.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No monthly data available.</p>
  }

  function cellColor(pct: number | undefined): string {
    if (pct === undefined) return 'bg-muted/30'
    if (pct > 5) return 'bg-green-600/60 text-green-100'
    if (pct > 2) return 'bg-green-500/40 text-green-200'
    if (pct > 0) return 'bg-green-400/20 text-green-300'
    if (pct > -2) return 'bg-red-400/20 text-red-300'
    if (pct > -5) return 'bg-red-500/40 text-red-200'
    return 'bg-red-600/60 text-red-100'
  }

  return (
    <div className="overflow-x-auto">
      <table className="text-xs">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left font-medium text-muted-foreground">Year</th>
            {MONTHS.map((m) => (
              <th key={m} className="px-2 py-1 text-center font-medium text-muted-foreground">
                {m}
              </th>
            ))}
            <th className="px-2 py-1 text-center font-medium text-muted-foreground">Total</th>
          </tr>
        </thead>
        <tbody>
          {years.map((year) => {
            const yearTotal = Object.values(grid[year]).reduce((s, v) => s + v, 0)
            return (
              <tr key={year}>
                <td className="px-2 py-1 font-mono font-medium">{year}</td>
                {Array.from({ length: 12 }, (_, i) => {
                  const val = grid[year][String(i + 1)]
                  return (
                    <td key={i} className="px-1 py-1">
                      <div
                        className={cn(
                          'rounded px-2 py-1 text-center font-mono tabular-nums min-w-[48px]',
                          cellColor(val)
                        )}
                      >
                        {val !== undefined ? `${val.toFixed(1)}%` : '—'}
                      </div>
                    </td>
                  )
                })}
                <td className="px-1 py-1">
                  <div
                    className={cn(
                      'rounded px-2 py-1 text-center font-mono tabular-nums font-semibold min-w-[48px]',
                      cellColor(yearTotal)
                    )}
                  >
                    {yearTotal.toFixed(1)}%
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
