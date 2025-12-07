import { Badge } from "@/components/ui/badge";
import { TransactionItemProps } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { LineChart, PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import { notFound } from "next/navigation";
import ActionsDropdown from "./actions-dropdown";

function TransactionItem({
  id,
  type,
  category = "",
  description,
  amount,
}: TransactionItemProps) {
  const typesMap = {
    Income: {
      icon: TrendingUp,
      colors: "text-green-600 dark:text-green-400",
    },
    Expense: {
      icon: TrendingDown,
      colors: "text-red-600 dark:text-red-400",
    },
    Saving: {
      icon: PiggyBank,
      colors: "text-cyan-600 dark:text-cyan-400",
    },
    Investment: {
      icon: LineChart,
      colors: "text-amber-600 dark:text-amber-400",
    },
  };
  const IconComponent = typesMap[type].icon;
  const colors = typesMap[type].colors;

  if (!id) notFound();

  return (
    <div className="hover:bg-primary/10 flex w-full cursor-default items-center rounded-sm transition-all duration-300 ease-in-out">
      <div className="mr-4 flex grow items-center">
        <IconComponent
          className={cn(colors, "mr-2 h-3 w-3 sm:block sm:h-5 sm:w-5")}
        />
        <span className="line-clamp-1 first-letter:capitalize">
          {description}
        </span>
      </div>
      <div className="mr-4 hidden min-w-[150px] items-center sm:flex">
        {category && <Badge>{category}</Badge>}
      </div>

      <div className="min-w-[70px] text-right">{formatCurrency(amount)}</div>
      <div className="ml-2">
        <ActionsDropdown id={id} />
      </div>
    </div>
  );
}

export default TransactionItem;
