"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const SignOutButton: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Button variant="destructive" onClick={handleSignOut}>
      Sign out
    </Button>
  );
};
