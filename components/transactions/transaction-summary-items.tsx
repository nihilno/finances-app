import TransactionItem from "./transaction-item";
import TransactionSummaryItem from "./transaction-summary-item";

export default function TransactionSummaryItems() {
  return (
    <div>
      <div className="space-y-4">
        <TransactionSummaryItem date="2026-05-01" amount={3500} />
        <TransactionItem type="Income" description="Salary" amount={2000} />
        <TransactionItem
          type="Expense"
          category="Food"
          description="Going out to eat"
          amount={29}
        />
        <TransactionItem
          type="Saving"
          description="For children"
          amount={500}
        />
        <TransactionItem
          type="Investment"
          description="In Microsoft"
          amount={9000}
        />
      </div>
    </div>
  );
}
