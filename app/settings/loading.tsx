import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Loader2 className="text-muted-foreground h-16 w-16 animate-spin lg:h-24 lg:w-24" />
    </div>
  );
}
