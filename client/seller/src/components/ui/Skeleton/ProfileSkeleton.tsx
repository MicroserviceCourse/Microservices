export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="rounded-2xl shadow-sm bg-white border border-gray-200 overflow-hidden h-full animate-pulse">
        {/* Cover */}
        <div className="w-full h-40 bg-slate-200" />

        <div className="p-8 relative">
          {/* Avatar */}
          <div className="absolute -top-12 left-8 w-24 h-24 rounded-full bg-slate-300 border-4 border-white" />

          <div className="mt-14 flex flex-col gap-6">
            {/* Name + badge */}
            <div>
              <div className="w-24 h-4 bg-slate-200 rounded mb-2" />
              <div className="w-40 h-6 bg-slate-300 rounded mb-2" />
              <div className="w-32 h-4 bg-slate-200 rounded" />
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 gap-4 py-6 border-y border-gray-100">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-2/3" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <div className="w-36 h-11 bg-slate-300 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
