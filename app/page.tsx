import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Pilares } from '@/components/Pilares'
import { Calendar } from '@/components/Calendar'
import { Raffle } from '@/components/Raffle'
import { Sedes } from '@/components/Sedes'
import { Newsletter } from '@/components/Newsletter'
import { Footer } from '@/components/Footer'
import { MOCK_EVENTS } from '@/data/events'
import { fetchEvents, fetchConfig, fetchMasterclasses, type Masterclass } from '@/lib/strapi'
import { MasterclassFlyersResponsive } from '@/components/MasterclassFlyersResponsive'

export default async function Home() {
  // Try to fetch from Strapi, fallback to mock events
  let events = MOCK_EVENTS
  let month = new Date().getMonth() // 0-11
  let year = new Date().getFullYear()
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
    masterclasses = strapiMasterclasses
  } catch (error) {
    console.warn('Using mock data - Strapi not available')
  }

  return (
    <main>
      <Navigation />
      <Hero events={events} month={month} year={year} />
      <Pilares />
      <Calendar events={events} month={month} year={year} />
      <Raffle />
      <Sedes events={events} />
      {masterclasses.length > 0 && <MasterclassFlyersResponsive masterclasses={masterclasses} />}
      <Newsletter />
      <Footer />
    </main>
  )
}
