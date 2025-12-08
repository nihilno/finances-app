import SubmitButton from "@/components/auth/submit-button";
import RemoveAvatarButton from "@/components/profile/remove-avatar-button";
import { Input } from "@/components/ui/input";
import { uploadAvatar } from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";
import { safeCreateSignedUrl } from "@/lib/supabase/storage";
import { Camera } from "lucide-react";
import Image from "next/image";

export default async function AvatarPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const avatarPath = user?.user_metadata?.avatar;

  // If there's no avatar path, render the "No Avatar" UI and skip any storage calls
  if (!avatarPath) {
    return (
      <section className="grid grid-cols-[2fr_1fr] gap-8">
        <div className="col-span-2 max-w-sm space-y-4 lg:col-span-1">
          <h1 className="flex items-center gap-2 text-lg font-semibold">
            <Camera />
            <span>Customize your Avatar</span>
          </h1>

          <p className="text-muted-foreground text-sm">
            Choose a PNG or JPG file to update your avatar.
          </p>

          <div className="text-muted-foreground space-y-1 text-xs">
            <p>Recommended size: 200×200px</p>
            <p>Max file size: 512KB</p>
            <p>Supported formats: PNG, JPG</p>
          </div>

          <form action={uploadAvatar} className="pt-2">
            <Input
              type="file"
              name="file"
              className="block max-w-100"
              required
            />
            <SubmitButton size="sm" className="mt-8 min-w-30">
              Upload Avatar
            </SubmitButton>
          </form>
        </div>

        <div className="mt-8 hidden place-self-center lg:block">
          <p className="text-muted-foreground mb-4 text-center text-sm">
            Current Avatar
          </p>
          <div className="bg-muted relative flex aspect-square h-40 w-40 items-center justify-center overflow-hidden rounded-md xl:h-50 xl:w-50">
            <div className="bg-muted-foreground/20 text-muted-foreground flex h-24 w-24 items-center justify-center rounded-full text-sm xl:h-32 xl:w-32 xl:text-base">
              No Avatar
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Only call storage when avatarPath exists
  const { data: userAvatar, error } = await safeCreateSignedUrl(
    supabase.storage,
    "avatars",
    avatarPath,
    60 * 5,
  );

  if (error || !userAvatar?.signedUrl) {
    console.error("Avatar signed url error:", error);
    throw new Error("Unable to get User Avatar");
  }

  return (
    <section className="grid grid-cols-[2fr_1fr] gap-8">
      <div className="col-span-2 max-w-sm space-y-4 lg:col-span-1">
        <h1 className="flex items-center gap-2 text-lg font-semibold">
          <Camera />
          <span>Customize your Avatar</span>
        </h1>

        <p className="text-muted-foreground text-sm">
          Choose a PNG or JPG file to update your avatar.
        </p>

        <div className="text-muted-foreground space-y-1 text-xs">
          <p>Recommended size: 200×200px</p>
          <p>Max file size: 512KB</p>
          <p>Supported formats: PNG, JPG</p>
        </div>

        <form action={uploadAvatar} className="pt-2">
          <Input type="file" name="file" className="block max-w-100" />

          <div className="layout absolute bottom-6 mt-8 flex items-center gap-2 md:gap-4">
            <SubmitButton size="sm" className="min-w-30">
              Upload Avatar
            </SubmitButton>
            <RemoveAvatarButton />
          </div>
        </form>
      </div>

      <div className="mt-8 hidden place-self-center lg:block">
        <p className="text-muted-foreground mb-4 text-center text-sm">
          Current Avatar
        </p>
        <div className="bg-muted relative flex aspect-square h-40 w-40 items-center justify-center overflow-hidden rounded-md xl:h-50 xl:w-50">
          <Image
            src={userAvatar.signedUrl}
            alt="Avatar"
            className="object-cover"
            fill
            quality={50}
            sizes="(max-width: 768px) 100px, 200px"
          />
        </div>
      </div>
    </section>
  );
}
