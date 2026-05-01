'use client'

import { useInView } from '@/hooks/useInView'

export function Raffle() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className={`bg-pink border-t-2 border-b-2 border-black p-6 md:p-12 lg:p-20 ${isInView ? 'animate-revealIn' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left content */}
        <div>
          <div className="text-base font-black tracking-widest uppercase text-yellow mb-3">
            Sorteo del mes
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight font-light mb-4">
            Cada actividad es
            <br />
            <span className="italic">una chance más</span>
          </h2>
          <p className="text-base md:text-lg text-white/85 leading-relaxed mb-6">
            Con tu participación en nuestras actividades sumás, por cada actividad en la que
            participes de nuestra comunidad,{' '}
            <strong className="text-yellow">una posibilidad para el sorteo</strong> por el Mes
            del Trabajador.
          </p>

          {/* Draw date card */}
          <div className="flex items-center gap-3 md:gap-4 bg-white/15 rounded-2xl p-4 md:p-5 border-1.5 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 focus-within:ring-2 focus-within:ring-yellow focus-within:ring-offset-2 focus-within:ring-offset-pink">
            <div className="text-3xl md:text-4xl flex-shrink-0" aria-hidden="true">🗓️</div>
            <div>
              <div className="text-base font-black tracking-widest uppercase text-yellow">
                Fecha del sorteo
              </div>
              <div className="font-serif text-2xl md:text-3xl text-white font-light">
                Jueves 29 de mayo de 2026
              </div>
              <div className="text-base text-white/70 mt-1">Al cierre del Mes del Trabajador</div>
            </div>
          </div>
        </div>

        {/* Right content - How it works */}
        <div>
          <div className="bg-white/12 border-1.5 border-white/25 rounded-2xl p-5 md:p-7">
            <div className="text-base font-black tracking-widest uppercase text-yellow mb-5">
              ¿Cómo funciona?
            </div>

            <ol className="space-y-4">
              {[
                {
                  number: '1',
                  text: 'Participá de cualquier actividad del mes — masterclass, after, coffee party, yoga...',
                },
                {
                  number: '2',
                  text: 'Cada actividad que completás suma +1 chance al sorteo. ¡Más participás, más probabilidades tenés!',
                },
                {
                  number: '3',
                  text: 'El 29 de mayo hacemos el sorteo en vivo con toda la comunidad W&Co.',
                },
              ].map((step) => (
                <li key={step.number} className="flex items-start gap-3 md:gap-4">
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-yellow flex items-center justify-center font-black text-base md:text-base text-black flex-shrink-0" aria-label={`Paso ${step.number}`}>
                    {step.number}
                  </span>
                  <p className="text-base md:text-base text-white/90 leading-relaxed pt-1">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
