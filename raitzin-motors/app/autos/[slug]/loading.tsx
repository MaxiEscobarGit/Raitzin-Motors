export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Skeleton navbar placeholder */}
      <div className="h-16 border-b border-gray-100" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6 pb-16 animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6 pt-2">
          <div className="h-3 w-10 bg-gray-200 rounded" />
          <div className="h-3 w-2 bg-gray-100 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-2 bg-gray-100 rounded" />
          <div className="h-3 w-32 bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12">
          {/* Image skeleton */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[4/3] rounded-2xl bg-gray-100" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-20 aspect-[4/3] rounded-xl bg-gray-100 flex-shrink-0" />
              ))}
            </div>
          </div>

          {/* Info skeleton */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              <div className="h-5 w-24 bg-gray-100 rounded-full" />
              <div className="h-5 w-16 bg-gray-100 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
              <div className="h-4 w-1/2 bg-gray-100 rounded" />
            </div>
            <div className="h-4 w-1/3 bg-gray-100 rounded" />
            <div className="border-t border-gray-100 pt-4">
              <div className="h-10 w-1/2 bg-gray-200 rounded-lg" />
              <div className="h-4 w-1/3 bg-gray-100 rounded mt-2" />
            </div>
            <div className="h-14 w-full bg-gray-100 rounded-full mt-2" />
          </div>
        </div>

        {/* Specs grid skeleton */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 rounded-xl overflow-hidden border border-gray-200 gap-px bg-gray-200">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col p-5 bg-white gap-2">
              <div className="h-5 w-5 bg-gray-100 rounded" />
              <div className="h-3 w-14 bg-gray-100 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
