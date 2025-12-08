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
  if (!fileExt) throw new Error("Invalid file name; missing extension.");

  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (uploadError) {
    console.error("uploadAvatar: upload error", uploadError);
    throw new Error("Error uploading avatar");
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error("uploadAvatar: getUser error", userError);
    throw new Error("Something went wrong, try again.");
  }

  const previousAvatar = userData.user.user_metadata?.avatar;

  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar: fileName },
  });

  if (updateError) {
    console.error("uploadAvatar: updateUser error", updateError);
    throw new Error("Error associating the avatar with the user.");
  }

  if (previousAvatar) {
    const { error: removeError } = await supabase.storage
      .from("avatars")
      .remove([previousAvatar]);

    if (removeError) {
      console.warn(
        "uploadAvatar: failed to remove previous avatar",
        removeError,
      );
    }
  }

  revalidatePath("/settings/avatar");
}

export async function deleteAvatar(): Promise<void> {
  const supabase = await createClient();
  const { data, error: getUserError } = await supabase.auth.getUser();

  if (getUserError || !data?.user) {
    console.error("deleteAvatar: getUser error", getUserError);
    throw new Error("Something went wrong while fetching user.");
  }

  const avatar = data.user.user_metadata?.avatar;
  if (avatar) {
    const { error: removeError } = await supabase.storage
      .from("avatars")
      .remove([avatar]);
    if (removeError) {
      console.error("deleteAvatar: remove error", removeError);
      throw new Error("Something went wrong deleting your avatar.");
    }
  }

  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar: null },
  });

  if (updateError) {
    console.error("deleteAvatar: updateUser error", updateError);
    throw new Error("Something went wrong deleting your avatar.");
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
