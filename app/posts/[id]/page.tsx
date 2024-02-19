import Image from "next/image";
import React, { Suspense } from "react";
import placeholder from "@/public/placeholder.svg";
import { incrementViewCount } from "@/lib/dynamodb";
import { PostStats } from "@/components/post";
import { getPostById } from "@/lib/queries/post";
import { Post } from "@prisma/client";
import { PostOwnerInfo } from "@/components/post-owner/PostOwnerInfo/PostOwnerInfo";
import SharePostCard from "./SharePost";
import { PostImages } from "./PostImages";

type Params = {
  id: Post["id"];
};

export default async function PostPage({ params }: { params: Params }) {
  const { id } = params;
  const post = await getPostById(id);
  await incrementViewCount(id);

  return (
    <Suspense>
      <div className="flex flex-col items-stretch space-y-4 lg:flex-row lg:items-start lg:space-x-4 lg:space-y-0">
        <div className="flex flex-col space-y-4 xl:w-2/3">
          <div className="rounded-lg border p-4">
            <PostImages post={post} />
            <div className="flex flex-col space-y-2 pt-4">
              <h1 className="text-2xl font-semibold">{post.title}</h1>
              <p className="max-h-96 overflow-y-auto whitespace-pre-wrap">
                {post.description}
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
