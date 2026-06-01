import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { BacktestTrade } from '@/types/backtest'

interface TradeTableProps {
  trades: BacktestTrade[]
}

type SortField = 'pnl' | 'rMultiple'
type SortDir = 'asc' | 'desc'

export function TradeTable({ trades }: TradeTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const sorted = [...trades].sort((a, b) => {
    if (!sortField) return 0
    const aVal = a[sortField] ?? 0
    const bVal = b[sortField] ?? 0
    return sortDir === 'asc' ? aVal - bVal : bVal - aVal
  })

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-muted-foreground">
            <th className="px-3 py-3 text-left font-medium">Ticker</th>
            <th className="px-3 py-3 text-left font-medium">Direction</th>
            <th className="px-3 py-3 text-left font-medium">Entry Date</th>
            <th className="px-3 py-3 text-left font-medium">Exit Date</th>
            <th className="px-3 py-3 text-right font-medium">Entry</th>
            <th className="px-3 py-3 text-right font-medium">Exit</th>
            <th
              className="px-3 py-3 text-right font-medium cursor-pointer hover:text-foreground"
              onClick={() => handleSort('pnl')}
            >
              P&L {sortField === 'pnl' && (sortDir === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="px-3 py-3 text-right font-medium cursor-pointer hover:text-foreground"
              onClick={() => handleSort('rMultiple')}
            >
              R-Multiple {sortField === 'rMultiple' && (sortDir === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-3 py-3 text-right font-medium">Score</th>
            <th className="px-3 py-3 text-left font-medium">Exit Reason</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((trade) => (
            <tr key={trade.id} className="border-b hover:bg-accent/30">
              <td className="px-3 py-2 font-mono font-semibold">{trade.ticker}</td>
              <td className="px-3 py-2">
                <span
                  className={cn(
                    'text-xs font-medium px-1.5 py-0.5 rounded',
                    trade.direction === 'LONG'
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-red-500/20 text-red-500'
                  )}
                >
                  {trade.direction}
                </span>
              </td>
              <td className="px-3 py-2 text-muted-foreground">{trade.entryDate}</td>
              <td className="px-3 py-2 text-muted-foreground">{trade.exitDate ?? '—'}</td>
              <td className="px-3 py-2 text-right font-mono tabular-nums">
                {trade.entryPrice.toFixed(2)}
              </td>
              <td className="px-3 py-2 text-right font-mono tabular-nums">
                {trade.exitPrice?.toFixed(2) ?? '—'}
              </td>
              <td
                className={cn(
                  'px-3 py-2 text-right font-mono tabular-nums',
                  trade.pnl != null && trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'
                )}
              >
                {trade.pnl != null ? `₹${trade.pnl.toLocaleString('en-IN')}` : '—'}
              </td>
              <td
                className={cn(
                  'px-3 py-2 text-right font-mono tabular-nums',
                  trade.rMultiple != null && trade.rMultiple >= 0 ? 'text-green-500' : 'text-red-500'
                )}
              >
                {trade.rMultiple != null ? trade.rMultiple.toFixed(2) : '—'}
              </td>
              <td className="px-3 py-2 text-right font-mono tabular-nums">{trade.peadScore}</td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{trade.exitReason ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {sorted.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">No trades found.</p>
      )}
    </div>
  )
}
