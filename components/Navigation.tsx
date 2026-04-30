'use client'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-arena border-b-2 border-teal px-3 md:px-12 h-14 md:h-14.5 flex items-center justify-between">
      <div className="logo">
        WORKING<span className="amp">&</span>CO
      </div>
      <div className="flex items-center gap-6">
        <span className="hidden md:inline text-base italic text-teal font-semibold tracking-widest">
          Work your way
        </span>
        <span className="bg-pink text-white text-base font-black px-4 py-1.5 rounded-full tracking-wider">
          Mes del Trabajador 2026
        </span>
      </div>
    </nav>
  )
}
