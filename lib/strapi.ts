import { Event } from '@/data/events'

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/admin\/?$/, '').replace(/\/$/, '')

export interface Config {
  month: number // 1-12
  year: number
}

const DEFAULT_CONFIG: Config = {
  month: new Date().getMonth() + 1, // Convert from 0-11 to 1-12
  year: new Date().getFullYear(),
}

export async function fetchConfig(): Promise<Config> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/config`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.warn(`Config endpoint returned ${res.status}. Make sure you created the "config" single type in Strapi`)
      return DEFAULT_CONFIG
    }

    const contentType = res.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      console.warn('Config endpoint returned non-JSON response. Using default config.')
      return DEFAULT_CONFIG
    }

    const data = await res.json()

    // Clean values - Strapi Cloud may format numbers with locale separators
    const mes = data.data?.mes ?? data.data?.month ?? DEFAULT_CONFIG.month
    const ano = data.data?.ano ?? data.data?.year ?? DEFAULT_CONFIG.year

    return {
      month: typeof mes === 'string' ? parseInt(mes.replace(/[.,]/g, '')) : mes,
      year: typeof ano === 'string' ? parseInt(ano.replace(/[.,]/g, '')) : ano,
    }
  } catch (error) {
    console.warn('Config not available, using defaults:', error)
    return DEFAULT_CONFIG
  }
}

export async function fetchEvents(): Promise<Event[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/eventos?populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.error('Strapi error:', res.statusText)
      return []
    }
    const data = await res.json()
    console.log(data);
    
    


    
    return data.data?.map((item: any) => {
      const dateField = item.Day || item.date || item.Date || item.published_at || ''
      const day = dateField ? parseInt(dateField.split('-')[2], 10) : 0

      return {
        id: item.id,
        day: day,
        date: dateField,
        title: item.Title || item.title || '',
        cat: item.Category || item.category || 'comunidad',
        time: item.Time || item.time || 'A confirmar',
        desc: item.Description || item.description || '',
        sedes: item.sedes?.map((s: any) => s.name || s) || item.sede || [],
      }
    }) || []
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}
