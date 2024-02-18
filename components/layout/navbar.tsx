"use client";

import { CreatePostButton } from "@/components/cta/create-post/";
import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

export default function NavBar({ session }: { session: Session | null }) {
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
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Precedent</p>
          </Link>
          <div className="flex items-center justify-end space-x-4">
            <CreatePostButton />
            {session && <UserDropdown session={session} />}
          </div>
        </div>
      </div>
    </>
  );
}
