import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { ValidatedSignal } from '@/types/signals'

interface Props {
  signals: ValidatedSignal[]
}

const BUCKETS = [
  { label: '60–69', min: 60, max: 70 },
  { label: '70–79', min: 70, max: 80 },
  { label: '80–89', min: 80, max: 90 },
  { label: '90–100', min: 90, max: 101 },
]

export function ScoreDistributionChart({ signals }: Props) {
  const data = BUCKETS.map((b) => ({
    label: b.label,
    count: signals.filter((s) => s.peadScore >= b.min && s.peadScore < b.max).length,
    color: b.min >= 80 ? '#22c55e' : '#f59e0b',
  }))

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
        <XAxis dataKey="label" tick={{ fill: 'hsl(215 20.2% 65.1%)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fill: 'hsl(215 20.2% 65.1%)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(222.2 84% 8%)',
            border: '1px solid hsl(217.2 32.6% 17.5%)',
            borderRadius: '6px',
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry, idx) => (
            <Cell key={idx} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
