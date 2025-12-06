import { Skeleton } from "@/components/ui/skeleton";

export function FormSkeleton() {
  return (
    <section className="mt-12 flex flex-col items-center space-y-6">
      <Skeleton className="h-10 w-60" />
      <Skeleton className="flex w-full max-w-120 flex-col items-center">
        <div className="mt-6 grid w-full max-w-120 grid-cols-1 gap-11 rounded-md p-4">
          <Skeleton className="bg-muted-foreground/10 h-8 w-full" />
          <Skeleton className="bg-muted-foreground/10 h-8 w-full" />
          <Skeleton className="bg-muted-foreground/10 h-8 w-full" />
          <Skeleton className="bg-muted-foreground/10 h-8 w-full" />
          <Skeleton className="bg-muted-foreground/10 h-8 w-full" />
          <div className="mt-4 space-y-3">
            <Skeleton className="bg-muted-foreground/10 h-8 w-full" />
            <Skeleton className="bg-muted-foreground/10 h-8 w-full" />
          </div>
        </div>
      </Skeleton>
    </section>
  );
}
