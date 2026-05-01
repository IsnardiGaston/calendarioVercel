'use client'

import { PILARES } from '@/data/config'
import { useInView } from '@/hooks/useInView'

export function Pilares() {
  const { ref, isInView } = useInView()

  return (
    <section
      ref={ref}
      id="pilares"
      className={`bg-arena border-t-2 border-teal p-5 md:p-8 lg:p-12 xl:p-20 border-b-2 ${
        isInView ? 'animate-revealIn' : 'opacity-0'
      }`}
    >
      <div className="mb-6 md:mb-10 lg:mb-12">
        <div className="text-sm md:text-base font-black tracking-widest uppercase text-pink mb-2">
          El programa
        </div>
        <h2 className="section-title mb-2">3 pilares, pensadas para vos</h2>
        <p className="section-desc">
          Actividades para que cuides tu cuerpo, entrenes tu mente y fortalezcas tu comunidad.
          <span className="font-playful text-lg text-pink">Work your way</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        {PILARES.map((pilar, idx) => (
          <div
            key={pilar.id}
            className={`p-4 md:p-5 lg:p-6 xl:p-8 relative overflow-hidden transition-all duration-300 hover:bg-white focus-within:bg-white focus-within:ring-2 focus-within:ring-offset-2 rounded-lg group ${
              pilar.id === 'cuerpo'
                ? 'focus-within:ring-orange'
                : pilar.id === 'mente'
                  ? 'focus-within:ring-teal'
                  : 'focus-within:ring-pink'
            } ${idx !== PILARES.length - 1 ? 'md:border-r-2 border-teal' : ''}`}
          >
            <div className="absolute top-0 right-0 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-teal opacity-10 group-hover:opacity-20 pointer-events-none transition-opacity">
              {pilar.numero}
            </div>

            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 mb-3 text-3xl flex-shrink-0 transition-all ${
                pilar.id === 'cuerpo'
                  ? 'border-orange group-hover:bg-orange/10'
                  : pilar.id === 'mente'
                    ? 'border-teal group-hover:bg-teal/10'
                    : 'border-pink group-hover:bg-pink/10'
              }`}
              aria-label={`Icono de ${pilar.categoria}`}
            >
              {pilar.emoji}
            </div>

            <div
              className={`text-base font-black tracking-widest uppercase mb-2 ${
                pilar.id === 'cuerpo' ? 'text-orange' : pilar.id === 'mente' ? 'text-teal' : 'text-pink'
              }`}
            >
              {pilar.categoria}
            </div>

            <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-teal mb-3 leading-tight">
              {pilar.titulo}
            </h3>

            <p className="text-base text-gray-600 mb-4 leading-relaxed">
              {pilar.descripcion}
            </p>

            <div className="flex flex-wrap gap-2" role="list">
              {pilar.tags.map((tag) => (
                <span
                  key={tag}
                  role="listitem"
                  className={`text-base font-black px-3 py-1 rounded-full border-1.5 flex-shrink-0 transition-all ${
                    pilar.id === 'cuerpo'
                      ? 'border-orange text-orange bg-orange/10 group-hover:bg-orange/20'
                      : pilar.id === 'mente'
                        ? 'border-teal text-teal bg-teal/10 group-hover:bg-teal/20'
                        : 'border-pink text-pink bg-pink/10 group-hover:bg-pink/20'
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
