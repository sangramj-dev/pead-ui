import { useState } from 'react'
import { useValidatedSignals, useRejectedCandidates } from '@/hooks/useSignals'
import { SignalTable } from '@/components/signals/SignalTable'
import { ScoreDistributionChart } from '@/components/charts/ScoreDistributionChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { today } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { addDays, format, parseISO } from 'date-fns'

export function SignalsPage() {
  const [date, setDate] = useState(today())
  const validatedQuery = useValidatedSignals(date)
  const rejectedQuery = useRejectedCandidates(date)

  function shiftDate(days: number) {
    setDate((d) => format(addDays(parseISO(d), days), 'yyyy-MM-dd'))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Signals</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => shiftDate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm min-w-[120px] text-center">{formatDate(date)}</span>
          <Button variant="outline" size="icon" onClick={() => shiftDate(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDate(today())}>
            Today
          </Button>
        </div>
      </div>

      {validatedQuery.data && validatedQuery.data.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreDistributionChart signals={validatedQuery.data} />
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="validated">
        <TabsList>
          <TabsTrigger value="validated">
            Validated ({validatedQuery.data?.length ?? 0})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedQuery.data?.length ?? 0})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="validated">
          {validatedQuery.isLoading && <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>}
          {validatedQuery.data && <SignalTable signals={validatedQuery.data} />}
        </TabsContent>
        <TabsContent value="rejected">
          {rejectedQuery.isLoading && <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>}
          {rejectedQuery.data && rejectedQuery.data.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No rejected candidates.</p>
          )}
          {rejectedQuery.data && rejectedQuery.data.length > 0 && (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-muted-foreground">
                    <th className="px-4 py-3 text-left font-medium">Ticker</th>
                    <th className="px-4 py-3 text-left font-medium">Rejection Reasons</th>
                  </tr>
                </thead>
                <tbody>
                  {rejectedQuery.data.map((c) => {
                    let reasons: string[] = []
                    try {
                      const parsed = JSON.parse(c.rejectionReasons) as unknown
                      reasons = Array.isArray(parsed) ? (parsed as string[]) : [String(parsed)]
                    } catch {
                      reasons = [c.rejectionReasons]
                    }
                    return (
                      <tr key={c.id} className="border-b hover:bg-accent/30">
                        <td className="px-4 py-3 font-mono font-semibold align-top">{c.ticker}</td>
                        <td className="px-4 py-3">
                          <ul className="space-y-0.5">
                            {reasons.map((r, i) => (
                              <li key={i} className="text-xs text-muted-foreground">• {r}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
