'use client'

import { PILARES } from '@/data/config'
import { useInView } from '@/hooks/useInView'

export function Pilares() {
  const { ref, isInView } = useInView()

  return (
    <section
      ref={ref}
      id="pilares"
      className={`bg-arena border-t-2 border-teal p-5 md:p-12 lg:p-20 border-b-2 ${
        isInView ? 'animate-revealIn' : 'opacity-0'
      }`}
    >
      <div className="mb-8 md:mb-12">
        <div className="text-base font-black tracking-widest uppercase text-pink mb-2">
          El programa
        </div>
        <h2 className="section-title mb-2">3 pilares, un mes entero</h2>
        <p className="section-desc">
          Actividades para que cuides tu cuerpo, entrenes tu mente y fortalezcas tu comunidad.
          Work your way.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {PILARES.map((pilar, idx) => (
          <div
            key={pilar.id}
            className={`p-6 md:p-8 relative overflow-hidden transition-colors duration-200 hover:bg-white ${
              idx !== PILARES.length - 1 ? 'border-r-2 border-teal' : ''
            }`}
          >
            <div className="absolute top-0 right-0 text-6xl font-serif text-teal opacity-10 pointer-events-none">
              {pilar.numero}
            </div>

            <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-teal mb-3 text-3xl flex-shrink-0">
              {pilar.emoji}
            </div>

            <div
              className={`text-base font-black tracking-widest uppercase mb-2 ${
                pilar.id === 'cuerpo' ? 'text-orange' : pilar.id === 'mente' ? 'text-teal' : 'text-pink'
              }`}
            >
              {pilar.categoria}
            </div>

            <h3 className="font-serif text-3xl text-teal mb-3 leading-tight">
              {pilar.titulo}
            </h3>

            <p className="text-base text-gray-600 mb-4 leading-relaxed">
              {pilar.descripcion}
            </p>

            <div className="flex flex-wrap gap-2">
              {pilar.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-base font-black px-3 py-1 rounded-full border-1.5 ${
                    pilar.id === 'cuerpo'
                      ? 'border-orange text-orange bg-orange/10'
                      : pilar.id === 'mente'
                        ? 'border-teal text-teal bg-teal/10'
                        : 'border-pink text-pink bg-pink/10'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
