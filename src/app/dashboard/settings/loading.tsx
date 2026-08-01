import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-7 w-32" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Skeleton className="h-72 w-full rounded-2xl" />
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
    </div>
  );
}
