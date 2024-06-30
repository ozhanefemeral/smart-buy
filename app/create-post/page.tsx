import { authOptions } from "@/lib/auth";
import { SignInButton } from "@/components/shared/SignInButton";
import loginSvg from "@/public/login.svg";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { CreatePostForm } from "./Form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CreatePost() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="flex flex-col justify-center gap-y-4">
        <Image src={loginSvg} alt="Login" width={250} />
        <p className="text-center text-gray-500">
          You need to be logged in to create a post
        </p>
        <div className="flex justify-center">
          <SignInButton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">
        <code>Create Post</code> feature is not enabled production 😔
      </h1>
      <p>I had to disable this feature due to the misuse and spam.</p>

      <Link
        href="https://github.com/ozhanefemeral/smart-buy/tree/main/app/create-post"
        className="font-bold hover:underline"
      >
        But you can always view the source code here!
      </Link>

      <div className="pointer-events-none mt-4 cursor-not-allowed opacity-50">
        <CreatePostForm />
      </div>
    </div>
  );
}
