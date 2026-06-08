'use client'

import { SEDES, MONTHS } from '@/data/config'
import { MiniCalendar } from './MiniCalendar'
import type { Event } from '@/data/events'

interface HeroProps {
  events: Event[]
  month: number
  year: number
  titulo: string
  tituloDestacado: string
}

export function Hero({ events, month, year, titulo, tituloDestacado }: HeroProps) {
  const currentMonth = MONTHS[month]
  const currentYear = year
  const scrollToCalendar = () => {
    document.getElementById('calendario')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToPilares = () => {
    document.getElementById('pilares')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-14 md:pt-14.5 relative overflow-hidden bg-arena">
      {/* Background text - Mes gigante */}
      <div
        className="hidden md:block absolute font-serif font-normal pointer-events-none leading-none whitespace-nowrap"
        style={{
          fontSize: '22vw',
          bottom: '-2rem',
          left: '-1rem',
          zIndex: 0,
          color: 'rgba(31, 155, 160, 0.06)',
          letterSpacing: '-2px',
        }}
      >
        {currentMonth.toUpperCase()}
      </div>

      {/* Left content */}
      <div className="flex flex-col justify-center p-5 md:p-10 lg:p-14 xl:p-20 relative z-10">
        <div className="inline-flex items-center gap-2 bg-pink text-white text-sm md:text-base font-black px-4 py-2 rounded-full mb-5 md:mb-8 w-fit shadow-lg">
          <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
          {currentMonth} {currentYear} · Todas las sedes
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-teal leading-tight font-light mb-2">
          {titulo}
          <br />
          <span className="italic text-pink">{tituloDestacado}</span>
        </h1>

        <div className="font-serif text-xl sm:text-2xl md:text-3xl text-teal-lt mb-5 md:mb-8 tracking-wider">
          {currentYear}
        </div>

        <p className="text-sm sm:text-base md:text-lg font-medium text-black mb-5 md:mb-8 border-l-4 border-pink pl-4 max-w-md leading-relaxed">
          Trabajar mejor · Vivir mejor
          <br />
          Un mes dedicado a tu cuerpo, mente y comunidad.
        </p>

        <div className="flex flex-wrap gap-2 md:gap-1.5 mb-5 md:mb-8">
          {SEDES.map((sede) => (
            <button
              key={sede}
              onClick={() => {
                const calendarEl = document.getElementById('calendario')
                if (calendarEl) {
                  const url = new URL(window.location.href)
                  url.searchParams.set('sede', sede)
                  window.history.pushState({}, '', url)
                  calendarEl.scrollIntoView({ behavior: 'smooth' })
                  const event = new CustomEvent('sedeSelected', { detail: { sede } })
                  window.dispatchEvent(event)
                }
              }}
              className="btn-small border-teal text-teal bg-transparent hover:bg-teal hover:text-white text-base px-3 py-1 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 rounded active:scale-95"
              aria-label={`Filtrar por sede ${sede}`}
            >
              {sede}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 md:gap-2.5">
          <button
            onClick={scrollToCalendar}
            className="btn-primary focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2 active:scale-95 transition-all duration-200"
            aria-label="Desplazarse al calendario completo"
          >
            Ver calendario
          </button>
          <button
            onClick={scrollToPilares}
            className="btn-secondary focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 active:scale-95 transition-all duration-200"
            aria-label="Desplazarse a los pilares del programa"
          >
            Conocer más
          </button>
        </div>
      </div>

      {/* Right content - Card preview */}
      <div className="hidden lg:flex items-center justify-center relative overflow-hidden p-6">
        <MiniCalendar events={events} month={month} year={year} />
        {/* Animated blobs */}
        <svg
          className="absolute w-64 h-64 animate-float"
          style={{ top: '5%', right: '-5%' }}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M47.5,-57.2C59.5,-46.5,65.6,-28.5,67.8,-9.8C70,8.9,68.3,28.3,58.4,42.1C48.5,55.9,30.4,64.1,10.8,67.6C-8.8,71.1,-30,69.9,-47.5,59.6C-65,49.3,-78.8,29.9,-79.2,9.8C-79.6,-10.3,-66.6,-31.1,-51.2,-43.6C-35.8,-56.1,-17.9,-60.3,1.2,-61.7C20.3,-63.1,35.5,-67.9,47.5,-57.2Z"
            fill="#ee4887"
            opacity="0.3"
            transform="translate(100 100)"
          />
        </svg>

        {/* Bottom right blob */}
        <svg
          className="absolute w-56 h-56 animate-float"
          style={{ bottom: '-10%', right: '10%', animationDelay: '2s' }}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M43.3,-54.8C55.2,-47.8,62.9,-35.7,65.4,-22.1C67.9,-8.5,65.2,6.9,58.2,20.1C51.2,33.2,39.8,44.2,26.7,50.5C13.5,56.8,-1.5,58.3,-18.1,54.6C-34.7,50.9,-52.9,42,-60.5,28.2C-68.1,14.5,-65.2,-4.4,-58.2,-20.3C-51.2,-36.2,-40,-50,-27.2,-57.5C-14.4,-65,-0.1,-66.2,13.7,-62.4C27.6,-58.6,31.4,-61.8,43.3,-54.8Z"
            fill="#1f9ba0"
            opacity="0.2"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </section>
  )
}
