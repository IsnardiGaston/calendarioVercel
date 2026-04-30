'use client'

import { Event } from '@/data/events'
import { SEDES } from '@/data/config'
import { useInView } from '@/hooks/useInView'

interface SedesProps {
  events: Event[]
}

export function Sedes({ events }: SedesProps) {
  const { ref, isInView } = useInView()

  return (
    <>
      {/* CTA Section */}
      <section ref={ref} className={`bg-teal border-t-2 border-b-2 border-black p-6 md:p-10 lg:p-12 ${isInView ? 'animate-revealIn' : 'opacity-0'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-base font-black tracking-widest uppercase text-yellow mb-3">
            Sumate al mes
          </div>
          <p className="font-serif text-2xl md:text-3xl text-white/90 leading-relaxed italic">
            Para ser parte de las actividades y ser contado en los sorteos, escribí o anotate en el
            front de tu sede principal a todas las actividades que tenemos para vos.
          </p>
        </div>
      </section>

      {/* Sedes Section */}
      <section id="sedes" className="bg-teal p-6 md:p-12 lg:p-20 border-b-2 border-black">
        <div className="mb-8 md:mb-12">
          <div className="text-base font-black tracking-widest uppercase text-yellow mb-3">
            Dónde encontrarnos
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-light mb-3">
            6 sedes, 1 comunidad
          </h2>
          <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
            El programa se distribuye en todas nuestras sedes para que siempre tengas una actividad
            cerca.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {SEDES.map((sede, i) => {
            const sedeEvents = events.filter((e) => e.sedes.includes(sede))
            const hasCuerpo = sedeEvents.some((e) => e.cat === 'cuerpo')
            const haMente = sedeEvents.some((e) => e.cat === 'mente')
            const haComunidad = sedeEvents.some((e) => e.cat === 'comunidad')
            const haFeriado = sedeEvents.some((e) => e.cat === 'feriado')

            return (
              <div
                key={sede}
                className="border-1.5 border-white/20 rounded-2xl p-4 md:p-6 transition-all hover:border-yellow hover:bg-white/10"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className="font-serif text-5xl text-white/40 font-light mb-2">
                  0{i + 1}
                </div>
                <div className="text-lg md:text-xl font-black text-white mb-1">
                  {sede}
                </div>
                <div className="text-base text-white font-medium mb-3">
                  {sedeEvents.length} actividad{sedeEvents.length !== 1 ? 'es' : ''} en mayo
                </div>
                <div className="flex gap-2">
                  {hasCuerpo && (
                    <span className="w-2 h-2 rounded-full bg-orange flex-shrink-0"></span>
                  )}
                  {haMente && (
                    <span className="w-2 h-2 rounded-full bg-white flex-shrink-0"></span>
                  )}
                  {haComunidad && (
                    <span className="w-2 h-2 rounded-full bg-yellow flex-shrink-0"></span>
                  )}
                  {haFeriado && (
                    <span className="w-2 h-2 rounded-full bg-yellow flex-shrink-0"></span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
