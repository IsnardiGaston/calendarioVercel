export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Calendar } from '@/components/Calendar'
import { Raffle } from '@/components/Raffle'
import { Sedes } from '@/components/Sedes'
import { Newsletter } from '@/components/Newsletter'
import { Footer } from '@/components/Footer'
import { MOCK_EVENTS } from '@/data/events'
import { fetchEvents, fetchConfig, fetchMasterclasses, type Masterclass } from '@/lib/strapi'
import { MasterclassFlyersCarousel } from '@/components/MasterclassFlyersCarousel'
import { MasterclassesSkeleton } from '@/components/MasterclassesSkeleton'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default async function Home() {
  // Try to fetch from Strapi, fallback to mock events
  let events = MOCK_EVENTS
  let month = new Date().getMonth() // 0-11
  let year = new Date().getFullYear()
  let titulo = 'Mes del'
  let tituloDestacado = 'Trabajador'
  let subtituloLinea1 = 'Trabajar mejor · Vivir mejor'
  let subtituloLinea2 = 'Un mes dedicado a tu cuerpo, mente y comunidad.'
  let mostrarSorteo = true
  let fechaSorteo = 'Jueves 29 de mayo de 2026'
  let fechaSorteoCorta = '29 de mayo'
  let masterclasses: Masterclass[] = []

  try {
    const [strapiEvents, config, strapiMasterclasses] = await Promise.all([
      fetchEvents(),
      fetchConfig(),
      fetchMasterclasses(),
    ])
    if (strapiEvents.length > 0) {
      events = strapiEvents
    }
    month = config.month - 1 // Convert from 1-12 to 0-11
    year = config.year
    titulo = config.titulo
    tituloDestacado = config.tituloDestacado
    subtituloLinea1 = config.subtituloLinea1
    subtituloLinea2 = config.subtituloLinea2
    mostrarSorteo = config.mostrarSorteo
    fechaSorteo = config.fechaSorteo
    fechaSorteoCorta = config.fechaSorteoCorta
    masterclasses = strapiMasterclasses
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock data - Strapi not available')
    }
  }

  return (
    <main>
      <Navigation titulo={titulo} tituloDestacado={tituloDestacado} year={year} />
      <Hero events={events} month={month} year={year} titulo={titulo} tituloDestacado={tituloDestacado} subtituloLinea1={subtituloLinea1} subtituloLinea2={subtituloLinea2} />
      <hr className="border-t-2 border-teal" />
      <Calendar events={events} month={month} year={year} />
      {mostrarSorteo && <Raffle fechaSorteo={fechaSorteo} fechaSorteoCorta={fechaSorteoCorta} />}
      <Sedes events={events} />
      <ErrorBoundary>
        <Suspense fallback={<MasterclassesSkeleton />}>
          {masterclasses.length > 0 && <MasterclassFlyersCarousel masterclasses={masterclasses} />}
        </Suspense>
      </ErrorBoundary>
      <Newsletter />
      <Footer titulo={titulo} tituloDestacado={tituloDestacado} year={year} subtituloLinea1={subtituloLinea1} subtituloLinea2={subtituloLinea2} />
    </main>
  )
}
