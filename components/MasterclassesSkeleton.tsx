export function MasterclassesSkeleton() {
  return (
    <div className="w-full bg-arena">
      {/* Desktop skeleton */}
      <div className="hidden md:grid grid-cols-[1fr_320px] gap-11 p-9 h-96 bg-arena animate-pulse">
        <div className="flex flex-col justify-between">
          <div>
            <div className="h-8 bg-gray-300 rounded-full w-48 mb-6"></div>
            <div className="h-20 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-64"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
        <div className="h-full bg-gray-300 rounded-3xl"></div>
      </div>

      {/* Mobile skeleton */}
      <div className="md:hidden p-4 min-h-72 bg-arena animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="h-12 bg-gray-300 rounded w-48"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-3 py-4">
        <div className="h-3 w-3 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="h-3 w-3 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="h-3 w-3 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}
