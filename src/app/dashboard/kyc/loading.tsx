import { Skeleton } from "@/components/ui/skeleton";

export default function KycLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-7 w-56" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
      <Skeleton className="h-80 w-full max-w-xl rounded-2xl" />
    </div>
  );
}
