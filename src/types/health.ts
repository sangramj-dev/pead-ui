export interface ServiceHealth {
  status: 'UP' | 'DOWN' | 'UNKNOWN'
  service?: string
}

export interface ServiceHealthState {
  name: string
  status: 'UP' | 'DOWN' | 'LOADING' | 'ERROR'
}
