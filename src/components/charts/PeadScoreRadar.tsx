import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { ScoringDetail } from '@/types/signals'

interface Props {
  details: ScoringDetail[]
}

const AXIS_LABELS: Record<string, string> = {
  EPS_SURPRISE: 'EPS Surprise',
  REVENUE_SURPRISE: 'Rev Surprise',
  GAP_STRENGTH: 'Gap Strength',
  VOLUME: 'Volume',
  TREND: 'Trend',
  CLOSE_POSITION: 'Close Pos',
}

export function PeadScoreRadar({ details }: Props) {
  const data = details.map((d) => ({
    axis: AXIS_LABELS[d.component] ?? d.component,
    value: d.weight > 0 ? Math.round((d.weightedScore / d.weight) * 100) : 0,
    rawValue: d.rawValue,
    score: d.score,
    weight: d.weight,
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data}>
        <PolarGrid stroke="hsl(217.2 32.6% 17.5%)" />
        <PolarAngleAxis
          dataKey="axis"
          tick={{ fill: 'hsl(215 20.2% 65.1%)', fontSize: 11 }}
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.25}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(222.2 84% 8%)',
            border: '1px solid hsl(217.2 32.6% 17.5%)',
            borderRadius: '6px',
          }}
          formatter={(value: number, _name: string, props: { payload?: { weight: number; score: number; rawValue: number | null } }) => [
            `${value}% (${props.payload?.score ?? 0}/${props.payload?.weight ?? 0} pts)`,
            props.payload?.rawValue != null ? `Raw: ${props.payload.rawValue.toFixed(2)}` : '',
          ]}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
