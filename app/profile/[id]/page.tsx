import { PostOwnerInfo } from "@/components/post-owner";
import { User } from "@prisma/client";
import { Suspense } from "react";
import { Notifications } from "./Notifications";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserWithPosts } from "@/lib/queries/user";
import { redirect } from "next/navigation";
import { UserPosts } from "./UserPosts/UserPosts";

export default async function ProfilePage({
  params,
}: {
  params: { id: User["id"] };
}) {
  const { id } = params;

  const session = await getServerSession(authOptions);
  const user = await getUserWithPosts(id, session);
  const isSelf = session?.user?.email === user?.email;

  if (!user) {
    redirect("/404");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid h-fit grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4">
        <div className="col-span-1">
          {isSelf && <Notifications user={user} />}
          {!isSelf && <PostOwnerInfo id={id} />}
        </div>
        <div className="col-span-2">
          <UserPosts posts={user.owns} />
        </div>
      </div>
    </Suspense>
  );
}
