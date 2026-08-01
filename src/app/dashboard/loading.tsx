import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardOverviewLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-7 w-40" />
        <Skeleton className="mt-2 h-4 w-56" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl glass-surface glass-border p-5">
            <Skeleton className="mb-4 h-10 w-10 rounded-xl" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-2 h-7 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
