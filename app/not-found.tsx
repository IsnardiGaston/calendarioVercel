export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-arena p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-teal mb-4">🛠️</h1>
        <h2 className="text-2xl font-black text-teal mb-3">Estamos en mantenimiento</h2>
        <p className="text-lg text-gray-600 mb-8">
          Estamos haciendo algunos ajustes para mejorar tu experiencia.
          Volvé en unos minutos.
        </p>
        <a href="/" className="btn-primary">
          Reintentar
        </a>
      </div>
    </div>
  )
}
