export interface BacktestRequest {
  startDate: string
  endDate: string
  initialCapital: number
  riskPerTradePct: number
  minEpsSurprisePct: number
  minRevenueSurprisePct: number
  minGapPct: number
  minRelativeVolume: number
  minPeadScore: number
  maxConcurrentPositions: number
  profitTarget1R: number
  profitTarget2R: number
  universeId: string
  exchange: string
}

export interface BacktestSummary {
  backtestId: string
  status: 'RUNNING' | 'COMPLETED' | 'FAILED'
  totalTrades: number
  winningTrades: number
  losingTrades: number
  winRate: number
  profitFactor: number
  sharpeRatio: number
  maxDrawdownPct: number
  totalPnl: number
  finalEquity: number
  cagr: number
  avgRMultiple: number
  executionTimeMs: number
  createdAt: string
  completedAt: string | null
}

export interface BacktestTrade {
  id: string
  ticker: string
  direction: 'LONG' | 'SHORT'
  entryDate: string
  exitDate: string | null
  entryPrice: number
  exitPrice: number | null
  quantity: number
  pnl: number | null
  rMultiple: number | null
  peadScore: number
  exitReason: string | null
}

export interface EquityPoint {
  date: string
  equity: number
  drawdownPct: number
  openPositions: number
}
