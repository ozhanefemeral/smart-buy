import { getMostRecentPosts } from "@/lib/queries/post";
import { Post } from "@prisma/client";
import { PostSwiper } from "../PostSwiper";

export async function MostRecentPosts() {
  const recentPosts: Post[] = await getMostRecentPosts();

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Newest Posts</h2>
      <div className="w-full">
        <PostSwiper posts={recentPosts} />
      </div>
    </>
  );
}
