import { cn } from '@/lib/utils'
import type { PortfolioTrade } from '@/types/portfolio'

interface TradeHistoryProps {
  trades: PortfolioTrade[]
}

export function TradeHistory({ trades }: TradeHistoryProps) {
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
            <th className="px-3 py-3 text-right font-medium">P&L</th>
            <th className="px-3 py-3 text-right font-medium">R-Multiple</th>
            <th className="px-3 py-3 text-left font-medium">Reason</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.tradeId} className="border-b hover:bg-accent/30">
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
              <td className="px-3 py-2 text-muted-foreground">{trade.exitDate}</td>
              <td className="px-3 py-2 text-right font-mono tabular-nums">
                {trade.entryPrice.toFixed(2)}
              </td>
              <td className="px-3 py-2 text-right font-mono tabular-nums">
                {trade.exitPrice.toFixed(2)}
              </td>
              <td
                className={cn(
                  'px-3 py-2 text-right font-mono tabular-nums',
                  trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'
                )}
              >
                ₹{trade.pnl.toLocaleString('en-IN')}
              </td>
              <td
                className={cn(
                  'px-3 py-2 text-right font-mono tabular-nums',
                  (trade.rMultiple ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'
                )}
              >
                {trade.rMultiple?.toFixed(2) ?? '—'}
              </td>
              <td className="px-3 py-2 text-xs text-muted-foreground">
                {trade.exitReason ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {trades.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">No trade history.</p>
      )}
    </div>
  )
}
