"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { LIMIT } from "./consts";
import { settingsSchema, transactionSchema, transactionType } from "./schemas";
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
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
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
  if (error) {
    throw new Error("Unable to Logout.");
  }
  redirect("/login");
}

export async function uploadAvatar(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) return;

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (error) {
    throw new Error("Error uploading avatar");
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw new Error("Something went wrong, try again.");
  }

  const avatar = userData.user.user_metadata.avatar;
  if (avatar) {
    const { error } = await supabase.storage.from("avatars").remove([avatar]);

    if (error) {
      throw new Error("Something went wrong, try again.");
    }
  }

  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: fileName,
    },
  });

  if (dataUpdateError) {
    throw new Error("Error associating the avatar with the user.");
  }
}

export async function deleteAvatar() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const avatar = data.user?.user_metadata.avatar;
  if (avatar) {
    const { error } = await supabase.storage.from("avatars").remove([avatar]);

    if (error) {
      throw new Error("Something went deleting your avatar.");
    }
  }

  if (error) {
    throw new Error("Something went deleting your avatar.");
  }

  revalidatePath("/settings/avatar");
}

export async function updateSettings(
  prevState: {
    success: boolean;
    errors?: Record<string, string[]>;
    message?: string;
  },
  formData: FormData,
) {
  const validated = settingsSchema.safeParse({
    name: formData.get("name"),
    defaultView: formData.get("defaultView"),
  });

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: {
      fullName: validated.data.name,
      defaultView: validated.data.defaultView,
    },
  });

  if (error) {
    return { success: false, message: "Unable to update settings." };
  }

  return { success: true };
}
