"use client";

import DateRangeSelect from "@/components/global/date-range-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Range({ range }: { range: string }) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", value);
    replace(`${path}?${params.toString()}`);
  }

  return <DateRangeSelect value={range} onValueChange={handleChange} />;
}

export default Range;
