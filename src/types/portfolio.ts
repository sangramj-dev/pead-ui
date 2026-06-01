export interface PortfolioPosition {
  positionId: string
  ticker: string
  direction: 'LONG' | 'SHORT'
  quantity: number
  entryPrice: number
  currentPrice: number | null
  stopLoss: number
  target1: number
  target2: number
  unrealisedPnl: number
  status: string
}

export interface PortfolioTrade {
  tradeId: string
  ticker: string
  direction: 'LONG' | 'SHORT'
  quantity: number
  entryPrice: number
  exitPrice: number
  pnl: number
  rMultiple: number | null
  peadScore: number | null
  entryDate: string
  exitDate: string
  exitReason: string | null
}

export interface PortfolioSummary {
  totalEquity: number
  cash: number
  unrealisedPnl: number
  realisedPnl: number
  openPositionsCount: number
  totalTrades: number
  winRate: number
}

export interface PortfolioEquityPoint {
  equityDate: string
  totalEquity: number
  cash: number
  positionsValue: number
  dailyPnl: number | null
  drawdownPct: number | null
}
