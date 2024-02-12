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
    <div className="rounded-lg bg-sky-100 p-4">
      <div className="flex flex-row items-start space-x-4">
        <Image
          alt="house search"
          width={100}
          height={200}
          src="/select-house-animate.svg"
        />
        <div>
          <div className="font-semibold">Signin to see more</div>
          <p className="text-gray-500">
            See more details about this house and contact the owner.
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <SignInButton />
      </div>
    </div>
  );
}
