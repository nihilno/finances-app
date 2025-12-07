import { TransactionItemsSkeleton } from "@/components/skeletons/transaction-skeletons";
import { fetchTransactions } from "@/lib/actions";
import { Suspense } from "react";
import TransactionItems from "./transaction-items";

async function TransactionListWrapper({ range }: { range: string }) {
  const transactions = await fetchTransactions(range, 0);

  return (
    <Suspense fallback={<TransactionItemsSkeleton />}>
      <TransactionItems
        initialTransactions={transactions}
        range={range}
        key={transactions}
      />
    </Suspense>
  );
}

export default TransactionListWrapper;
