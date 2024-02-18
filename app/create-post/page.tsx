import { SignInButton } from "@/components/shared/SignInButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import loginSvg from "@/public/login.svg";
import webShoppingSvg from "@/public/web-shopping.svg";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createPostAction } from "./actions";

export default async function CreatePost() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="flex flex-col justify-center">
        <Image src={loginSvg} alt="Login" width={250} />
        <p className="text-center text-gray-500">
          You need to be logged in to create a post
        </p>
        <SignInButton />
      </div>
    );
  }

  return (
    <div>
      <form action={createPostAction}>
        <input type="hidden" name="email" value={session?.user?.email} />
        <h1 className="mb-4 text-3xl font-bold">Publish an announcement</h1>
        <Card>
          <CardHeader>
            <CardTitle>Provide a catchy title for your advertisement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4 lg:grid-cols-3">
              <div className="col-span-2 flex flex-col space-y-2">
                <Label htmlFor="name">Title</Label>
                <Input
                  id="name"
                  placeholder="e.g. iPhone 15 Pro 256GB"
                  name="title"
                />
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="e.g. Brand new, never used, still in the box with all accessories"
                  name="description"
                />
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="e.g. 1500"
                  name="price"
                  type="number"
                />
              </div>
              <div className="hidden justify-center lg:flex">
                <Image src={webShoppingSvg} alt="Web shopping" width={250} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" variant="default">
              Publish
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
