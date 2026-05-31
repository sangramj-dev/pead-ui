export const SCORE_THRESHOLDS = {
  HIGH: 80,
  PASS: 60,
} as const

export const STATUS_COLORS = {
  ACTIVE: 'bg-green-500/20 text-green-400 border-green-500/30',
  TRIGGERED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  EXPIRED: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  INVALIDATED: 'bg-red-500/20 text-red-400 border-red-500/30',
} as const

export const DIRECTION_COLORS = {
  LONG: 'bg-green-500/20 text-green-400 border-green-500/30',
  SHORT: 'bg-red-500/20 text-red-400 border-red-500/30',
} as const

export const SCORING_COMPONENTS = [
  { key: 'EPS_SURPRISE', label: 'EPS Surprise', maxWeight: 25 },
  { key: 'REVENUE_SURPRISE', label: 'Revenue Surprise', maxWeight: 20 },
  { key: 'GAP_STRENGTH', label: 'Gap Strength', maxWeight: 20 },
  { key: 'VOLUME', label: 'Volume', maxWeight: 15 },
  { key: 'TREND', label: 'Trend', maxWeight: 10 },
  { key: 'CLOSE_POSITION', label: 'Close Position', maxWeight: 10 },
] as const

export const CHART_COLORS = {
  ema20: '#f59e0b',
  ema50: '#8b5cf6',
  entry: '#22c55e',
  stop: '#ef4444',
  target1: '#3b82f6',
  target2: '#06b6d4',
} as const
