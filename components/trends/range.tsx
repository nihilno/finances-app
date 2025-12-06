"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Range() {
  const searchParams = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();

  const range = searchParams.get("range") || "last30days";
  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", value);
    replace(`${path}?${params.toString()}`);
  }

  return (
    <Select value={range} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="last24hours">Last 24 hours</SelectItem>
        <SelectItem value="last7days">Last 7 days</SelectItem>
        <SelectItem value="last30days">Last 30 days</SelectItem>
        <SelectItem value="last12months">Last 12 months</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default Range;
