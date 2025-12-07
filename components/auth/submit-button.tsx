"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitButton({
  children,
  variant,
  size,
  className,
}: {
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon-sm" | "icon-lg";
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={cn("capitalize", className)}
      variant={variant}
      disabled={pending}
      size={size}
    >
      {pending ? <Loader2Icon className="w-full animate-spin" /> : children}
    </Button>
  );
}

export default SubmitButton;
