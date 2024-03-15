"use client";

import useMediaQuery from "@/lib/hooks/use-media-query";
import { User } from "@prisma/client";
import { useSignInModal } from "components/layout/sign-in-modal";
import { BottomNavbar } from "./BottomNavbar";
import { TopNavbar } from "./TopNavbar";

interface NavbarProps {
  user?: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const { SignInModal } = useSignInModal();
  const { isMobile } = useMediaQuery();

  return (
    <>
      <SignInModal />
      {isMobile ? <BottomNavbar user={user} /> : <TopNavbar user={user} />}
    </>
  );
};
