export interface PriceBar {
  id: number
  ticker: string
  barDate: string
  timeframe: string
  openPrice: number
  highPrice: number
  lowPrice: number
  closePrice: number
  volume: number
  vwap: number | null
}

export interface DailyIndicator {
  id: number
  ticker: string
  indicatorDate: string
  ema20: number | null
  ema50: number | null
  sma200: number | null
  atr14: number | null
  relVolume: number | null
  avgVolume20d: number | null
  closePrice: number | null
  pctFromHigh: number | null
  aboveEma20: boolean | null
  aboveEma50: boolean | null
}

export interface BackfillResponse {
  ticker: string
  barsProcessed: number
  status: string
}
