'use client'

import { useInView } from '@/hooks/useInView'

export function Footer() {
  const { ref, isInView } = useInView()

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

      <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center md:justify-start">
        <a
          href="https://www.workingand.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal no-underline text-base md:text-base font-black border-b-2 border-pink pb-0.5 hover:text-pink transition-colors"
        >
          workingand.co →
        </a>

        <a
          href="https://ar.linkedin.com/company/workingandco"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 no-underline bg-blue-600 text-white text-base md:text-base font-black px-3 md:px-4 py-1.5 rounded-full hover:bg-blue-700 transition-colors"
        >
          <span>in</span> LinkedIn
        </a>

        <a
          href="https://www.instagram.com/workingandcoar/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 no-underline bg-pink text-white text-base md:text-base font-black px-3 md:px-4 py-1.5 rounded-full hover:bg-pink/90 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" strokeWidth="2" />
            <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
          </svg>
          @workingandcoar
        </a>
      </div>
    </footer>
  )
}
