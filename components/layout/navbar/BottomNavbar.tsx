"use client";

import { User } from "@prisma/client";
import { HomeIcon, PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSignInModal } from "../sign-in-modal";

interface BottomNavbarProps {
  user?: User | null;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({ user }) => {
  const path = usePathname();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  const isActive = (pathname: string) => {
    return path === pathname;
  };

  const isProfile = () => path.startsWith("/profile");

  return (
    <nav className="shadow-top fixed inset-x-0 bottom-0 left-0 right-0 z-30 flex h-14 items-center justify-between border-t bg-white dark:bg-gray-950">
      <Link
        className={`flex flex-1 flex-col items-center justify-center text-sm ${
          isActive("/") ? "text-blue-500" : "text-primary"
        }`}
        href="/"
      >
        <HomeIcon width={24} height={24} />
        <span>Home</span>
      </Link>
      <Link
        className={`flex flex-1 flex-col items-center justify-center text-sm ${
          isActive("/create-post") ? "text-blue-500" : "text-primary"
        }`}
        href="/create-post"
      >
        <PlusIcon width={24} height={24} />
        <span>Post ad</span>
      </Link>
      {user ? (
        <Link
          className={`${
            isProfile() ? "text-blue-500" : "text-primary"
          } flex flex-1 flex-col items-center justify-center text-sm`}
          href={`/profile/${user.id}`}
        >
          <PersonIcon width={24} height={24} />
          <span>Account</span>
        </Link>
      ) : (
        <div
          className={`${
            isActive("/profile") ? "text-blue-500" : "text-primary"
          } flex flex-1 flex-col items-center justify-center text-sm`}
          onClick={() => setShowSignInModal(true)}
        >
          <SignInModal />
          <PersonIcon width={24} height={24} />
          <span>Account</span>
        </div>
      )}
    </nav>
  );
};
