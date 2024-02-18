import Image from "next/image";
import React, { Suspense } from "react";
import placeholder from "@/public/placeholder.svg";
import { incrementViewCount } from "@/lib/dynamodb";
import { PostStats } from "@/components/post";
import { getPostById } from "@/lib/queries/post";
import { Post } from "@prisma/client";
import { PostOwnerInfo } from "@/components/post-owner/PostOwnerInfo/PostOwnerInfo";
import SharePostCard from "./SharePost";

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
          <div className=" rounded-lg border p-4">
            <div className="flex max-h-[500px] flex-col border-b pb-4 lg:flex-row lg:space-x-4">
              <div className="overflow-hidden rounded-lg lg:w-4/5">
                <Image
                  src={post.images[0] || placeholder}
                  alt={post.title}
                  // below is the fix for having a 100% width image
                  // discussed on: https://github.com/vercel/next.js/discussions/18474#discussioncomment-5501724
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
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
