import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { SignInButton } from "@/components/shared/SignInButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function LoginCTACard() {
  const session = await getServerSession(authOptions);

  const isLogged = !!session?.user;
  if (isLogged) return null;

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-4 lg:flex-row lg:justify-start lg:space-x-4 lg:space-y-0">
        <Image
          alt="house search"
          width={200}
          height={200}
          src="/select-house-animate.svg"
        />
        <div className="flex h-full flex-col items-start justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Login to see more</h3>
            <p className="pb-4 text-gray-500">
              See more details about this house and contact the owner.
            </p>
          </div>
          <SignInButton />
        </div>
      </div>
    </>
  );
}
