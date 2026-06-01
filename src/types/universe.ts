export interface StockUniverse {
  id: string
  name: string
  description: string | null
  stockCount: number
}

export interface UniverseStock {
  ticker: string
  companyName: string
  sector: string | null
  exchange: string
}
