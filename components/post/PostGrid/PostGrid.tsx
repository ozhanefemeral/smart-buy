"use client";
import { PostCard } from "@/components/post/PostCard/";
import { Post } from "@prisma/client";

interface PostGridProps {
  posts: Post[];
  cardWidth?: number;
}

export const PostGrid = ({ posts, cardWidth = 300 }: PostGridProps) => {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
};
