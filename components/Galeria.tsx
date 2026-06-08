'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'
import type { GaleriaFoto } from '@/lib/strapi'

interface GaleriaProps {
  fotos: GaleriaFoto[]
  titulo: string
  subtitulo: string
}

export function Galeria({ fotos, titulo, subtitulo }: GaleriaProps) {
  const { ref, isInView } = useInView()
  const [selected, setSelected] = useState<GaleriaFoto | null>(null)
  const [mounted, setMounted] = useState(false)

  const close = useCallback(() => setSelected(null), [])

  useEffect(() => setMounted(true), [])

  // Cerrar con Escape y bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [selected, close])

  if (fotos.length === 0) return null

  return (
    <section
      ref={ref}
      id="galeria"
      className={`bg-arena border-t-2 border-teal p-5 md:p-8 lg:p-12 xl:p-20 ${
        isInView ? 'animate-revealIn' : 'opacity-0'
      }`}
    >
      <div className="mb-6 md:mb-10 lg:mb-12">
        <div className="text-sm md:text-base font-black tracking-widest uppercase text-pink mb-2">
          {titulo}
        </div>
        <h2 className="section-title mb-2">{subtitulo}</h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
        {fotos.map((foto) => (
          <button
            key={foto.id}
            type="button"
            onClick={() => setSelected(foto)}
            aria-label={foto.caption ? `Ampliar: ${foto.caption}` : 'Ampliar foto'}
            className="group relative overflow-hidden rounded-lg aspect-square bg-arenadk cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.06] hover:z-10 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 active:scale-[1.02]"
          >
            <Image
              src={foto.imageUrl}
              alt={foto.caption || 'Foto del mes anterior'}
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {foto.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-medium p-2 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {foto.caption}
              </figcaption>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox / modal — renderizado en un portal al body para cubrir toda la pantalla */}
      {mounted && selected &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={selected.caption || 'Foto ampliada'}
          >
            {/* Botón cerrar */}
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
                src={selected.imageUrl}
                alt={selected.caption || 'Foto ampliada'}
                className="object-contain max-w-[95vw] max-h-[85vh] w-auto h-auto rounded-lg shadow-2xl"
              />
              {selected.caption && (
                <figcaption className="mt-4 text-center text-white/90 text-base md:text-lg font-medium">
                  {selected.caption}
                </figcaption>
              )}
            </figure>
          </div>,
          document.body
        )}
    </section>
  )
}
