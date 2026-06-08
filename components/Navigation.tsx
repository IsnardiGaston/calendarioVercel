'use client'

interface NavigationProps {
  titulo: string
  tituloDestacado: string
  year: number
}

export function Navigation({ titulo, tituloDestacado, year }: NavigationProps) {
  const scrollToHome = () => {
    document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-arena border-b-2 border-teal px-2 sm:px-4 md:px-12 h-12 sm:h-14 md:h-14.5 flex items-center justify-between gap-2">
      <button
        onClick={scrollToHome}
        className="logo text-xs sm:text-sm md:text-lg cursor-pointer transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 rounded px-2 py-1"
        aria-label="Volver al inicio"
      >
        WORKING<span className="amp">&</span>CO
      </button>
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <span className="hidden sm:inline text-xs md:text-base italic text-teal font-semibold tracking-widest">
          Work your way
        </span>
        <span className="bg-pink text-white text-xs sm:text-sm md:text-base font-black px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full tracking-wider whitespace-nowrap focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal">
          {titulo} {tituloDestacado}
        </span>
      </div>
    </nav>
  )
}
