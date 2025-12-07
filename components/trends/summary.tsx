import { types } from "@/lib/consts";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import MainTitle from "../global/titles";
import {
  TrendsErrorSkeleton,
  TrendsSkeleton,
} from "../skeletons/trends-skeletons";
import Range from "./range";
import Trends from "./trends";

function Summary({ range }: { range: string }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <MainTitle>Summary</MainTitle>
        <Range range={range} />
      </div>
      <div className="-mt-4 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4 lg:gap-8">
        {types.map((type) => (
          <ErrorBoundary key={type} fallback={<TrendsErrorSkeleton />}>
            <Suspense fallback={<TrendsSkeleton />}>
              <Trends type={type} range={range} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </div>
    </>
  );
}

export default Summary;
