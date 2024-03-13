import { PostOwnerInfo } from "@/components/post-owner";
import { User } from "@prisma/client";
import { Suspense } from "react";
import { Notifications } from "./Notifications";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserWithPosts } from "@/lib/queries/user";
import { redirect } from "next/navigation";
import { UserPosts } from "./UserPosts/UserPosts";
import { PostsAnalytics } from "./PostsAnalytics/PostsAnalytics";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: { id: User["id"] };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;

  const user = await getUserWithPosts(id);
  if (!user) {
    return {
      title: "404 - Not Found",
    };
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const userPostImages = user.owns.map((post) => post.images).flat();

  // https://ui-avatars.com/api/?name=John+Doe is a service that generates avatars
  // above url will generate a generic image with letters "JD"
  // use user.name to generate a generic image for users who don't have an image
  // must split the first and last name
  // there might be names with more than 2 words, so we only take the letters from first and last name
  const nameQuery = user.name?.split(" ").slice(0, 2).join("+") || "";

  const mainImage = user.image
    ? user.image
    : `https://ui-avatars.com/api/?name=${nameQuery}`;

  return {
    title: user.name,
    openGraph: {
      images: [mainImage, ...userPostImages, ...previousImages],
    },
  };
}

export default async function ProfilePage({ params }: Props) {
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
          {!isSelf && <UserPosts posts={user.owns} />}
          {isSelf && <PostsAnalytics posts={user.owns} />}
        </div>
      </div>
    </Suspense>
  );
}
