export interface EarningsAnnouncement {
  id: number
  ticker: string
  announcementDate: string
  announcementTime: 'BMO' | 'AMC' | 'UNKNOWN' | null
  fiscalQuarter: string | null
  fiscalYear: number | null
  epsActual: number | null
  epsEstimate: number | null
  epsSurprisePct: number | null
  epsBeat: boolean | null
  revenueActual: number | null
  revenueEstimate: number | null
  revenueSurprisePct: number | null
  revenueBeat: boolean | null
  bothBeat: boolean | null
  source: string
}

export interface TriggerIngestionResponse {
  date: string
  recordsIngested: number
  status: string
}
