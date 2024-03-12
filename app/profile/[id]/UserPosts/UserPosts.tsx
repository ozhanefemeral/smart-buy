import { Post } from "@prisma/client";
import { PostSwiper } from "@/components/post/PostSwiper";

export async function UserPosts({ posts }: { posts: Post[] }) {
  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Latest from this user</h2>
      <div className="w-full">
        <PostSwiper posts={posts} />
      </div>
    </>
  );
}
