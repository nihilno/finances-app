import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TransactionItemType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number | string,
  currency: string = "USD",
  locale: string = "en-US",
) {
  const number = typeof value === "string" ? Number(value) : value;

  if (isNaN(number)) return "—";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(number);
}

export function Sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function groupByDate(transactions?: TransactionItemType[] | null) {
  const grouped: Record<
    string,
    { transactions: TransactionItemType[]; amount: number }
  > = {};

  for (const transaction of transactions ?? []) {
    if (!transaction.created_at) continue;

    const date = transaction.created_at.split("T")[0];
    if (!date) continue;

    if (!grouped[date]) grouped[date] = { transactions: [], amount: 0 };

    grouped[date].transactions.push(transaction);

    const amount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount;
    grouped[date].amount += amount;
  }

  return grouped;
}
