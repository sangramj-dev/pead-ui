import type { ValidatedSignal } from '@/types/signals'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { formatPct, peadScoreBg } from '@/lib/formatters'
import { STATUS_COLORS, DIRECTION_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface Props {
  signal: ValidatedSignal
}

export function SignalCard({ signal }: Props) {
  const daysToExpiry = signal.expiryDate
    ? Math.ceil(
        (new Date(signal.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
    : null

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold font-mono">{signal.ticker}</h2>
              <Badge className={cn(DIRECTION_COLORS[signal.direction])}>{signal.direction}</Badge>
              <Badge className={cn(STATUS_COLORS[signal.status])}>{signal.status}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Signal date: {formatDate(signal.signalDate)}
              {signal.earningsDate && ` · Earnings: ${formatDate(signal.earningsDate)}`}
            </p>
          </div>
          <div className="text-right">
            <Badge className={cn('text-2xl px-3 py-1', peadScoreBg(signal.peadScore))}>
              {signal.peadScore}
            </Badge>
            <p className="mt-1 text-xs text-muted-foreground">PEAD Score</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'EPS Surprise', value: formatPct(signal.epsSurprisePct) },
            { label: 'Rev Surprise', value: formatPct(signal.revenueSurprisePct) },
            { label: 'Gap', value: formatPct(signal.gapPct) },
            { label: 'Rel Volume', value: signal.relVolume ? `${signal.relVolume.toFixed(1)}x` : '—' },
          ].map((m) => (
            <div key={m.label} className="rounded-md bg-muted/50 px-3 py-2">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-sm font-semibold tabular-nums">{m.value}</p>
            </div>
          ))}
        </div>
        {daysToExpiry != null && (
          <p className="mt-3 text-xs text-muted-foreground">
            {daysToExpiry > 0
              ? `Expires in ${daysToExpiry} day${daysToExpiry !== 1 ? 's' : ''}`
              : 'Expired'}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
