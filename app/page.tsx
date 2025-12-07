import TransactionListWrapper from "@/components/transactions/transaction-list-wrapper";
import Summary from "@/components/trends/summary";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { range } = await searchParams;
  const rangeAwaited = (range as string) ?? "last30days";

  return (
    <>
      <section className="mt-12 space-y-12">
        <Summary range={rangeAwaited} />
        <TransactionListWrapper range={rangeAwaited} />
      </section>
    </>
  );
}
