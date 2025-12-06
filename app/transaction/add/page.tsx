import MainTitle from "@/components/global/titles";
import TransactionForm from "@/components/transactions/add/transaction-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Transaction",
};

export default function TransactionAddPage() {
  return (
    <section className="mt-12 flex flex-col items-center space-y-6">
      <MainTitle>Add Transaction</MainTitle>
      <TransactionForm />
    </section>
  );
}
