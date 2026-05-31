import { WatchlistTable } from '@/components/scanner/WatchlistTable'
import { useWatchlist } from '@/hooks/useScanner'

export function WatchlistPage() {
  const { data: tickers } = useWatchlist()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Scanner Watchlist</h1>
          <p className="text-sm text-muted-foreground">
            Active candidates from the Kafka Streams scanner
            {tickers && ` · ${tickers.length} ticker${tickers.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>
      <WatchlistTable />
    </div>
  )
}
