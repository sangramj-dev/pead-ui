import { useWatchlist, useRemoveFromWatchlist } from '@/hooks/useScanner'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/useToast'
import { Trash2 } from 'lucide-react'

export function WatchlistTable() {
  const { data: tickers, isLoading } = useWatchlist()
  const remove = useRemoveFromWatchlist()
  const { toast } = useToast()

  function handleRemove(ticker: string) {
    remove.mutate(ticker, {
      onSuccess: () => toast({ title: `Removed ${ticker} from watchlist` }),
      onError: () => toast({ variant: 'destructive', title: `Failed to remove ${ticker}` }),
    })
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading watchlist…</p>
  if (!tickers || tickers.length === 0)
    return <p className="text-sm text-muted-foreground">No tickers on watchlist.</p>

  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ticker</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...tickers].sort().map((ticker) => (
            <tr key={ticker} className="border-b hover:bg-accent/30 transition-colors">
              <td className="px-4 py-3 font-mono font-semibold">{ticker}</td>
              <td className="px-4 py-3 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-red-400"
                  onClick={() => handleRemove(ticker)}
                  disabled={remove.isPending}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
