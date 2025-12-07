import { TrendProps } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";

function Trend({ type, amount, prevAmount }: TrendProps) {
  const colorClasses = {
    Income: "text-green-600 dark:text-text-green-400",
    Expense: "text-red-600 dark:text-red-400",
    Investment: "text-amber-600 dark:text-amber-400",
    Saving: "text-cyan-600 dark:text-cyan-400",
  };

  const calcPercentageChange = (amount: number, prevAmount: number) => {
    if (!prevAmount || !amount) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  };

  const percentageChange = useMemo(
    () => Number(calcPercentageChange(amount, prevAmount).toFixed(0)),
    [amount, prevAmount],
  );

  return (
    <div className="dark:bg-primary-foreground bg-secondary dark:hover:bg-primary-foreground flex h-40 cursor-default flex-col items-center justify-center gap-2 space-y-1 rounded-md shadow-md transition-all duration-300 ease-in-out hover:shadow-md sm:h-50 md:h-40 lg:h-50">
      <div
        className={cn(
          "text-xl font-bold capitalize md:text-lg xl:text-xl",
          colorClasses[type],
        )}
      >
        {type}
      </div>
      <div className="mb-2 text-xl font-semibold sm:text-2xl md:text-xl xl:text-2xl">
        {formatCurrency(amount)}
      </div>
      <div className="-mt-1 flex items-center text-sm sm:space-x-1">
        {percentageChange <= 0 && (
          <ArrowDownLeft className="h-4 w-4 text-red-700 sm:h-5 sm:w-5 dark:text-red-400" />
        )}
        {percentageChange > 0 && (
          <ArrowUpRight className="h-3 w-3 text-green-700 dark:text-green-400" />
        )}
        <p className="text-xs sm:text-sm">{percentageChange}% vs last period</p>
      </div>
    </div>
  );
}

export default Trend;
