import { TrendProps } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";

export default function Trend({ type, amount, prevAmount }: TrendProps) {
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
    <div className="dark:bg-primary-foreground/80 bg-secondary dark:hover:bg-primary-foreground flex h-40 cursor-default flex-col items-center justify-center gap-2 space-y-1 rounded-md transition-all duration-300 ease-in-out hover:shadow-md sm:h-50 md:gap-4">
      <div
        className={cn("font-bold capitalize md:text-xl", colorClasses[type])}
      >
        {type}
      </div>
      <div className="mb-2 text-xl font-semibold sm:text-2xl md:text-3xl">
        {formatCurrency(amount)}
      </div>
      <div className="-mt-1 flex items-center text-sm sm:space-x-1">
        {percentageChange <= 0 && (
          <ArrowDownLeft className="text-red-700 dark:text-red-400" />
        )}
        {percentageChange > 0 && (
          <ArrowUpRight className="text-green-700 dark:text-green-400" />
        )}
        <p className="text-xs sm:text-sm">{percentageChange}% vs last period</p>
      </div>
    </div>
  );
}
