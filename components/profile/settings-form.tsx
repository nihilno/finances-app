"use client";

import SubmitButton from "@/components/auth/submit-button";
import DateRangeSelect from "@/components/global/date-range-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSettings } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { useActionState } from "react";

function SettingsForm({ user }: { user: User | null }) {
  const [state, formAction] = useActionState(updateSettings, {
    success: true,
    errors: {},
  });

  return (
    <form className="pt-2" action={formAction}>
      <div className="space-y-4">
        <div>
          <Label
            className={cn(
              "mb-1 block text-xs",
              state.errors?.name ? "text-destructive" : "text-muted-foreground",
            )}
            htmlFor="name"
          >
            Name
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            defaultValue={user?.user_metadata?.fullName}
            className={cn(state.errors?.name ? "border-destructive" : "")}
          />
          {state.errors?.name && (
            <p className="text-destructive mt-1 text-xs">{state.errors.name}</p>
          )}
        </div>
        <div>
          <Label
            className={cn(
              "mb-1 block text-xs",
              state.errors?.name ? "text-destructive" : "text-muted-foreground",
            )}
            htmlFor="defaultView"
          >
            Select Option
          </Label>
          <DateRangeSelect
            name="defaultView"
            id="defaultView"
            defaultValue={user?.user_metadata.defaultView}
            className={cn(
              "w-full",
              state.errors?.name ? "border-destructive" : "",
            )}
          />
          {state.errors?.defaultView && (
            <p className="text-destructive mt-1 text-xs">
              {state.errors.defaultView}
            </p>
          )}
        </div>
      </div>
      {state.message && (
        <p className="text-destructive mt-2 text-sm">{state.message}</p>
      )}

      <div className="absolute bottom-6">
        <SubmitButton size="sm" className="mt-8 min-w-30">
          Save Changes
        </SubmitButton>
      </div>
    </form>
  );
}

export default SettingsForm;
