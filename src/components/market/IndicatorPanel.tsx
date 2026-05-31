import type { DailyIndicator } from '@/types/market'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatNumber, formatPct } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle } from 'lucide-react'

interface Props {
  indicator: DailyIndicator
}

export function IndicatorPanel({ indicator: d }: Props) {
  const items = [
    { label: 'EMA 20', value: d.ema20 != null ? formatCurrency(d.ema20) : '—', indicator: d.aboveEma20 },
    { label: 'EMA 50', value: d.ema50 != null ? formatCurrency(d.ema50) : '—', indicator: d.aboveEma50 },
    { label: 'SMA 200', value: d.sma200 != null ? formatCurrency(d.sma200) : '—', indicator: null },
    { label: 'ATR 14', value: d.atr14 != null ? formatCurrency(d.atr14) : '—', indicator: null },
    { label: 'Rel Volume', value: d.relVolume != null ? `${formatNumber(d.relVolume)}x` : '—', indicator: d.relVolume != null ? d.relVolume >= 2 : null },
    { label: 'Pct from High', value: formatPct(d.pctFromHigh != null ? -d.pctFromHigh : null), indicator: null },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Technical Indicators</CardTitle>
        <p className="text-xs text-muted-foreground">{d.indicatorDate}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.label} className="rounded-md bg-muted/50 px-3 py-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                {item.indicator != null &&
                  (item.indicator ? (
                    <CheckCircle className="h-3 w-3 text-green-400" />
                  ) : (
                    <XCircle className="h-3 w-3 text-red-400" />
                  ))}
              </div>
              <p className={cn('text-sm font-semibold tabular-nums')}>{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
