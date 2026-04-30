export interface Event {
  id: number
  day: number
  date: string // ISO format: YYYY-MM-DD
  title: string
  cat: 'cuerpo' | 'mente' | 'comunidad' | 'feriado'
  time: string
  desc: string
  sedes: string[]
  url?: string
}

export const MOCK_EVENTS: Event[] = [
]
