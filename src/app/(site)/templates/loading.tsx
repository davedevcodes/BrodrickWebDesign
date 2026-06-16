export default function PortfolioLoading() {
  return (
    <div className="bg-white">
      <div className="container-custom flex flex-col items-center py-32 pt-44 text-center sm:pt-52">
        <div className="h-4 w-32 animate-pulse rounded-full bg-black/10" />
        <div className="mt-4 h-12 w-72 animate-pulse rounded-full bg-black/10 sm:w-96" />
        <div className="mt-6 h-4 w-full max-w-xl animate-pulse rounded-full bg-black/10" />
      </div>

      <div className="bg-background pb-24 sm:pb-32">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-10 w-32 animate-pulse rounded-full border border-border bg-background-secondary" />
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-3xl border border-border bg-background-secondary">
                <div className="aspect-[4/3] w-full animate-pulse bg-white/5" />
                <div className="space-y-3 p-6">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
                  <div className="h-5 w-3/4 animate-pulse rounded-full bg-white/10" />
                  <div className="h-3 w-full animate-pulse rounded-full bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
