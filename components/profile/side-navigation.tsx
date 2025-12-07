"use client";

import { cn } from "@/lib/utils";
import { Camera, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="dark:bg-primary-foreground bg-secondary h-full rounded-md p-1 py-4 sm:p-2 sm:py-6">
      <ul className="space-y-2">
        <li>
          <Link
            href="/settings/profile"
            className={cn(
              "hover:bg-primary/8 flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-all duration-300 ease-in-out",
              pathname === "/settings/profile" ? "bg-primary/10" : "",
            )}
          >
            <UserRoundPen className="h-4 w-4 md:h-5 md:w-5" />
            <span className="hidden sm:block">Profile</span>
          </Link>
        </li>
        <li>
          <Link
            href="/settings/avatar"
            className={cn(
              "hover:bg-primary/8 flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-all duration-300 ease-in-out",
              pathname === "/settings/avatar" ? "bg-primary/10" : "",
            )}
          >
            <Camera className="h-4 w-4 md:h-5 md:w-5" />
            <span className="hidden sm:block">Avatar</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
