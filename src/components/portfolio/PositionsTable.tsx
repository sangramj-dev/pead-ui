import { cn } from '@/lib/utils'
import type { PortfolioPosition } from '@/types/portfolio'

interface PositionsTableProps {
  positions: PortfolioPosition[]
}

export function PositionsTable({ positions }: PositionsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-muted-foreground">
            <th className="px-3 py-3 text-left font-medium">Ticker</th>
            <th className="px-3 py-3 text-left font-medium">Direction</th>
            <th className="px-3 py-3 text-right font-medium">Qty</th>
            <th className="px-3 py-3 text-right font-medium">Entry</th>
            <th className="px-3 py-3 text-right font-medium">Current</th>
            <th className="px-3 py-3 text-right font-medium">Unrealized P&L</th>
            <th className="px-3 py-3 text-right font-medium">Stop Loss</th>
            <th className="px-3 py-3 text-right font-medium">Target 1</th>
            <th className="px-3 py-3 text-right font-medium">Target 2</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => (
            <tr key={pos.positionId} className="border-b hover:bg-accent/30">
              <td className="px-3 py-2 font-mono font-semibold">{pos.ticker}</td>
              <td className="px-3 py-2">
                <span
                  className={cn(
                    'text-xs font-medium px-1.5 py-0.5 rounded',
                    pos.direction === 'LONG'
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-red-500/20 text-red-500'
                  )}
                >
                  {pos.direction}
                </span>
              </td>
              <td className="px-3 py-2 text-right font-mono tabular-nums">{pos.quantity}</td>
              <td className="px-3 py-2 text-right font-mono tabular-nums">
                {pos.entryPrice.toFixed(2)}
              </td>
              <td className="px-3 py-2 text-right font-mono tabular-nums">
                {pos.currentPrice?.toFixed(2) ?? '—'}
              </td>
              <td
                className={cn(
                  'px-3 py-2 text-right font-mono tabular-nums',
                  pos.unrealisedPnl >= 0 ? 'text-green-500' : 'text-red-500'
                )}
              >
                ₹{pos.unrealisedPnl.toLocaleString('en-IN')}
              </td>
              <td className="px-3 py-2 text-right font-mono tabular-nums text-red-400">
                {pos.stopLoss.toFixed(2)}
              </td>
              <td className="px-3 py-2 text-right font-mono tabular-nums text-muted-foreground">
                {pos.target1.toFixed(2)}
              </td>
              <td className="px-3 py-2 text-right font-mono tabular-nums text-muted-foreground">
                {pos.target2.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {positions.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">No open positions.</p>
      )}
    </div>
  )
}
