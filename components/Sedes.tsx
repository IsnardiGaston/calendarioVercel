'use client'

import type { Event } from '@/data/events'
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
            ¡Arrancó el mes del Mundial y con él llegaron un montón de novedades! 🏆
          </div>
          <p className="font-serif text-2xl md:text-3xl text-white/90 leading-relaxed italic">
            Chequeá nuestro calendario de actividades y los beneficios que ya están activos para vos en la comunidad.
            <br />
            ¿A qué estás esperando para sumarte?
          </p>
        </div>
      </section>

      {/* Sedes Section */}
      <section id="sedes" className="bg-teal p-6 md:p-8 lg:p-12 xl:p-20 border-b-2 border-black">
        <div className="mb-6 md:mb-10 lg:mb-12">
          <div className="text-sm md:text-base font-black tracking-widest uppercase text-yellow mb-3">
            Dónde encontrarnos
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-light mb-3">
            6 sedes, 1 comunidad
          </h2>
          <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
            El programa se distribuye en todas nuestras sedes para que siempre tengas una actividad
            cerca.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
          {SEDES.map((sede, i) => {
            const sedeEvents = events.filter((e) => e.sedes.includes(sede))
            const hasCuerpo = sedeEvents.some((e) => e.cat === 'cuerpo')
            const haMente = sedeEvents.some((e) => e.cat === 'mente')
            const haComunidad = sedeEvents.some((e) => e.cat === 'comunidad')

            return (
              <div
                key={sede}
                className="border-1.5 border-white/20 rounded-2xl p-4 md:p-6 transition-all hover:border-yellow hover:bg-white/10 focus-within:border-yellow focus-within:ring-2 focus-within:ring-yellow focus-within:ring-offset-2 focus-within:ring-offset-teal cursor-pointer group"
                style={{ transitionDelay: `${i * 0.07}s` }}
                role="article"
                aria-label={`Sede ${sede} con ${sedeEvents.length} actividad${sedeEvents.length !== 1 ? 'es' : ''}`}
              >
                <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-white/50 font-light mb-3 group-hover:text-white/70 transition-colors">
                  0{i + 1}
                </div>
                <div className="text-base md:text-lg lg:text-xl font-black text-white mb-2">
                  {sede}
                </div>
                <div className="text-base text-white/90 font-medium mb-4">
                  <span className="font-black text-yellow">{sedeEvents.length}</span> actividad{sedeEvents.length !== 1 ? 'es' : ''} en mayo
                </div>
                <div className="flex gap-2" aria-label="Categorías disponibles">
                  {hasCuerpo && (
                    <span className="w-2.5 h-2.5 rounded-full bg-orange flex-shrink-0" aria-label="Cuerpo - Wellness"></span>
                  )}
                  {haMente && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white flex-shrink-0" aria-label="Mente - Masterclass"></span>
                  )}
                  {haComunidad && (
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow flex-shrink-0" aria-label="Comunidad - After & Coffee"></span>
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
