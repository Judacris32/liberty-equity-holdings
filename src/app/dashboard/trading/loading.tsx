import { Skeleton } from "@/components/ui/skeleton";

export default function TradingLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-7 w-48" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-full" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-[500px] w-full rounded-2xl sm:h-[600px]" />
        </div>
        <Skeleton className="h-[420px] w-full rounded-2xl" />
      </div>
    </div>
  );
}
