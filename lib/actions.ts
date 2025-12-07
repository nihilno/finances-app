"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { LIMIT } from "./consts";
import { transactionSchema, transactionType } from "./schemas";
import { createClient } from "./supabase/server";
import { TransactionItemType } from "./types";

export async function createTransaction(formData: transactionType) {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("transactions").insert(validated.data);

  if (error) {
    throw new Error("Failed to create the transaction.");
  }

  revalidatePath("/");
}

export async function updateTransaction(id: string, formData: transactionType) {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("transactions")
    .update(validated.data)
    .eq("id", id);

  if (error) {
    throw new Error("Failed to create the transaction.");
  }

  revalidatePath("/");
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error("Failed to delete the transaction.");
  revalidatePath("/");
}

export async function fetchTransactions(range: string, offset: number = 0) {
  const supabase = await createClient();
  const { data: transactions, error } = await supabase.rpc(
    "fetch_transactions",
    {
      range_arg: range,
      offset_arg: offset,
      limit_arg: LIMIT,
    },
  );
  if (error) throw new Error("Unable to fetch transactions.");
  return transactions;
}

export async function fetchSingleTransaction(
  id: string,
): Promise<TransactionItemType> {
  const supabase = await createClient();
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

export async function login(
  prevState: { message: string },
  formData: FormData,
) {
  const email = formData.get("email");
  if (!email || typeof email !== "string") {
    return { error: true, message: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    return { error: true, message: "Something went wrong. Try again later." };
  }

  return {
    error: false,
    message: `We sent a link to ${email}. Check your inbox!`,
  };
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  redirect("/login");
}
