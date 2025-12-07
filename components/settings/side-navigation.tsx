"use client";

import { cn } from "@/lib/utils";
import { Camera, Settings, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-2">
        <li>
          <Link
            href="/settings"
            className={cn(
              "hover:bg-primary/8 flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-all duration-300 ease-in-out",
              pathname === "/settings" ? "bg-primary/10" : "",
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
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
            <Camera className="h-4 w-4" />
            <span>Avatar</span>
          </Link>
        </li>
        <li>
          <Link
            href="/settings/profile"
            className={cn(
              "hover:bg-primary/8 flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-all duration-300 ease-in-out",
              pathname === "/settings/profile" ? "bg-primary/10" : "",
            )}
          >
            <UserRoundPen className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
