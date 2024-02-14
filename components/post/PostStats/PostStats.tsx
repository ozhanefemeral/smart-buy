import { Card, CardContent } from "@/components/ui/card";
import { getHoueStats } from "@/lib/dynamodb";

export type PostStats = {
  viewCount: number;
  favoriteCount: number;
};

type PostStatsProps = {
  postId: string;
};

export async function PostStats({ postId }: PostStatsProps) {
  const post = (await getHoueStats(postId)) as PostStats;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex w-1/2 flex-col items-center">
            <h3 className="font-semibold">Views</h3>
            <p className="text-xl font-semibold">{post.viewCount}</p>
          </div>
          <div className="flex w-1/2 flex-col items-center">
            <h3 className="font-semibold">Favorites</h3>
            <p className="text-xl font-semibold">{post.favoriteCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
