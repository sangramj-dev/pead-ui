import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useBackfill } from '@/hooks/useMarket'
import { useToast } from '@/hooks/useToast'

interface Props {
  ticker: string
}

export function BackfillPanel({ ticker }: Props) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const backfill = useBackfill()
  const { toast } = useToast()

  function handleBackfill() {
    if (!from || !to) return
    backfill.mutate(
      { ticker, from, to },
      {
        onSuccess: (data) => {
          toast({
            title: 'Backfill complete',
            description: `Processed ${data.barsProcessed} bars for ${ticker}`,
          })
        },
        onError: (err) => {
          toast({
            variant: 'destructive',
            title: 'Backfill failed',
            description: err instanceof Error ? err.message : 'Unknown error',
          })
        },
      }
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Backfill Market Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <div>
            <label className="text-xs text-muted-foreground">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="block rounded-md border bg-background px-3 py-1.5 text-sm text-foreground"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="block rounded-md border bg-background px-3 py-1.5 text-sm text-foreground"
            />
          </div>
          <Button
            size="sm"
            onClick={handleBackfill}
            disabled={!from || !to || backfill.isPending}
          >
            {backfill.isPending ? 'Running…' : 'Backfill'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
