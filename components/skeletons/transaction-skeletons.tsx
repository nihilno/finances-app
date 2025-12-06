import { Skeleton } from "@/components/ui/skeleton";

export function TransactionItemsSkeleton() {
  return (
    <div className="mt-16">
      <TransactionSummaryItemSkeleton />
      <div className="mt-12 space-y-6">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <TransactionItemSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}

function TransactionItemSkeleton() {
  return (
    <div>
      <Skeleton className="flex h-[110px] w-full flex-col justify-center gap-4 p-4">
        <Skeleton className="bg-muted-foreground/30 h-6 w-20" />
        <Skeleton className="bg-muted-foreground/30 h-6 w-full" />
      </Skeleton>
    </div>
  );
}

function TransactionSummaryItemSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-7 w-50" />
      <Skeleton className="h-8 w-21" />
    </div>
  );
}
