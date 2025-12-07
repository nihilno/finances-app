import { TransactionSummaryItemProps } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

function TransactionSummaryItem({ date, amount }: TransactionSummaryItemProps) {
  return (
    <div className="text-muted-foreground mb-2 flex w-full border-b pr-[39px] pb-2 font-semibold">
      <div className="grow">{date}</div>

      <div className="min-w-[70px] text-right font-semibold">
        {formatCurrency(amount)}
      </div>
    </div>
  );
}

export default TransactionSummaryItem;
