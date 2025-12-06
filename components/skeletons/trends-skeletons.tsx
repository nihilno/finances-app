import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Loader2Icon } from "lucide-react";

export function TrendsSkeleton() {
  return (
    <Skeleton className="dark:bg-secondary grid h-40 w-full place-items-center rounded-md sm:h-50">
      <Loader2Icon
        className="h-10 w-10 animate-spin md:h-16 md:w-16"
        color="#999"
      />
    </Skeleton>
  );
}

export function TrendsErrorSkeleton() {
  return (
    <Skeleton className="dark:bg-secondary flex h-40 w-full flex-col items-center justify-center gap-2 rounded-md text-center sm:h-50">
      <AlertCircle />
      <p className="text-xs">Cannnot load this resource.</p>
    </Skeleton>
  );
}
