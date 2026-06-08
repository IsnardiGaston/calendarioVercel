'use client'

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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
        {fotos.map((foto, idx) => (
          <figure
            key={foto.id}
            className={`group relative overflow-hidden rounded-lg aspect-square bg-arenadk ${
              // Primera foto destacada en desktop
              idx === 0 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2 aspect-auto' : ''
            }`}
          >
            <Image
              src={foto.imageUrl}
              alt={foto.caption || 'Foto del mes anterior'}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {foto.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm md:text-base font-medium p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {foto.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  )
}
