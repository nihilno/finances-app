export type TransactionItemType = {
  id: string;
  type: "Income" | "Expense" | "Investment" | "Saving";
  category?: string;
  description: string;
  amount: number;
  created_at: string;
};

export type TransactionItemProps = {
  id?: string;
  type: "Income" | "Expense" | "Investment" | "Saving";
  category?: string;
  description: string;
  amount: number;
};

export type TrendProps = {
  type: "Income" | "Expense" | "Investment" | "Saving";
  amount: number;
  prevAmount: number;
};

export type TrendsProps = {
  type: "Income" | "Expense" | "Investment" | "Saving";
  range: string;
};

export type TransactionSummaryItemProps = {
  date: string;
  amount: number;
};

export type EditPageProps = {
  params: { id: string };
};

export type LoginState = {
  message: string;
  error: boolean;
};
