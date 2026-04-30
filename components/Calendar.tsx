'use client'

import { useState, useEffect } from 'react'
import type { Event } from '@/data/events'
import { SEDES, DAYS_OF_WEEK, MONTHS } from '@/data/config'
import { useInView } from '@/hooks/useInView'
import { getCalendarDays } from '@/utils/calendar'

interface CalendarProps {
  events: Event[]
  month: number
  year: number
}

export function Calendar({ events, month, year }: CalendarProps) {
  const { ref, isInView } = useInView()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSede, setSelectedSede] = useState<string>('all')
  const [stats, setStats] = useState({ cuerpo: 0, mente: 0, comunidad: 0 })
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const monthIndex = month
  const currentMonth = MONTHS[monthIndex]
  const currentYear = year
  const { daysInMonth, firstDay, totalCellsNeeded } = getCalendarDays(
    currentYear,
    monthIndex
  )

  useEffect(() => {
    updateStats()
  }, [selectedSede, events])

  const filterEvents = (day: number) => {
    return events.filter((e) => {
      if (e.cat === 'feriado') return e.day === day
      const matchesSede = selectedSede === 'all' || !e.sedes?.length || e.sedes.includes(selectedSede)
      const matchesCategory = selectedCategory === 'all' || e.cat === selectedCategory
      return e.day === day && matchesSede && matchesCategory
    })
  }

  const updateStats = () => {
    const filtered = events.filter(
      (e) => selectedSede === 'all' || e.sedes.includes(selectedSede)
    )
    setStats({
      cuerpo: filtered.filter((e) => e.cat === 'cuerpo').length,
      mente: filtered.filter((e) => e.cat === 'mente').length,
      comunidad: filtered.filter((e) => e.cat === 'comunidad').length,
    })
  }

  const getCatColor = (cat: string) => {
    switch (cat) {
      case 'cuerpo':
        return 'bg-orange/20 text-orange border-l-4 border-orange'
      case 'mente':
        return 'bg-teal/20 text-teal border-l-4 border-teal'
      case 'comunidad':
        return 'bg-pink/20 text-pink border-l-4 border-pink'
      default:
        return ''
    }
  }

  const getCatLabel = (cat: string) => {
    switch (cat) {
      case 'cuerpo':
        return 'Cuerpo — Wellness'
      case 'mente':
        return 'Mente — Masterclass'
      case 'comunidad':
        return 'Comunidad — After & Coffee'
      default:
        return ''
    }
  }

  console.log(Event);
  

  return (
    <section ref={ref} id="calendario" className={`bg-arena border-b-2 border-teal p-5 md:p-12 lg:p-20 ${isInView ? 'animate-revealIn' : 'opacity-0'}`}>
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <div className="text-base font-black tracking-widest uppercase text-teal mb-2">
          Agenda completa
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between md:gap-4 mb-6">
          <h2 className="section-title">Calendario de {currentMonth.toLowerCase()}</h2>
          <div className="flex gap-2 md:gap-3 flex-wrap mt-4 md:mt-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`btn-small ${
                selectedCategory === 'all'
                  ? 'bg-teal text-white border-teal'
                  : 'border-teal text-teal bg-transparent hover:bg-teal hover:text-white'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setSelectedCategory('cuerpo')}
              className={`btn-small ${
                selectedCategory === 'cuerpo'
                  ? 'bg-orange text-white border-orange'
                  : 'border-teal text-teal bg-transparent hover:bg-teal hover:text-white'
              }`}
            >
              Cuerpo
            </button>
            <button
              onClick={() => setSelectedCategory('mente')}
              className={`btn-small ${
                selectedCategory === 'mente'
                  ? 'bg-teal text-white border-teal'
                  : 'border-teal text-teal bg-transparent hover:bg-teal hover:text-white'
              }`}
            >
              Mente
            </button>
            <button
              onClick={() => setSelectedCategory('comunidad')}
              className={`btn-small ${
                selectedCategory === 'comunidad'
                  ? 'bg-pink text-white border-pink'
                  : 'border-teal text-teal bg-transparent hover:bg-teal hover:text-white'
              }`}
            >
              Comunidad
            </button>
          </div>
        </div>
      </div>

      {/* Sedes filter */}
      <div className="mb-6 md:mb-8">
        <div className="flex gap-2 md:gap-3 flex-wrap">
          <button
            onClick={() => setSelectedSede('all')}
            className={`text-base font-black px-3 md:px-4 py-1.5 rounded-full border-1.5 transition-all ${
              selectedSede === 'all'
                ? 'bg-teal text-white border-teal'
                : 'border-teal text-teal bg-transparent hover:bg-teal hover:text-white'
            }`}
          >
            Todas las sedes
          </button>
          {SEDES.map((sede) => (
            <button
              key={sede}
              onClick={() => setSelectedSede(sede)}
              className={`text-base font-black px-3 md:px-4 py-1.5 rounded-full border-1.5 transition-all ${
                selectedSede === sede
                  ? 'bg-teal text-white border-teal'
                  : 'border-teal text-teal bg-transparent hover:bg-teal hover:text-white'
              }`}
            >
              {sede}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 md:gap-4 flex-wrap mb-8 md:mb-10">
        <div className="flex items-center gap-3 bg-white border-2 border-teal rounded-full px-4 py-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange flex-shrink-0"></span>
          <span className="font-serif text-2xl md:text-3xl text-teal font-light">
            {stats.cuerpo}
          </span>
          <span className="text-base font-black uppercase tracking-wider text-gray-600">
            Cuerpo
          </span>
        </div>
        <div className="flex items-center gap-3 bg-white border-2 border-teal rounded-full px-4 py-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal flex-shrink-0"></span>
          <span className="font-serif text-2xl md:text-3xl text-teal font-light">
            {stats.mente}
          </span>
          <span className="text-base font-black uppercase tracking-wider text-gray-600">
            Mente
          </span>
        </div>
        <div className="flex items-center gap-3 bg-white border-2 border-teal rounded-full px-4 py-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink flex-shrink-0"></span>
          <span className="font-serif text-2xl md:text-3xl text-teal font-light">
            {stats.comunidad}
          </span>
          <span className="text-base font-black uppercase tracking-wider text-gray-600">
            Comunidad
          </span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="mb-4 md:mb-6">
        <div className="grid grid-cols-7 gap-2 md:gap-2 mb-1">
          {DAYS_OF_WEEK.map((day, i) => (
            <div
              key={day}
              className={`text-center text-base font-black uppercase tracking-wider p-2 ${
                i >= 5 ? 'text-pink' : 'text-teal-lt'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-2">
          {Array.from({ length: totalCellsNeeded }).map((_, i) => {
            const day = i - firstDay + 1
            const isCurrentMonth = day >= 1 && day <= daysInMonth
            const dow = i % 7
            const isWeekend = dow >= 5

            if (!isCurrentMonth)
              return <div key={i} className="min-h-20 md:min-h-24"></div>

            const dayEvents = filterEvents(day)
            const isHoliday = events.some((e) => e.day === day && e.cat === 'feriado')

            return (
              <div
                key={i}
                className={`min-h-28 md:min-h-32 border-1.5 rounded-xl p-1.5 transition-all cursor-pointer ${
                  isHoliday
                    ? 'bg-yellow/20 border-yellow hover:border-teal hover:shadow-[3px_3px_0_#1f9ba0]'
                    : isWeekend
                      ? 'border-arena-dk hover:border-teal hover:shadow-[3px_3px_0_#1f9ba0]'
                      : 'bg-white border-arena-dk hover:border-teal hover:shadow-[3px_3px_0_#1f9ba0]'
                }`}
                style={isWeekend && !isHoliday ? { backgroundColor: '#f9f5ee' } : undefined}
              >
                <div className="text-base md:text-base font-black text-teal mb-1 md:mb-2 flex items-center gap-1">
                  {day}
                  {isHoliday && (
                    <span className="text-base font-black bg-yellow text-black px-1 rounded">
                      Feriado
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  {dayEvents.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => {
                        setSelectedEvent(ev)
                        setModalOpen(true)
                      }}
                      className={`text-sm p-1 rounded cursor-pointer hover:opacity-75 line-clamp-2 transition-opacity ${getCatColor(
                        ev.cat
                      )}`}
                    >
                      {ev.title}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedEvent && (
        <div
          className="fixed inset-0 z-200 bg-black/45 flex items-center justify-center p-4 animate-modalIn"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-arena border-2 border-teal rounded-xl p-6 md:p-8 max-w-md w-full relative shadow-2xl animate-modalIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 bg-teal text-white rounded-full w-7 h-7 flex items-center justify-center font-black hover:bg-teal/80 transition-colors"
            >
              ✕
            </button>

            <div className="text-base font-black tracking-widest uppercase mb-2 text-pink">
              {getCatLabel(selectedEvent.cat)}
            </div>

            <h2 className="font-serif text-3xl text-teal mb-2 leading-tight">
              {selectedEvent.title}
            </h2>

            <div className="text-base text-gray-600 mb-4">
              {(() => {
                const [year, month, day] = selectedEvent.date.split('-')
                const monthName = MONTHS[parseInt(month) - 1]
                const dayOfWeek = DAYS_OF_WEEK[(firstDay + parseInt(day) - 1) % 7]
                const timeOnly = selectedEvent.time.split(':').slice(0, 2).join(':')
                return `${dayOfWeek} ${day} de ${monthName.toLowerCase()} ${year} · ${timeOnly}`
              })()}
            </div>

            <p className="text-base leading-relaxed text-gray-700 mb-4">
              {selectedEvent.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedEvent.sedes.map((sede) => (
                <span
                  key={sede}
                  className="bg-teal text-white text-base font-black px-3 py-1 rounded-full"
                >
                  {sede}
                </span>
              ))}
            </div>
            {selectedEvent.url && (
              <a
                href={selectedEvent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-pink text-white text-base font-black px-6 py-2 rounded-full hover:bg-pink/80 transition-colors"
              >
                Inscribite
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
