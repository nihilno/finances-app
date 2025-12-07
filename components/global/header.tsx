import { createClient } from "@/lib/supabase/server";
import { DollarSign, PiggyBank } from "lucide-react";
import Link from "next/link";
import UserProfile from "../profile/user-profile";
import { ModeToggle } from "./mode-toggle";

async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-muted-foreground/40 bg-background sticky top-0 z-50 flex items-center justify-between border-b border-dashed py-6">
      <Link href="/" className="flex items-center gap-1 sm:gap-3">
        <div className="relative">
          <PiggyBank className="h-8 w-8 sm:h-10 sm:w-10" />
          <div className="absolute -top-1 -right-1">
            <div className="bg-primary text-secondary rounded-full p-1.5 shadow-lg">
              <DollarSign className="h-2 w-2 sm:h-4 sm:w-4" strokeWidth={3} />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">finances</h2>
      </Link>
      <nav>
        <ul className="flex items-center gap-1 md:gap-2">
          <li>
            <ModeToggle />
          </li>
          <li>
            <UserProfile user={user} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
