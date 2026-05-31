import type { ValidatedSignal } from '@/types/signals'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatters'

interface Props {
  signal: ValidatedSignal
}

export function TradeSetupPanel({ signal }: Props) {
  const range = signal.target2 - signal.stopLoss
  const pct = (v: number) => ((v - signal.stopLoss) / range) * 100

  const levels = [
    { label: 'Stop', value: signal.stopLoss, color: '#ef4444', pct: 0 },
    { label: 'Entry', value: signal.entryPrice, color: '#22c55e', pct: pct(signal.entryPrice) },
    { label: 'T1', value: signal.target1, color: '#3b82f6', pct: pct(signal.target1) },
    { label: 'T2', value: signal.target2, color: '#06b6d4', pct: 100 },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Trade Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-6 rounded-full bg-muted overflow-hidden mb-4">
          {levels.slice(1).map((l, i) => (
            <div
              key={l.label}
              className="absolute top-0 h-full"
              style={{
                left: `${levels[i].pct}%`,
                width: `${l.pct - levels[i].pct}%`,
                backgroundColor: l.color,
                opacity: 0.3 + i * 0.15,
              }}
            />
          ))}
          {levels.map((l) => (
            <div
              key={l.label}
              className="absolute top-0 h-full w-0.5"
              style={{ left: `${l.pct}%`, backgroundColor: l.color }}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          {levels.map((l) => (
            <div key={l.label}>
              <p className="text-xs font-semibold" style={{ color: l.color }}>
                {l.label}
              </p>
              <p className="text-sm tabular-nums font-mono">{formatCurrency(l.value)}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Risk:Reward{' '}
          <span className="font-semibold text-foreground">
            1:{signal.riskRewardRatio.toFixed(2)}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
