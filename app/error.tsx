"use client";

import { Button } from "@/components/ui/button";

import { AlertCircle, Home, RotateCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mt-42 flex flex-col items-center justify-center text-center">
      <AlertCircle className="text-muted-foreground mb-4 h-12 w-12" />
      <h2 className="mb-2 text-2xl font-semibold">Something went wrong.</h2>
      <p className="max-w-md opacity-60">
        {error.message ||
          "An error occured, but don't worry — we'll get you back."}
      </p>
      <div className="mt-6 space-x-4">
        <Button onClick={reset} variant="outline">
          <RotateCw /> <span>Reload</span>
        </Button>
        <Link href="/">
          <Button>
            <Home /> <span>Go Home</span>
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xs opacity-75">
        Error ID: {error.digest || "local"}
      </p>
    </div>
  );
}
