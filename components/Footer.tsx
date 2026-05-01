'use client'

import { useInView } from '@/hooks/useInView'

export function Footer() {
  const { ref, isInView } = useInView({ threshold: 0 })

  return (
    <footer ref={ref} className={`bg-arena border-t-2 border-teal p-5 md:p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 flex-wrap ${isInView ? 'animate-revealIn' : 'opacity-0'}`}>
      <div>
        <div className="logo text-lg md:text-2xl">
          WORKING<span className="amp">&</span>CO
        </div>
        <div className="text-base italic text-teal font-semibold tracking-wider mt-1">
          Work your way · Mes del Trabajador 2026
        </div>
      </div>

      <div className="text-center">
        <div className="text-base md:text-base text-teal italic font-semibold">
          Trabajar mejor · Vivir mejor
        </div>
        <div className="text-base text-gray-500 mt-1">
          Un mes dedicado a tu cuerpo, mente y comunidad
        </div>
      </div>

      <a
        href="https://www.workingand.co"
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal no-underline text-base md:text-base font-black border-b-2 border-pink pb-0.5 hover:text-pink active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 transition-all duration-200"
        aria-label="Ir a workingand.co - abre en una nueva ventana"
      >
        workingand.co →
      </a>
    </footer>
  )
}
