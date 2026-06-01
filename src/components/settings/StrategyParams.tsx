import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ParamGroup {
  title: string
  params: { label: string; value: string }[]
}

const STRATEGY_GROUPS: ParamGroup[] = [
  {
    title: 'Scanner',
    params: [
      { label: 'Min EPS Surprise', value: '3%' },
      { label: 'Min Revenue Surprise', value: '2%' },
      { label: 'Min Gap', value: '5%' },
      { label: 'Min Relative Volume', value: '2x' },
      { label: 'Min PEAD Score', value: '60' },
    ],
  },
  {
    title: 'Risk',
    params: [
      { label: 'Risk per Trade', value: '1%' },
      { label: 'Max Concurrent Positions', value: '5' },
      { label: 'Max Portfolio Risk', value: '5%' },
    ],
  },
  {
    title: 'Targets',
    params: [
      { label: 'Profit Target 1R', value: '2R' },
      { label: 'Profit Target 2R', value: '3R' },
      { label: 'Trailing Stop', value: '1R' },
    ],
  },
]

export function StrategyParams() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {STRATEGY_GROUPS.map((group) => (
          <div key={group.title}>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">{group.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {group.params.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center justify-between rounded-md border px-3 py-2"
                >
                  <span className="text-sm">{p.label}</span>
                  <span className="text-sm font-mono tabular-nums font-medium">{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="text-xs text-muted-foreground italic">
          Edit via application.yml — live parameter editing is not yet available.
        </p>
      </CardContent>
    </Card>
  )
}
