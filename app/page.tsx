import TransactionListWrapper from "@/components/transactions/transaction-list-wrapper";
import Summary from "@/components/trends/summary";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { range } = await searchParams;
  const rangeAwaited = range ?? user?.user_metadata.defaultView ?? "last30days";

  return (
    <>
      <section className="mt-12 space-y-12">
        <Summary range={rangeAwaited} />
        <TransactionListWrapper range={rangeAwaited} />
      </section>
    </>
  );
}
