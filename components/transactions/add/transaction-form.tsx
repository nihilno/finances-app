"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTransaction, updateTransaction } from "@/lib/actions";
import { categories, types } from "@/lib/consts";
import { transactionSchema, transactionType } from "@/lib/schemas";
import { TransactionItemType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function TransactionForm({
  initialData,
}: {
  initialData?: TransactionItemType;
}) {
  const form = useForm<transactionType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData ?? {
      type: "Income",
      created_at: new Date().toISOString().split("T")[0],
      amount: "",
      category: "",
      description: "",
    },
  });

  const router = useRouter();
  const type = form.watch("type");
  const isEditing = Boolean(initialData);

  async function onSubmit(data: transactionType) {
    try {
      if (isEditing) {
        if (!initialData) notFound();
        await updateTransaction(initialData.id, data);
        toast.success("Transaction edited successfully.");
      } else {
        await createTransaction(data);
        toast.success("Transaction added successfully.");
      }

      router.push("/");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : String(error) || "Something went wrong.";
      console.error(error);
      toast.error(message);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="dark:bg-primary-foreground/80 bg-secondary grid w-full max-w-120 grid-cols-1 gap-4 rounded-md p-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1">Type</FormLabel>
                <Select
                  onValueChange={(val) => {
                    field.onChange(val);
                    if (val !== "Expense") {
                      form.setValue("category", undefined);
                    }
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {types.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1">Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={type !== "Expense"}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="capitalize"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="created_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1">Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Select a date..."
                    type="text"
                    disabled={isEditing}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1">Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    type="number"
                    step="0.01"
                    value={field.value as string}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1">Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Add a note or description…" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="mt-8 space-y-3">
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={form.formState.isSubmitting}
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default TransactionForm;
