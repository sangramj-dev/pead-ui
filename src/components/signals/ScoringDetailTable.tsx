import type { ScoringDetail } from '@/types/signals'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  details: ScoringDetail[]
}

const LABELS: Record<string, string> = {
  EPS_SURPRISE: 'EPS Surprise',
  REVENUE_SURPRISE: 'Revenue Surprise',
  GAP_STRENGTH: 'Gap Strength',
  VOLUME: 'Volume',
  TREND: 'Trend Alignment',
  CLOSE_POSITION: 'Close Position',
}

export function ScoringDetailTable({ details }: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Scoring Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {details.map((d) => {
            const pct = d.weight > 0 ? (d.weightedScore / d.weight) * 100 : 0
            return (
              <div key={d.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{LABELS[d.component] ?? d.component}</span>
                  <span className="tabular-nums font-medium">
                    {d.weightedScore}/{d.weight}
                    {d.rawValue != null && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({d.rawValue.toFixed(2)})
                      </span>
                    )}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444',
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
