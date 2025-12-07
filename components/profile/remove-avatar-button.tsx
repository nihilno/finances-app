"use client";

import { Button } from "@/components/ui/button";
import { deleteAvatar } from "@/lib/actions";

function RemoveAvatarButton() {
  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      onClick={deleteAvatar}
    >
      Remove Avatar
    </Button>
  );
}

export default RemoveAvatarButton;
