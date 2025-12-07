"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DateRangeSelect from "../global/date-range-select";

function Range({ range }: { range: string }) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();

  // const range = searchParams.get("range") || "last30days";
  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", value);
    replace(`${path}?${params.toString()}`);
  }

  return <DateRangeSelect value={range} onValueChange={handleChange} />;
}

export default Range;
