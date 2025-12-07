import SettingsForm from "@/components/profile/settings-form";
import { createClient } from "@/lib/supabase/server";
import { Filter, Mail, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="grid grid-cols-[2fr_1fr] gap-8">
      <div className="col-span-2 max-w-sm space-y-4 lg:col-span-1">
        <h1 className="flex items-center gap-2 text-lg font-semibold">
          <User />
          <span>Update Profile</span>
        </h1>

        <p className="text-muted-foreground text-sm">
          Update your display name and choose a preferred option below.
        </p>

        <div className="text-muted-foreground space-y-1 text-xs">
          <p>Keep your name clear and recognizable</p>
        </div>
        <SettingsForm user={user} />
      </div>

      <div className="dark:bg-secondary hidden h-full w-full space-y-5 place-self-end rounded-md bg-white px-6 py-4 text-xs lg:block xl:text-sm">
        <h2 className="mb-12 text-center text-lg font-bold">
          Profile Overview
        </h2>
        <div className="flex items-center justify-between gap-2 border-b pb-1">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <h3 className="font-semibold">Name</h3>
          </div>
          <span className="text-muted-foreground capitalize">
            {user?.user_metadata.fullName || "Unknown"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 border-b pb-1">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <h3 className="font-semibold">Email</h3>
          </div>
          <span className="text-muted-foreground">
            {user?.user_metadata.email || "Unknown"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 border-b pb-1">
          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <h3 className="font-semibold">Default Filtering</h3>
          </div>
          <span className="text-muted-foreground capitalize">
            {user?.user_metadata.defaultView || "Not set"}
          </span>
        </div>
      </div>
    </section>
  );
}
