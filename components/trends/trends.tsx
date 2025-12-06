import { supabase } from "@/lib/supabase/server";
import { TrendsProps } from "@/lib/types";
import Trend from "./trend";

export default async function Trends({ type, range }: TrendsProps) {
  const { data, error } = await supabase.rpc("calculate_total", {
    type_arg: type,
    range_arg: range,
  });
  if (error) throw new Error("Could not fetch the trend data.");

  const amounts = data[0];

  return (
    <Trend
      type={type}
      amount={amounts.current_amount}
      prevAmount={amounts.previous_amount}
    />
  );
}
