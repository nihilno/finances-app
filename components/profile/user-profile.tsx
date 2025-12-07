import SignOut from "@/components/auth/sign-out";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { UserPlus, UserRoundPen } from "lucide-react";
import Link from "next/link";
import UserAvatar from "./user-avatar";

function UserProfile({ user }: { user: User | null }) {
  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35 px-2">
        <DropdownMenuLabel>
          {user.user_metadata.fullName
            ? `Hi, ${user.user_metadata.fullName}`
            : "My account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="settings/profile" className="flex items-center gap-2">
            <UserRoundPen className="text-foreground" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href="/login">
      <Button variant="ghost">
        <UserPlus />
      </Button>
    </Link>
  );
}

export default UserProfile;
