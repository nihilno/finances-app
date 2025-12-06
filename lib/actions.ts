"use server";

import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { LIMIT } from "./consts";
import { transactionSchema, transactionType } from "./schemas";
import { supabase } from "./supabase/server";
import { TransactionItemType } from "./types";

export async function createTransaction(formData: transactionType) {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data.");
  }

  const { error } = await supabase.from("transactions").insert(validated.data);

  if (error) {
    throw new Error("Failed creating the transaction.");
  }

  revalidatePath("/");
}

export async function updateTransaction(id: string, formData: transactionType) {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data.");
  }

  const { error } = await supabase
    .from("transactions")
    .update(validated.data)
    .eq("id", id);

  if (error) {
    throw new Error("Failed creating the transaction.");
  }

  revalidatePath("/");
}

export async function deleteTransaction(id: string) {
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error("Could not delete the transaction.");
  revalidatePath("/");
}

export async function fetchTransactions(range: string, offset: number = 0) {
  const { data: transactions, error } = await supabase.rpc(
    "fetch_transactions",
    {
      range_arg: range,
      offset_arg: offset,
      limit_arg: LIMIT,
    },
  );
  if (error) throw new Error("Cannot fetch transactions.");
  return transactions;
}

export async function fetchSingleTransaction(
  id: string,
): Promise<TransactionItemType> {
  const { data: transaction, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    notFound();
  }
  return transaction;
}
