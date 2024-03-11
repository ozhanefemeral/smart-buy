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

type Params = {
  id: Post["id"];
};

export default async function PostPage({ params }: { params: Params }) {
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
              <p className="text-right text-sm">
                Added {formatPostDate(post.createdAt)}
              </p>
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
