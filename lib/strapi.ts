import type { Event } from '@/data/events'

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/admin\/?$/, '').replace(/\/$/, '')

// Tiempo máximo de espera por request a Strapi antes de fallar.
// Evita que la página quede colgada ~100s cuando Strapi no responde.
const STRAPI_TIMEOUT_MS = 8000

/**
 * Comprueba que Strapi esté respondiendo. Lanza un error si está caído o lento.
 * Se usa en la home para mostrar la página de mantenimiento (404) cuando falla.
 */
export async function checkStrapiHealth(): Promise<void> {
  const res = await fetch(`${STRAPI_URL}/api/config`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS),
    next: { revalidate: 0 },
  })
  // 401/403/404 significa que Strapi está vivo (responde), solo falta config/permiso.
  // 5xx o un throw (timeout / red) significa que está caído.
  if (res.status >= 500) {
    throw new Error(`Strapi unavailable: HTTP ${res.status}`)
  }
}

export interface Config {
  month: number // 1-12
  year: number
  titulo: string // ej: "Mes del"
  tituloDestacado: string // ej: "Trabajador" (en cursiva/rosa)
  subtituloLinea1: string // ej: "Trabajar mejor · Vivir mejor"
  subtituloLinea2: string // ej: "Un mes dedicado a tu cuerpo, mente y comunidad."
  mostrarSorteo: boolean // mostrar/ocultar la seccion de sorteo
  fechaSorteo: string // ej: "Jueves 29 de mayo de 2026"
  fechaSorteoCorta: string // ej: "29 de mayo"
  mostrarMasterclasses: boolean // mostrar/ocultar la seccion de masterclasses
  mostrarGaleria: boolean // mostrar/ocultar la galeria del mes anterior
  tituloGaleria: string // ej: "El mes pasado"
  subtituloGaleria: string // ej: "Así lo vivimos"
}

const DEFAULT_CONFIG: Config = {
  month: new Date().getMonth() + 1, // Convert from 0-11 to 1-12
  year: new Date().getFullYear(),
  titulo: 'Mes del',
  tituloDestacado: 'Trabajador',
  subtituloLinea1: 'Trabajar mejor · Vivir mejor',
  subtituloLinea2: 'Un mes dedicado a tu cuerpo, mente y comunidad.',
  mostrarSorteo: true,
  fechaSorteo: 'Jueves 29 de mayo de 2026',
  fechaSorteoCorta: '29 de mayo',
  mostrarMasterclasses: true,
  mostrarGaleria: true,
  tituloGaleria: 'El mes pasado',
  subtituloGaleria: 'Así lo vivimos',
}

export async function fetchConfig(): Promise<Config> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/config`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS),
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
      titulo: data.data?.titulo ?? data.data?.Titulo ?? DEFAULT_CONFIG.titulo,
      tituloDestacado: data.data?.tituloDestacado ?? data.data?.TituloDestacado ?? DEFAULT_CONFIG.tituloDestacado,
      subtituloLinea1: data.data?.subtituloLinea1 ?? data.data?.SubtituloLinea1 ?? DEFAULT_CONFIG.subtituloLinea1,
      subtituloLinea2: data.data?.subtituloLinea2 ?? data.data?.SubtituloLinea2 ?? DEFAULT_CONFIG.subtituloLinea2,
      mostrarSorteo: data.data?.mostrarSorteo ?? data.data?.MostrarSorteo ?? DEFAULT_CONFIG.mostrarSorteo,
      fechaSorteo: data.data?.fechaSorteo ?? data.data?.FechaSorteo ?? DEFAULT_CONFIG.fechaSorteo,
      fechaSorteoCorta: data.data?.fechaSorteoCorta ?? data.data?.FechaSorteoCorta ?? DEFAULT_CONFIG.fechaSorteoCorta,
      mostrarMasterclasses: data.data?.mostrarMasterclasses ?? data.data?.MostrarMasterclasses ?? DEFAULT_CONFIG.mostrarMasterclasses,
      mostrarGaleria: data.data?.mostrarGaleria ?? data.data?.MostrarGaleria ?? DEFAULT_CONFIG.mostrarGaleria,
      tituloGaleria: data.data?.tituloGaleria ?? data.data?.TituloGaleria ?? DEFAULT_CONFIG.tituloGaleria,
      subtituloGaleria: data.data?.subtituloGaleria ?? data.data?.SubtituloGaleria ?? DEFAULT_CONFIG.subtituloGaleria,
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
      signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS),
      next: { revalidate: 0 },
    })
    if (!res.ok) {
      console.error('Strapi error:', res.statusText)
      return []
    }
    const data = await res.json()
    
    


    
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
        url: item.URL || item.url,
      }
    }) || []
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export interface GaleriaFoto {
  id: string | number
  imageUrl: string
  caption: string
}

export async function fetchGaleria(): Promise<GaleriaFoto[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/galerias?populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS),
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.warn(`Galeria endpoint returned ${res.status}. Make sure you created the "galeria" collection in Strapi`)
      return []
    }
    const data = await res.json()

    return data.data?.map((item: any) => {
      const img = item.image || item.imagen || item.foto
      const imageUrl =
        item.imageUrl ||
        img?.url ||
        img?.data?.attributes?.url ||
        ''
      // Strapi puede devolver una url relativa
      const fullUrl = imageUrl && imageUrl.startsWith('/') ? `${STRAPI_URL}${imageUrl}` : imageUrl
      return {
        id: item.id,
        imageUrl: fullUrl,
        caption: item.caption || item.Caption || item.titulo || item.descripcion || '',
      }
    }).filter((f: GaleriaFoto) => f.imageUrl) || []
  } catch (error) {
    console.warn('Galeria not available:', error)
    return []
  }
}

export interface Masterclass {
  id: string | number
  initials: string
  presenter: string
  date: string
  topic: string
  title: string
  description: string
  category: string
  imageUrl: string
}

export async function fetchMasterclasses(): Promise<Masterclass[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/masterclasses?populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS),
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.warn(`Masterclasses endpoint returned ${res.status}. Using mock data.`)
      const { MOCK_MASTERCLASSES } = await import('@/data/masterclasses')
      return MOCK_MASTERCLASSES
    }
    const data = await res.json()

    return data.data?.map((item: any) => {
      // image puede venir como objeto (single media) o array (multiple media)
      const img = Array.isArray(item.image) ? item.image[0] : item.image
      const rawUrl = item.imageUrl || img?.url || ''
      const imageUrl = rawUrl && rawUrl.startsWith('/') ? `${STRAPI_URL}${rawUrl}` : rawUrl
      return {
        id: item.id,
        initials: item.initials || item.Initials || '',
        presenter: item.presenter || item.Presenter || '',
        date: item.date || item.Date || '',
        topic: item.topic || item.Topic || '',
        title: item.title || item.Title || '',
        description: item.description || item.Description || '',
        category: item.category || item.Category || 'Neurociencia aplicada',
        imageUrl,
      }
    }) || []
  } catch (error) {
    console.warn('Masterclasses not available, using mock data:', error)
    const { MOCK_MASTERCLASSES } = await import('@/data/masterclasses')
    return MOCK_MASTERCLASSES
  }
}
