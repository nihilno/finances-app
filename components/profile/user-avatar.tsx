import { createClient } from "@/lib/supabase/server";
import { User2 } from "lucide-react";
import Image from "next/image";

async function UserAvatar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase.storage
    .from("avatars")
    .createSignedUrl(user?.user_metadata.avatar, 60 * 5);

  if (!data) return <User2 />;
  if (error) throw new Error("Unable to get User Avatar");

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
