import { logout } from "@/lib/actions";
import { CircleX } from "lucide-react";
import SubmitButton from "./submit-button";

function SignOut() {
  return (
    <form action={logout}>
      <SubmitButton variant="ghost" className="text-destructive! h-5! p-0!">
        <CircleX className="text-destructive" />
        Logout
      </SubmitButton>
    </form>
  );
}

export default SignOut;
