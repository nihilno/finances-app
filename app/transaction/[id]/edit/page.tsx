import MainTitle from "@/components/global/titles";
import TransactionForm from "@/components/transactions/add/transaction-form";
import { fetchSingleTransaction } from "@/lib/actions";
import { EditPageProps } from "@/lib/types";
import { Sleep } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Transaction",
};

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const transaction = await fetchSingleTransaction(id);
  await Sleep(3000);

  return (
    <section className="mt-12 flex flex-col items-center space-y-6">
      <MainTitle>Edit Transaction</MainTitle>
      <TransactionForm initialData={transaction} />
    </section>
  );
}
