import { useState } from 'react'
import { addWeeks, format, parseISO } from 'date-fns'
import { useEarningsByRange } from '@/hooks/useEarnings'
import { EarningsRow } from '@/components/earnings/EarningsRow'
import { TriggerIngestionButton } from '@/components/earnings/TriggerIngestionButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { weekBounds, today } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function EarningsPage() {
  const [weekStart, setWeekStart] = useState(() => {
    const { start } = weekBounds(new Date())
    return start
  })

  const { end: weekEnd } = weekBounds(parseISO(weekStart))
  const earningsQuery = useEarningsByRange(weekStart, weekEnd)

  const earnings = earningsQuery.data ?? []

  const byDate: Record<string, typeof earnings> = {}
  for (const e of earnings) {
    byDate[e.announcementDate] = byDate[e.announcementDate] ?? []
    byDate[e.announcementDate].push(e)
  }

  const days: string[] = []
  const cursor = parseISO(weekStart)
  for (let i = 0; i < 5; i++) {
    days.push(format(new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + i), 'yyyy-MM-dd'))
  }

  function shiftWeek(n: number) {
    setWeekStart((s) => format(addWeeks(parseISO(s), n), 'yyyy-MM-dd'))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Earnings Calendar</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => shiftWeek(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm min-w-[160px] text-center">
            {weekStart} — {weekEnd}
          </span>
          <Button variant="outline" size="icon" onClick={() => shiftWeek(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setWeekStart(weekBounds(new Date()).start)}>
            This week
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {days.map((day) => {
          const dayEarnings = byDate[day] ?? []
          const dayLabel = format(parseISO(day), 'EEE MMM d')
          return (
            <Card key={day} className={day === today() ? 'ring-1 ring-primary' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{dayLabel}</CardTitle>
                  <TriggerIngestionButton date={day} />
                </div>
              </CardHeader>
              <CardContent>
                {dayEarnings.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No earnings</p>
                ) : (
                  <div className="space-y-1">
                    {dayEarnings.map((e) => (
                      <div key={e.id} className="flex items-center justify-between rounded px-2 py-1 hover:bg-accent/30">
                        <span className="font-mono text-xs font-semibold">{e.ticker}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">{e.announcementTime ?? ''}</span>
                          {e.bothBeat && <span className="text-yellow-400 text-xs">★</span>}
                          {e.epsBeat != null && (
                            <span className={`text-xs ${e.epsBeat ? 'text-green-400' : 'text-red-400'}`}>
                              {e.epsBeat ? '✓' : '✗'}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Earnings This Week</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {earningsQuery.isLoading && <p className="p-6 text-sm text-muted-foreground">Loading…</p>}
          {earnings.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-muted-foreground">
                    <th className="px-4 py-3 text-left font-medium">Ticker</th>
                    <th className="px-4 py-3 text-left font-medium">Time</th>
                    <th className="px-4 py-3 text-right font-medium">EPS</th>
                    <th className="px-4 py-3 text-right font-medium">EPS%</th>
                    <th className="px-4 py-3 text-right font-medium">Revenue</th>
                    <th className="px-4 py-3 text-right font-medium">Rev%</th>
                    <th className="px-4 py-3 text-center font-medium">Beat</th>
                  </tr>
                </thead>
                <tbody>
                  {earnings.map((e) => (
                    <EarningsRow key={e.id} earning={e} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
