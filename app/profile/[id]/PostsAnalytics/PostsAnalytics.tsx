import { getPostStats } from "@/lib/aws";
import { Post } from "@prisma/client";
import { DataTable } from "./DataTable";
import { PostWithStats, columns } from "./columns";

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
      <p className="text-sm">
        Potential earnings:{" "}
        <span className="font-bold text-success">
          {tableData.reduce((acc, post) => acc + post.price, 0)}
        </span>
        zł
      </p>
    </div>
  );
}
