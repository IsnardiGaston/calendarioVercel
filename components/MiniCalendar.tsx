'use client'

import type { Event } from '@/data/events'
import { MONTHS } from '@/data/config'
import { getCalendarDays } from '@/utils/calendar'

interface MiniCalendarProps {
  events: Event[]
  month: number
  year: number
}

export function MiniCalendar({ events, month, year }: MiniCalendarProps) {
  const currentMonth = MONTHS[month]
  const currentYear = year
  const monthIndex = month

  const { daysInMonth, firstDay, totalCellsNeeded } = getCalendarDays(
    currentYear,
    monthIndex
  )

  return (
    <div
      className="bg-white border-2 border-teal rounded-3xl p-8 w-full max-w-lg relative z-10 animate-cardIn"
      style={{
        boxShadow: '6px 6px 0 #1f9ba0'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="font-serif text-3xl font-light text-teal">{currentMonth} {currentYear}</div>
        <div className="bg-pink text-white text-base font-black px-3 py-1 rounded-full">
          {events.length} evento{events.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2" role="presentation">
        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, i) => (
          <div
            key={day}
            className={`text-center text-base font-black uppercase tracking-wider p-1 ${
              i >= 5 ? 'text-pink' : 'text-teal-lt'
            }`}
            aria-label={day}
          >
            {day.substring(0, 1)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: totalCellsNeeded }).map((_, i) => {
          const day = i - firstDay + 1
          const isCurrentMonth = day >= 1 && day <= daysInMonth
          const dow = i % 7
          const isWeekend = dow >= 5

          if (!isCurrentMonth) return <div key={i}></div>

          const dayEvents = events.filter((e) => e.day === day)
          const hasFeriado = dayEvents.some((e) => e.cat === 'feriado')
          const hasCuerpo = dayEvents.some((e) => e.cat === 'cuerpo')
          const hasMente = dayEvents.some((e) => e.cat === 'mente')
          const hasComunidad = dayEvents.some((e) => e.cat === 'comunidad')

          return (
            <div
              key={i}
              className={`aspect-square text-center text-base font-bold rounded flex flex-col items-center justify-center relative ${
                hasFeriado
                  ? 'bg-yellow/30 border-2 border-yellow text-yellow'
                  : isWeekend
                    ? 'bg-arena-dk text-gray-600'
                    : 'bg-arena text-teal'
              }`}
            >
              {day}
              {(hasCuerpo || hasMente || hasComunidad) && !hasFeriado && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {hasCuerpo && <span className="w-1.5 h-1.5 rounded-full bg-orange"></span>}
                  {hasMente && <span className="w-1.5 h-1.5 rounded-full bg-teal"></span>}
                  {hasComunidad && <span className="w-1.5 h-1.5 rounded-full bg-pink"></span>}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex gap-2 flex-wrap text-base mt-4 pt-4 border-t border-teal/20" role="list">
        <div className="flex items-center gap-1" role="listitem">
          <span className="w-2 h-2 rounded-full bg-orange" aria-hidden="true"></span>
          <span className="font-black">Cuerpo</span>
        </div>
        <div className="flex items-center gap-1" role="listitem">
          <span className="w-2 h-2 rounded-full bg-teal" aria-hidden="true"></span>
          <span className="font-black">Mente</span>
        </div>
        <div className="flex items-center gap-1" role="listitem">
          <span className="w-2 h-2 rounded-full bg-pink" aria-hidden="true"></span>
          <span className="font-black">Comunidad</span>
        </div>
        <div className="flex items-center gap-1" role="listitem">
          <span className="w-2 h-2 rounded-full bg-yellow" aria-hidden="true"></span>
          <span className="font-black">Feriado</span>
        </div>
      </div>
    </div>
  )
}
