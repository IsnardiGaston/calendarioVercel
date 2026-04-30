'use client'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-arena border-b-2 border-teal px-2 sm:px-4 md:px-12 h-12 sm:h-14 md:h-14.5 flex items-center justify-between gap-2">
      <div className="logo text-xs sm:text-sm md:text-lg">
        WORKING<span className="amp">&</span>CO
      </div>
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <span className="hidden sm:inline text-xs md:text-base italic text-teal font-semibold tracking-widest">
          Work your way
        </span>
        <span className="bg-pink text-white text-xs sm:text-sm md:text-base font-black px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full tracking-wider whitespace-nowrap">
          Mes del Trabajador 2026
        </span>
      </div>
    </nav>
  )
}
