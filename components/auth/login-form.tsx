"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";
import { useActionState } from "react";
import SubmitButton from "./submit-button";

const initialState = {
  message: "",
  error: false,
};

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form
      className="dark:bg-primary-foreground bg-secondary relative mt-16 flex w-full max-w-100 flex-col gap-6 rounded-md px-4 py-12 shadow-md"
      action={formAction}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <LogIn className="mb-4 h-12 w-12" />
          <h1 className="text-2xl font-bold">Acces your account</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Enter your email and we&apos;ll send you a magic link to sign in
            instantly — no password needed.
          </p>
        </div>
        <Field className="mt-4">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="mp@example.com"
            required
          />

          <FieldDescription>
            We&apos;ll email you a secure link. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>

        <Field className="mt-2">
          <SubmitButton>Send Magic Link</SubmitButton>
        </Field>
      </FieldGroup>
      <div
        className={cn(
          "text-muted-foreground dark:bg-primary-foreground bg-secondary absolute bottom-0 left-0 -mt-2 hidden w-full translate-y-20 rounded-md p-2 text-center text-sm",
          state?.error ? "text-destructive block" : "text-muted-foreground",
          state?.message ? "block" : "hidden",
        )}
      >
        <p>{state?.message || "Unknown error. Try again later."}</p>
      </div>
    </form>
  );
}
