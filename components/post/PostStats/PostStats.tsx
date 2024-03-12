import CountingNumbers from "@/components/shared/counting-numbers";
import { Card, CardContent } from "@/components/ui/card";
import { getPostStats } from "@/lib/aws";

export type PostStats = {
  viewCount: number;
  favouriteCount: number;
};

type PostStatsProps = {
  postId: string;
};

export async function PostStats({ postId }: PostStatsProps) {
  const post = await getPostStats(postId);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex w-1/2 flex-col items-center">
            <h3 className="font-semibold">Views</h3>
            <CountingNumbers
              value={post.viewCount}
              className="text-xl font-semibold"
            />
          </div>
          <div className="flex w-1/2 flex-col items-center">
            <h3 className="font-semibold">Favourites</h3>
            <CountingNumbers
              value={post.favouriteCount}
              className="post-favourite-count text-xl font-semibold"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
