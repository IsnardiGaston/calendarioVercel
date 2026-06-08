interface FooterProps {
  titulo: string
  tituloDestacado: string
  year: number
  subtituloLinea1: string
  subtituloLinea2: string
}

export function Footer({ titulo, tituloDestacado, year, subtituloLinea1, subtituloLinea2 }: FooterProps) {
  return (
    <footer className="bg-arena border-t-2 border-teal p-5 md:p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 flex-wrap">
      <div>
        <div className="logo text-lg md:text-2xl">
          WORKING<span className="amp">&</span>CO
        </div>
        <div className="text-base italic text-teal font-semibold tracking-wider mt-1">
          Work your way · {titulo} {tituloDestacado} {year}
        </div>
      </div>

      <div className="text-center">
        <div className="text-base md:text-base text-teal italic font-semibold">
          {subtituloLinea1}
        </div>
        <div className="text-base text-gray-700 mt-1">
          {subtituloLinea2}
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
