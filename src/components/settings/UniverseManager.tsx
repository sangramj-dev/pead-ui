import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  useUniverses,
  useUniverseStocks,
  useAddStock,
  useRemoveStock,
  useBackfillUniverse,
} from '@/hooks/useUniverse'
import { Loader2, Trash2 } from 'lucide-react'

export function UniverseManager() {
  const { data: universes } = useUniverses()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data: stocks } = useUniverseStocks(selectedId)
  const addMutation = useAddStock(selectedId)
  const removeMutation = useRemoveStock(selectedId)
  const backfillMutation = useBackfillUniverse()

  // Form state for adding stock
  const [ticker, setTicker] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [sector, setSector] = useState('')
  const [exchange, setExchange] = useState('NSE')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!ticker || !companyName) return
    addMutation.mutate(
      { ticker: ticker.toUpperCase(), companyName, sector: sector || null, exchange },
      {
        onSuccess: () => {
          setTicker('')
          setCompanyName('')
          setSector('')
        },
      }
    )
  }

  // Auto-select first universe when loaded
  if (universes && universes.length > 0 && !selectedId) {
    setSelectedId(universes[0].id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Universe</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Universe</label>
            <select
              value={selectedId ?? ''}
              onChange={(e) => setSelectedId(e.target.value || null)}
              className="rounded-md border bg-background px-3 py-2 text-sm"
            >
              {universes?.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.stockCount} stocks)
                </option>
              ))}
            </select>
          </div>
          {selectedId && (
            <Button
              variant="outline"
              size="sm"
              className="mt-5"
              disabled={backfillMutation.isPending}
              onClick={() => backfillMutation.mutate(selectedId)}
            >
              {backfillMutation.isPending && <Loader2 className="h-3 w-3 animate-spin" />}
              Backfill Data
            </Button>
          )}
        </div>

        {backfillMutation.isSuccess && (
          <p className="text-xs text-green-500">Backfill triggered successfully.</p>
        )}

        {/* Add stock form */}
        <form onSubmit={handleAdd} className="flex items-end gap-2 flex-wrap">
          <div className="space-y-1">
            <label className="text-sm font-medium">Ticker</label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="RELIANCE"
              className="w-28 rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Company</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Reliance Industries"
              className="w-48 rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Sector</label>
            <input
              type="text"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder="Energy"
              className="w-32 rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Exchange</label>
            <input
              type="text"
              value={exchange}
              onChange={(e) => setExchange(e.target.value)}
              className="w-20 rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
          <Button type="submit" size="sm" disabled={addMutation.isPending}>
            {addMutation.isPending && <Loader2 className="h-3 w-3 animate-spin" />}
            Add
          </Button>
        </form>

        {/* Stocks table */}
        {stocks && stocks.length > 0 && (
          <div className="overflow-x-auto rounded-lg border max-h-[400px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-background">
                <tr className="border-b bg-muted/50 text-muted-foreground">
                  <th className="px-3 py-2 text-left font-medium">Ticker</th>
                  <th className="px-3 py-2 text-left font-medium">Company</th>
                  <th className="px-3 py-2 text-left font-medium">Sector</th>
                  <th className="px-3 py-2 text-left font-medium">Exchange</th>
                  <th className="px-3 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((s) => (
                  <tr key={s.ticker} className="border-b hover:bg-accent/30">
                    <td className="px-3 py-2 font-mono font-semibold">{s.ticker}</td>
                    <td className="px-3 py-2">{s.companyName}</td>
                    <td className="px-3 py-2 text-muted-foreground">{s.sector ?? '—'}</td>
                    <td className="px-3 py-2 text-muted-foreground">{s.exchange}</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => removeMutation.mutate(s.ticker)}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                        title="Remove stock"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {stocks && stocks.length === 0 && (
          <p className="text-sm text-muted-foreground">No stocks in this universe.</p>
        )}
      </CardContent>
    </Card>
  )
}
