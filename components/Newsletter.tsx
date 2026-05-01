'use client'

import { useInView } from '@/hooks/useInView'

export function Newsletter() {
  const { ref, isInView } = useInView()

  return (
    <section
      ref={ref}
      className={`bg-arena border-t-2 border-teal border-b-2 p-5 md:p-8 lg:p-12 xl:p-20 relative overflow-hidden ${
        isInView ? 'animate-revealIn' : 'opacity-0'
      }`}
    >
      {/* Decorative blobs */}
      <svg
        className="absolute w-72 h-72 animate-float"
        style={{ top: '-10%', left: '-5%' }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M47.5,-57.2C59.5,-46.5,65.6,-28.5,67.8,-9.8C70,8.9,68.3,28.3,58.4,42.1C48.5,55.9,30.4,64.1,10.8,67.6C-8.8,71.1,-30,69.9,-47.5,59.6C-65,49.3,-78.8,29.9,-79.2,9.8C-79.6,-10.3,-66.6,-31.1,-51.2,-43.6C-35.8,-56.1,-17.9,-60.3,1.2,-61.7C20.3,-63.1,35.5,-67.9,47.5,-57.2Z"
          fill="#c93860"
          opacity="0.2"
          transform="translate(100 100)"
        />
      </svg>

      <svg
        className="absolute w-64 h-64 animate-float"
        style={{ bottom: '-5%', right: '5%', animationDelay: '2s' }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M43.3,-54.8C55.2,-47.8,62.9,-35.7,65.4,-22.1C67.9,-8.5,65.2,6.9,58.2,20.1C51.2,33.2,39.8,44.2,26.7,50.5C13.5,56.8,-1.5,58.3,-18.1,54.6C-34.7,50.9,-52.9,42,-60.5,28.2C-68.1,14.5,-65.2,-4.4,-58.2,-20.3C-51.2,-36.2,-40,-50,-27.2,-57.5C-14.4,-65,-0.1,-66.2,13.7,-62.4C27.6,-58.6,31.4,-61.8,43.3,-54.8Z"
          fill="#fa881e"
          opacity="0.25"
          transform="translate(100 100)"
        />
      </svg>

      <svg
        className="absolute w-56 h-56 animate-float"
        style={{ top: '10%', right: '-5%', animationDelay: '4s' }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50.1,-55.2C63.9,-48.5,74,-37,77.3,-23C80.6,-9,77.3,8.3,70.2,23.3C63.1,38.3,52.3,51.1,39.3,57.2C26.3,63.2,11.2,62.5,-6,61.3C-23.2,60.2,-42.4,58.6,-55.1,49.7C-67.8,40.8,-73.9,24.5,-72.4,8.8C-70.9,-6.8,-61.7,-22.8,-50.8,-32.4C-39.8,-42,-27,-45.2,-13.1,-48.5C0.8,-51.7,36.2,-61.9,50.1,-55.2Z"
          fill="#0d7579"
          opacity="0.15"
          transform="translate(100 100)"
        />
      </svg>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="text-base font-black tracking-widest uppercase text-pink mb-4">
          Entérate primero
        </div>

        <h2 className="section-title mb-3">Seguinos para las últimas novedades</h2>

        <p className="section-desc mb-8">
          Mantente actualizado sobre todas las actividades, eventos y sorpresas del Mes del Trabajador.
        </p>

        <div className="flex gap-3 md:gap-4 flex-wrap justify-center">
          <a
            href="https://ar.linkedin.com/company/workingandco"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 no-underline bg-blue-600 text-white text-base md:text-base font-black px-4 md:px-6 py-2.5 rounded-full hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200"
            aria-label="Seguinos en LinkedIn - abre en una nueva ventana"
          >
            <span>in</span> LinkedIn
          </a>

          <a
            href="https://www.instagram.com/workingandcoar/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 no-underline bg-pink text-white text-base md:text-base font-black px-4 md:px-6 py-2.5 rounded-full hover:bg-pink/90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2 transition-all duration-200"
            aria-label="Seguinos en Instagram (@workingandcoar) - abre en una nueva ventana"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" strokeWidth="2" />
              <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
            </svg>
            @workingandcoar
          </a>
        </div>
      </div>
    </section>
  )
}
