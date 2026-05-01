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

  useEffect(() => {
    const handleSedeSelected = (evt: any) => {
      setSelectedSede(evt.detail.sede)
    }

    window.addEventListener('sedeSelected', handleSedeSelected)

    return () => {
      window.removeEventListener('sedeSelected', handleSedeSelected)
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sedeParam = params.get('sede')
    if (sedeParam) {
      setSelectedSede(sedeParam)
    }
  }, [])

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

  return (
    <section ref={ref} id="calendario" className={`bg-arena border-b-2 border-teal p-5 md:p-8 lg:p-12 xl:p-20 ${isInView ? 'animate-revealIn' : 'opacity-0'}`}>
      {/* Header */}
      <div className="mb-6 md:mb-8 lg:mb-10">
        <div className="text-sm md:text-base font-black tracking-widest uppercase text-teal mb-2">
          Agenda completa
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between md:gap-4 mb-4 md:mb-6">
          <h2 className="section-title">Calendario de {currentMonth.toLowerCase()}</h2>
          <div className="flex gap-1.5 md:gap-2 lg:gap-3 flex-wrap mt-3 md:mt-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`btn-small ${
                selectedCategory === 'all'
                  ? 'bg-teal text-white border-teal'
                  : 'border-teal text-teal bg-transparent hover:bg-teal hover:text-white'
              }`}
              aria-pressed={selectedCategory === 'all'}
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
              aria-pressed={selectedCategory === 'cuerpo'}
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
              aria-pressed={selectedCategory === 'mente'}
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
              aria-pressed={selectedCategory === 'comunidad'}
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
        <div className="grid grid-cols-7 gap-2 mb-1">
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

        {/* Mobile calendar (7 columns with indicator dots) */}
        <div className="grid grid-cols-7 gap-2 md:hidden">
          {Array.from({ length: totalCellsNeeded }).map((_, i) => {
            const day = i - firstDay + 1
            const isCurrentMonth = day >= 1 && day <= daysInMonth
            const dow = i % 7
            const isWeekend = dow >= 5

            if (!isCurrentMonth) {
              return <div key={`empty-${i}`}></div>
            }

            const dayEvents = filterEvents(day)
            const holidayEvent = events.find((e) => e.day === day && e.cat === 'feriado')
            const isHoliday = !!holidayEvent

            const hasCuerpo = dayEvents.some((e) => e.cat === 'cuerpo')
            const hasMente = dayEvents.some((e) => e.cat === 'mente')
            const hasComunidad = dayEvents.some((e) => e.cat === 'comunidad')

            if (isHoliday && holidayEvent) {
              return (
                <div
                  key={i}
                  className="aspect-square border-2 border-teal rounded-lg p-2 bg-gradient-to-br from-pink/10 to-orange/10 flex items-center justify-center"
                >
                  <div className="text-sm font-black text-teal">
                    {day}
                  </div>
                </div>
              )
            }

            return (
              <div
                key={i}
                onClick={() => {
                  if (dayEvents.length > 0 && !isWeekend) {
                    setSelectedEvent(dayEvents[0])
                    setModalOpen(true)
                  }
                }}
                className={`aspect-square border-1.5 rounded-lg p-2 transition-all flex flex-col items-center justify-center text-center ${
                  isWeekend
                    ? 'bg-arena-dk border-arena-dk'
                    : dayEvents.length > 0
                      ? 'bg-white border-teal cursor-pointer hover:border-teal hover:shadow-[3px_3px_0_#1f9ba0]'
                      : 'bg-white border-arena-dk'
                }`}
              >
                <div className={`text-sm font-black mb-1 ${isWeekend ? 'text-gray-400' : 'text-teal'}`}>
                  {day}
                </div>
                {(hasCuerpo || hasMente || hasComunidad) && !isWeekend && (
                  <div className="flex gap-0.5">
                    {hasCuerpo && <span className="w-1.5 h-1.5 rounded-full bg-orange"></span>}
                    {hasMente && <span className="w-1.5 h-1.5 rounded-full bg-teal"></span>}
                    {hasComunidad && <span className="w-1.5 h-1.5 rounded-full bg-pink"></span>}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Desktop calendar (7 columns - full week) */}
        <div className="hidden md:grid grid-cols-7 gap-1.5 lg:gap-2">
          {Array.from({ length: totalCellsNeeded }).map((_, i) => {
            const day = i - firstDay + 1
            const isCurrentMonth = day >= 1 && day <= daysInMonth
            const dow = i % 7
            const isWeekend = dow >= 5

            if (!isCurrentMonth) {
              return <div key={i} className="min-h-20 md:min-h-24 lg:min-h-32"></div>
            }

            const dayEvents = filterEvents(day)
            const holidayEvent = events.find((e) => e.day === day && e.cat === 'feriado')
            const isHoliday = !!holidayEvent

            if (isHoliday && holidayEvent) {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedEvent(holidayEvent)
                    setModalOpen(true)
                  }}
                  className="min-h-20 md:min-h-24 lg:min-h-32 border-2 border-teal rounded-xl p-2 md:p-3 lg:p-4 transition-all cursor-pointer bg-gradient-to-br from-pink/10 to-orange/10 hover:from-pink/20 hover:to-orange/20 hover:border-pink hover:shadow-[3px_3px_0_#c93860] flex flex-col items-center justify-center text-center relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[calc(0.75rem-2px)]"></div>
                  <div className="relative z-10">
                    <div className="text-xl font-black text-teal mb-1">
                      {day}
                    </div>
                    <div className="text-sm font-black text-pink uppercase tracking-widest leading-tight">
                      {holidayEvent.title}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div
                key={i}
                className={`min-h-20 md:min-h-24 lg:min-h-32 border-1.5 rounded-xl p-1 md:p-1.5 transition-all cursor-pointer ${
                  isWeekend
                    ? 'border-arena-dk hover:border-teal hover:shadow-[3px_3px_0_#1f9ba0]'
                    : 'bg-white border-arena-dk hover:border-teal hover:shadow-[3px_3px_0_#1f9ba0]'
                }`}
                style={isWeekend ? { backgroundColor: '#f9f5ee' } : undefined}
              >
                <div className="text-sm md:text-base font-black text-teal mb-1 md:mb-2">
                  {day}
                </div>
                <div className="flex flex-col gap-0.5 md:gap-1">
                  {dayEvents.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => {
                        setSelectedEvent(ev)
                        setModalOpen(true)
                      }}
                      className={`text-xs md:text-sm p-0.5 md:p-1 rounded cursor-pointer hover:opacity-75 line-clamp-1 md:line-clamp-2 transition-opacity ${getCatColor(
                        ev.cat
                      )}`}
                      aria-label={`${ev.title} - ${getCatLabel(ev.cat)}`}
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
          className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-title"
        >
          <div
            className="relative bg-arena border-2 border-teal rounded-xl p-3 sm:p-4 md:p-8 w-full max-w-sm md:max-w-md shadow-2xl max-h-[88vh] overflow-y-auto animate-in scale-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-3 md:mb-0 md:absolute md:top-3 md:right-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-teal text-white rounded-full w-8 h-8 md:w-7 md:h-7 flex items-center justify-center font-black text-lg hover:bg-teal/80 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 transition-all duration-200"
                aria-label="Cerrar diálogo"
              >
                ✕
              </button>
            </div>

            <div className="text-base font-black tracking-widest uppercase mb-2 text-pink">
              {getCatLabel(selectedEvent.cat)}
            </div>

            <h2 id="event-title" className="font-serif text-3xl text-teal mb-2 leading-tight">
              {selectedEvent.title}
            </h2>

            <div className="text-base text-gray-600 mb-4 flex items-center gap-2">
              <span aria-label="Fecha y hora del evento">
                {(() => {
                  const [year, month, day] = selectedEvent.date.split('-')
                  const monthName = MONTHS[parseInt(month) - 1]
                  const dayOfWeek = DAYS_OF_WEEK[(firstDay + parseInt(day) - 1) % 7]
                  const timeOnly = selectedEvent.time.split(':').slice(0, 2).join(':')
                  return `${dayOfWeek} ${day} de ${monthName.toLowerCase()} ${year} · ${timeOnly}`
                })()}
              </span>
            </div>

            <p className="text-base leading-relaxed text-gray-700 mb-4">
              {selectedEvent.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6" aria-label="Sedes donde se realiza el evento">
              {selectedEvent.sedes.map((sede) => (
                <span
                  key={sede}
                  className="bg-teal text-white text-xs md:text-base font-black px-2 md:px-3 py-0.5 md:py-1 rounded-full"
                >
                  {sede}
                </span>
              ))}
            </div>
            {selectedEvent.url && (
              <div className="flex justify-end">
                <a
                  href={selectedEvent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink text-white text-base font-black px-6 py-2 rounded-full hover:bg-pink/80 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2 transition-all duration-200"
                >
                  Inscribite
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
