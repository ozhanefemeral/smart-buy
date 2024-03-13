import { PostStats } from "@/components/post";
import { PostOwnerInfo } from "@/components/post-owner/PostOwnerInfo/PostOwnerInfo";
import { incrementViewCount } from "@/lib/aws";
import { getPostById } from "@/lib/queries/post";
import { Post } from "@prisma/client";
import { Suspense } from "react";
import { PostImages } from "./PostImages";
import SharePostCard from "./SharePost";
import { FavoritePostButton } from "components/post/FavoritePostButton";
import { redirect } from "next/navigation";
import { formatPostDate } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";

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
      <div className="flex flex-col items-stretch space-y-4 lg:flex-row lg:items-start lg:space-x-4 lg:space-y-0">
        <div className="flex flex-col space-y-4 xl:w-2/3">
          <div className="rounded-lg border p-4">
            <PostImages post={post} />
            <div className="relative flex flex-col space-y-2 pt-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{post.title}</h1>
                <FavoritePostButton postId={id} />
              </div>
              <p className="max-h-96 overflow-y-auto whitespace-pre-wrap">
                {post.description}
              </p>
              <div className="flex justify-between">
                <p className="text-lg font-bold">{post.price} zł</p>

                <p className="text-right text-sm">
                  Added {formatPostDate(post.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-fit flex-col space-y-4 xl:w-1/3">
          <PostOwnerInfo id={post.ownerId} />
          <SharePostCard />
          <PostStats postId={id} />
        </div>
      </div>
    </Suspense>
  );
}
