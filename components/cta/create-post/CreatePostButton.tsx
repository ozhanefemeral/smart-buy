"use client";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const CreatePostButton: React.FC = () => {
  const session = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  if (!session.data) {
    return (
      <>
        <SignInModal />
        <Button onClick={() => setShowSignInModal(true)}>Create post</Button>
      </>
    );
  }

  return (
    <Button asChild>
      <Link href="/create-post">Create post</Link>
    </Button>
  );
};
