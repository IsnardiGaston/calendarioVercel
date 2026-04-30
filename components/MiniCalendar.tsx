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

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
          <div
            key={day + i}
            className={`text-center text-base font-black uppercase tracking-wider p-1 ${
              i >= 5 ? 'text-pink' : 'text-teal-lt'
            }`}
          >
            {day}
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

          const hasMiniEvent = events.some((e) => e.day === day)
          const hasFeriado = events.some((e) => e.day === day && e.cat === 'feriado')

          return (
            <div
              key={i}
              className={`aspect-square text-center text-base font-bold rounded flex items-center justify-center relative ${
                hasFeriado
                  ? 'bg-yellow/40 text-black'
                  : isWeekend
                    ? 'bg-arena-dk text-gray-600'
                    : 'bg-arena text-teal'
              }`}
            >
              {day}
              {hasMiniEvent && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange"></span>
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex gap-2 flex-wrap text-base">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange"></span>
          <span className="font-black">Cuerpo</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-teal"></span>
          <span className="font-black">Mente</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-pink"></span>
          <span className="font-black">Comunidad</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow"></span>
          <span className="font-black">Feriado</span>
        </div>
      </div>
    </div>
  )
}
