import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Pilares } from '@/components/Pilares'
import { Calendar } from '@/components/Calendar'
import { Raffle } from '@/components/Raffle'
import { Sedes } from '@/components/Sedes'
import { Footer } from '@/components/Footer'
import { MOCK_EVENTS } from '@/data/events'
import { fetchEvents, fetchConfig } from '@/lib/strapi'

export default async function Home() {
  // Try to fetch from Strapi, fallback to mock events
  let events = MOCK_EVENTS
  let month = new Date().getMonth() // 0-11
  let year = new Date().getFullYear()

  try {
    const [strapiEvents, config] = await Promise.all([
      fetchEvents(),
      fetchConfig(),
    ])
    if (strapiEvents.length > 0) {
      events = strapiEvents
    }
    month = config.month - 1 // Convert from 1-12 to 0-11
    year = config.year
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
      <Footer />
    </main>
  )
}
