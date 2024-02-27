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
  const post = (await getPostStats(postId)) as PostStats;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex w-1/2 flex-col items-center">
            <h3 className="font-semibold">Views</h3>
            <p className="text-xl font-semibold">{post.viewCount}</p>
          </div>
          <div className="flex w-1/2 flex-col items-center">
            <h3 className="font-semibold">Favourites</h3>
            <p className="text-xl font-semibold" id="postFavouriteCount">
              {post.favouriteCount}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
