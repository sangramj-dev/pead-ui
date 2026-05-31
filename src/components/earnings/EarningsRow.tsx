import type { EarningsAnnouncement } from '@/types/earnings'
import { Badge } from '@/components/ui/badge'
import { formatPct, formatLargeNumber } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

interface Props {
  earning: EarningsAnnouncement
}

export function EarningsRow({ earning: e }: Props) {
  return (
    <tr className="border-b text-sm hover:bg-accent/30 transition-colors">
      <td className="px-4 py-2 font-mono font-semibold">{e.ticker}</td>
      <td className="px-4 py-2 text-muted-foreground text-xs">{e.announcementTime ?? '—'}</td>
      <td className="px-4 py-2 text-right tabular-nums">
        {e.epsActual != null ? e.epsActual.toFixed(2) : '—'}
        {e.epsEstimate != null && (
          <span className="ml-1 text-xs text-muted-foreground">/ {e.epsEstimate.toFixed(2)}</span>
        )}
      </td>
      <td className={cn('px-4 py-2 text-right tabular-nums', e.epsSurprisePct && e.epsSurprisePct > 0 ? 'text-green-400' : 'text-red-400')}>
        {formatPct(e.epsSurprisePct)}
      </td>
      <td className="px-4 py-2 text-right tabular-nums">{formatLargeNumber(e.revenueActual)}</td>
      <td className={cn('px-4 py-2 text-right tabular-nums', e.revenueSurprisePct && e.revenueSurprisePct > 0 ? 'text-green-400' : 'text-red-400')}>
        {formatPct(e.revenueSurprisePct)}
      </td>
      <td className="px-4 py-2 text-center">
        <div className="flex items-center justify-center gap-1">
          {e.epsBeat != null && (
            <Badge className={cn('text-xs', e.epsBeat ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30')}>
              EPS {e.epsBeat ? '✓' : '✗'}
            </Badge>
          )}
          {e.bothBeat && <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />}
        </div>
      </td>
    </tr>
  )
}
