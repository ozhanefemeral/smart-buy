import { authOptions } from "@/lib/auth";
import { SignInButton } from "@/components/shared/SignInButton";
import loginSvg from "@/public/login.svg";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { CreatePostForm } from "./Form";

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
      <h1 className="mb-4 text-3xl font-bold">Publish an advertisement</h1>
      <CreatePostForm />
    </div>
  );
}
