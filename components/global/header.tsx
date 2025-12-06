import { Button } from "@/components/ui/button";
import { DollarSign, PiggyBank, User } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

function Header() {
  return (
    <header className="border-muted-foreground/40 bg-background sticky top-0 z-50 flex items-center justify-between border-b border-dashed px-4 py-6">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative">
          <PiggyBank className="h-12 w-12" />
          <div className="absolute -top-1 -right-1">
            <div className="bg-primary text-secondary rounded-full p-1.5 shadow-lg">
              <DollarSign className="h-4 w-4" strokeWidth={3} />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold md:text-3xl">finances</h2>
      </Link>
      <nav>
        <ul className="flex items-center gap-1 md:gap-4">
          <li>
            <ModeToggle />
          </li>
          <li>
            <Button variant="ghost" size="icon">
              <User />
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
