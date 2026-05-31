import { useValidatedSignals } from '@/hooks/useSignals'
import { useEarningsByDate } from '@/hooks/useEarnings'
import { useWatchlist } from '@/hooks/useScanner'
import { SignalTable } from '@/components/signals/SignalTable'
import { EarningsRow } from '@/components/earnings/EarningsRow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { today, formatDate } from '@/lib/utils'
import { peadScoreColor } from '@/lib/formatters'
import { cn } from '@/lib/utils'

export function DashboardPage() {
  const todayStr = today()
  const signals = useValidatedSignals(todayStr)
  const earnings = useEarningsByDate(todayStr)
  const watchlist = useWatchlist()

  const avgScore =
    signals.data && signals.data.length > 0
      ? Math.round(signals.data.reduce((s, x) => s + x.peadScore, 0) / signals.data.length)
      : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">{formatDate(todayStr)}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{signals.data?.length ?? '—'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg PEAD Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={cn('text-3xl font-bold', avgScore ? peadScoreColor(avgScore) : '')}>
              {avgScore ?? '—'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Watchlist</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{watchlist.data?.length ?? '—'}</p>
            {watchlist.data && watchlist.data.length > 0 && (
              <p className="mt-1 text-xs text-muted-foreground truncate">
                {[...watchlist.data].sort().slice(0, 6).join(', ')}
                {watchlist.data.length > 6 && ` +${watchlist.data.length - 6}`}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Today's Signals</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {signals.isLoading && <p className="p-6 text-sm text-muted-foreground">Loading…</p>}
          {signals.isError && (
            <p className="p-6 text-sm text-red-400">Failed to load signals.</p>
          )}
          {signals.data && <SignalTable signals={signals.data} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Today's Earnings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {earnings.isLoading && <p className="p-6 text-sm text-muted-foreground">Loading…</p>}
          {earnings.data && earnings.data.length === 0 && (
            <p className="p-6 text-sm text-muted-foreground">No earnings today.</p>
          )}
          {earnings.data && earnings.data.length > 0 && (
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
                  {earnings.data.map((e) => (
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
