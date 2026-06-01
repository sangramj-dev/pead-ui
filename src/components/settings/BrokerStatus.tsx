import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function BrokerStatus() {
  const mode = 'Paper Trading'
  const connected = false

  return (
    <Card>
      <CardHeader>
        <CardTitle>Broker Connection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Mode</p>
            <p className="text-sm text-muted-foreground">{mode}</p>
          </div>
          <span
            className={
              connected
                ? 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-500/20 text-green-500'
                : 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-500/20 text-yellow-500'
            }
          >
            {connected ? 'Connected' : 'Not Connected'}
          </span>
        </div>

        <div className="rounded-md border p-3 space-y-2">
          <p className="text-sm font-medium">Zerodha Kite Connect</p>
          <p className="text-xs text-muted-foreground">
            Real-time order execution via Zerodha Kite Connect API. Requires an active Kite Connect
            subscription.
          </p>
          <Button variant="outline" size="sm" disabled title="Subscribe to Kite Connect first">
            Connect Zerodha
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
