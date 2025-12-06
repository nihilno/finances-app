"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTransaction } from "@/lib/actions";
import { CircleX, Ellipsis, Loader2Icon, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

function ActionsDropdown({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    try {
      await deleteTransaction(id);
      toast.success("Transaction deleted successfully.");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : String(error) || "Something went wrong.";
      console.error(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon-sm" variant="ghost">
            <Ellipsis className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-30">
          <DropdownMenuItem>
            <Link
              href={`/transaction/${id}/edit`}
              className="flex items-center gap-2"
            >
              <Pencil className="h-5 w-5" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <CircleX className="text-destructive h-5 w-5" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {`The transaction will be permanently deleted. This
              action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-2 sm:mt-0">
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 w-24 text-white"
              disabled={isLoading}
              onClick={handleDelete}
            >
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ActionsDropdown;
