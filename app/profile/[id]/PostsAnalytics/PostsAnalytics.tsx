import { PostStats } from "@/components/post";
import { getPostStats } from "@/lib/aws";
import { Post } from "@prisma/client";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

interface PostsTableProps {
  posts: Post[];
}

export async function PostsAnalytics({ posts }: PostsTableProps) {
  const postStats = await Promise.all(
    posts.map((post) => getPostStats(post.id)),
  );

  const tableData = postStats.map((stats, index) => ({
    ...posts[index],
    ...stats,
  }));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Your Posts</h1>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
