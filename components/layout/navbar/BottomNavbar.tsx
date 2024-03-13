"use client";

import { User } from "@prisma/client";
import { HomeIcon, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const BottomNavbar = ({ user }: { user?: User | null }) => {
  const router = useRouter();

  return (
    <nav className="shadow-top fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-between border-t bg-white dark:bg-gray-950">
      <Link
        className="flex flex-1 flex-col items-center justify-center text-sm"
        href="#"
      >
        <HomeIcon className="h-6 w-6" />
        <span>Home</span>
      </Link>
      <div className="flex flex-1 flex-col items-center justify-center text-sm">
        <PlusIcon className="h-6 w-6" />
        Post ad
      </div>
      <Link
        className="flex flex-1 flex-col items-center justify-center text-sm"
        href="#"
      >
        <UserIcon className="h-6 w-6" />
        <span>Account</span>
      </Link>
    </nav>
  );
};
