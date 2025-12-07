import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function DateRangeSelect({ ...props }) {
  return (
    <Select {...props}>
      <SelectTrigger className={cn("w-[180px]", props.className)}>
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

export default DateRangeSelect;
