"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchTransactions } from "@/lib/actions";
import { TransactionItemType } from "@/lib/types";
import { groupByDate } from "@/lib/utils";
import { BanknoteArrowUp, Loader2Icon, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import TransactionItem from "./transaction-item";
import TransactionSummaryItem from "./transaction-summary-item";

function TransactionItems({
  initialTransactions,
  range,
}: {
  initialTransactions: TransactionItemType[];
  range: string;
}) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [offset, setOffset] = useState(initialTransactions.length);
  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0,
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);

    try {
      const nextTransactions = await fetchTransactions(range, offset);

      setButtonHidden(nextTransactions.length === 0);
      setOffset((prev) => prev + 10);
      setTransactions((prev) => {
        const updated = [...prev, ...nextTransactions];

        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  const groupedTransactions = groupByDate(transactions);

  return (
    <div className="mt-16 px-4 py-8">
      <div className="flex items-center justify-between pb-4">
        <div className="flex flex-col justify-between gap-1">
          <h2 className="line-clamp-1 text-xl font-semibold md:text-2xl">
            Recent Transactions
          </h2>
          <span className="text-muted-foreground text-sm">
            Total ({transactions.length})
          </span>
        </div>
        <Link href="/transaction/add" className="w-20">
          <Button className="flex w-full items-center" size="sm">
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </Link>
      </div>

      <ScrollArea className="h-140 border-t border-b py-4">
        {Object.keys(groupedTransactions).length === 0 ? (
          <div className="text-muted-foreground dark:bg-primary-foreground bg-secondary absolute inset-0 flex flex-col items-center justify-center gap-5 text-center">
            <BanknoteArrowUp className="h-16 w-16 animate-pulse md:h-24 md:w-24" />
            No transactions match your current filters. <br /> Add your first
            one to get started.
            <Link href="/transaction/add">
              <Button className="flex w-20 items-center" size="sm">
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTransactions).map(
              ([date, { transactions, amount }]) => (
                <div
                  key={date}
                  className="dark:bg-primary-foreground bg-secondary hover:bg-primary-foreground rounded-md p-4 shadow-md transition-all duration-300 ease-in-out"
                >
                  <TransactionSummaryItem date={date} amount={amount} />
                  <div className="space-y-1">
                    {transactions.map((transaction, index) => (
                      <TransactionItem key={index} {...transaction} />
                    ))}
                  </div>
                </div>
              ),
            )}
            {!buttonHidden && (
              <div className="flex justify-center">
                <Button
                  onClick={handleClick}
                  disabled={isLoading}
                  className="w-30"
                  size="sm"
                  variant="ghost"
                >
                  {isLoading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Load more"
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
        <ScrollBar />
      </ScrollArea>
    </div>
  );
}

export default TransactionItems;
