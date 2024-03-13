"use client";

import { CreatePostButton } from "@/components/cta/create-post/";
import useScroll from "@/lib/hooks/use-scroll";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

export default function NavBar({ user }: { user?: User | null }) {
  const { SignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`top-0 flex w-full justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image src="/logo.svg" width={40} height={40} alt="Smartbuy" />
            <p>Smartbuy</p>
          </Link>
          <div className="flex items-center justify-end space-x-4">
            <CreatePostButton />
            {user && <UserDropdown user={user} />}
          </div>
        </div>
      </div>
    </>
  );
}
