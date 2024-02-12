"use client";

import { useSignInModal } from "@/components/layout/sign-in-modal";
import { Button } from "@/components/ui/button";

export const SignInButton: React.FC = () => {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <Button onClick={() => setShowSignInModal(true)}>Sign In</Button>
    </>
  );
};
