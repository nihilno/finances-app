import z from "zod";
import { categories, types } from "./consts";

export const transactionSchema = z
  .object({
    type: z.enum(types, { message: "Please, select a type." }),
    category: z.string().optional(),
    created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date needs to contain a valid date.",
    }),
    amount: z.coerce
      .number()
      .min(0.01, { message: "Amount must be at least 0.01." }),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "Expense") {
        return (
          data.category !== undefined && categories.includes(data.category)
        );
      }
      return true;
    },
    {
      path: ["category"],
      message: "Category is required for Expense",
    },
  );

export type transactionType = z.input<typeof transactionSchema>;
