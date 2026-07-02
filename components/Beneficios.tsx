'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

const BENEFICIOS = [
  'Beneficio Campo Bravo.png',
  'Beneficio Capein Foods.png',
  'Beneficio Chaggie.png',
  'Beneficio DCRO.png',
  'Beneficio Hacheef.png',
  'Beneficio Hasta la masa.png',
  'Beneficio Inti Zen.png',
  'Beneficio Leira.png',
  'Beneficio Luena Cafe.jpeg',
  'Beneficio On Fit.png',
  'Beneficio Paulo Cocina.png',
  'Beneficio Selva.png',
  'Beneficio Sushi Live.png',
  'Beneficio Tema Calcos.png',
  'Beneficio Kentucky Pizzeria.jpeg',
  'Beneficio Kongo Coffee Bar.jpeg',
  'Beneficio Campo Bravo Corporativo.jpeg',
  'Beneficio Cafe Nomada.jpeg',
  'Beneficio Clave Cafe.jpeg',
  'Beneficio Bacaro Palermo.jpeg',
  'Beneficio TMT Burgers.jpeg',
]

function nombreBeneficio(file: string) {
  return file.replace(/^Beneficio /, '').replace(/\.(png|jpe?g)$/i, '')
}

interface BeneficiosProps {
  titulo?: string
  subtitulo?: string
}

export function Beneficios({ titulo = 'Beneficios', subtitulo = 'Descuentos y promos para la comunidad' }: BeneficiosProps) {
  const { ref, isInView } = useInView()
  const [selected, setSelected] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const close = useCallback(() => setSelected(null), [])

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [selected, close])

  // Duplicamos la lista para lograr el scroll infinito sin cortes
  const loop = [...BENEFICIOS, ...BENEFICIOS]

  return (
    <section
      ref={ref}
      id="beneficios"
      className={`bg-arena border-t-2 border-teal p-5 md:p-8 lg:p-12 xl:p-20 overflow-hidden ${
        isInView ? 'animate-revealIn' : 'opacity-0'
      }`}
    >
      <div className="mb-6 md:mb-10 lg:mb-12">
        <div className="text-sm md:text-base font-black tracking-widest uppercase text-pink mb-2">
          {titulo}
        </div>
        <h2 className="section-title mb-2">{subtitulo}</h2>
      </div>

      {/* Marquee de logos */}
      <div
        className="group relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <style>{`
          @keyframes beneficios-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .beneficios-track {
            animation: beneficios-scroll 40s linear infinite;
            width: max-content;
          }
          .beneficios-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="beneficios-track flex items-stretch gap-4 md:gap-6 py-4">
          {loop.map((file, idx) => (
            <button
              key={`${file}-${idx}`}
              type="button"
              onClick={() => setSelected(file)}
              aria-label={`Ver beneficio ${nombreBeneficio(file)}`}
              className="relative flex-shrink-0 w-52 h-52 md:w-64 md:h-64 rounded-lg overflow-hidden border border-gray-400 transition-transform duration-300 ease-out hover:scale-[1.04] hover:z-10 hover:shadow-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              <Image
                src={`/beneficios/${encodeURIComponent(file)}`}
                alt={nombreBeneficio(file)}
                fill
                sizes="(max-width: 768px) 208px, 256px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {mounted && selected &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Beneficio ${nombreBeneficio(selected)}`}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="fixed top-4 right-4 md:top-6 md:right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white text-2xl leading-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ✕
            </button>

            <figure
              className="flex flex-col items-center justify-center max-w-[95vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/beneficios/${encodeURIComponent(selected)}`}
                alt={nombreBeneficio(selected)}
                className="object-contain max-w-[95vw] max-h-[85vh] w-auto h-auto rounded-lg bg-white shadow-2xl"
              />
              <figcaption className="mt-4 text-center text-white/90 text-base md:text-lg font-medium">
                {nombreBeneficio(selected)}
              </figcaption>
            </figure>
          </div>,
          document.body
        )}
    </section>
  )
}
