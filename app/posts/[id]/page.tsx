import { PostStats } from "@/components/post";
import { PostOwnerInfo } from "@/components/post-owner/PostOwnerInfo/PostOwnerInfo";
import { incrementViewCount } from "@/lib/aws";
import { getPostById } from "@/lib/queries/post";
import { Post } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { PostInfo } from "./PostInfo";
import SharePostCard from "./SharePost";

type Props = {
  params: { id: Post["id"] };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;

  const product = await getPostById(id);
  if (!product) {
    return {
      title: "404 - Not Found",
    };
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [...product.images, ...previousImages],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = params;
  const post = await getPostById(id);

  if (!post || !post.isPublished) {
    redirect("/404");
  }

  await incrementViewCount(id);

  return (
    <Suspense>
      <div className="flex flex-col gap-y-4 sm:grid sm:grid-cols-3 md:gap-x-4 md:gap-y-0">
        <PostInfo post={post} />
        <div className="flex h-fit flex-col gap-y-4 md:col-span-1">
          <PostOwnerInfo id={post.ownerId} />
          <SharePostCard />
          <PostStats postId={id} />
        </div>
      </div>
    </Suspense>
  );
}
