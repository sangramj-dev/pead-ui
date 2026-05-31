export interface ValidatedSignal {
  signalId: string
  ticker: string
  direction: 'LONG' | 'SHORT'
  signalDate: string
  earningsDate: string | null
  peadScore: number
  entryPrice: number
  stopLoss: number
  target1: number
  target2: number
  riskRewardRatio: number
  epsSurprisePct: number | null
  revenueSurprisePct: number | null
  gapPct: number | null
  relVolume: number | null
  ema20: number | null
  ema50: number | null
  aboveEma20: boolean | null
  aboveEma50: boolean | null
  closeNearHigh: boolean | null
  status: 'ACTIVE' | 'TRIGGERED' | 'EXPIRED' | 'INVALIDATED'
  expiryDate: string | null
  correlationId: string | null
  createdAt: string
}

export interface ScoringDetail {
  id: string
  signalId: string
  component: string
  rawValue: number | null
  score: number
  weight: number
  weightedScore: number
}

export interface RejectedCandidate {
  id: string
  ticker: string
  scanDate: string
  rejectionReasons: string
  rawMetrics: string | null
  createdAt: string
}
