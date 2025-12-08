import { createClient } from "@/lib/supabase/server";
import { safeCreateSignedUrl } from "@/lib/supabase/storage";
import { User2 } from "lucide-react";
import Image from "next/image";

async function UserAvatar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const avatarPath = user?.user_metadata?.avatar;
  if (!avatarPath) return <User2 />;

  const { data, error } = await safeCreateSignedUrl(
    supabase.storage,
    "avatars",
    avatarPath,
    60 * 5,
  );

  if (error || !data?.signedUrl) {
    console.error("UserAvatar signed url error:", error);
    return <User2 />;
  }

  return (
    <Image
      src={data.signedUrl}
      alt="Avatar"
      width={32}
      height={32}
      className="aspect-square rounded-full"
    />
  );
}

export default UserAvatar;
