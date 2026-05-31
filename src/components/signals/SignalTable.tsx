import { useNavigate } from 'react-router-dom'
import type { ValidatedSignal } from '@/types/signals'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatPct, peadScoreBg } from '@/lib/formatters'
import { STATUS_COLORS, DIRECTION_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface Props {
  signals: ValidatedSignal[]
}

export function SignalTable({ signals }: Props) {
  const navigate = useNavigate()

  if (signals.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No signals found.</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-muted-foreground">
            <th className="px-4 py-3 text-left font-medium">Ticker</th>
            <th className="px-4 py-3 text-left font-medium">Dir</th>
            <th className="px-4 py-3 text-right font-medium">PEAD Score</th>
            <th className="px-4 py-3 text-right font-medium">Entry</th>
            <th className="px-4 py-3 text-right font-medium">Stop</th>
            <th className="px-4 py-3 text-right font-medium">T1</th>
            <th className="px-4 py-3 text-right font-medium">R:R</th>
            <th className="px-4 py-3 text-right font-medium">EPS%</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {signals.map((s) => (
            <tr
              key={s.signalId}
              className="border-b cursor-pointer transition-colors hover:bg-accent/50"
              onClick={() => navigate(`/signals/${s.signalId}`, { state: { ticker: s.ticker } })}
            >
              <td className="px-4 py-3 font-mono font-semibold">{s.ticker}</td>
              <td className="px-4 py-3">
                <Badge className={cn('text-xs', DIRECTION_COLORS[s.direction])}>{s.direction}</Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <Badge className={cn('text-xs font-bold tabular-nums', peadScoreBg(s.peadScore))}>
                  {s.peadScore}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(s.entryPrice)}</td>
              <td className="px-4 py-3 text-right tabular-nums text-red-400">{formatCurrency(s.stopLoss)}</td>
              <td className="px-4 py-3 text-right tabular-nums text-blue-400">{formatCurrency(s.target1)}</td>
              <td className="px-4 py-3 text-right tabular-nums">{s.riskRewardRatio.toFixed(1)}x</td>
              <td className={cn('px-4 py-3 text-right tabular-nums', s.epsSurprisePct && s.epsSurprisePct > 0 ? 'text-green-400' : 'text-red-400')}>
                {formatPct(s.epsSurprisePct)}
              </td>
              <td className="px-4 py-3">
                <Badge className={cn('text-xs', STATUS_COLORS[s.status])}>{s.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
