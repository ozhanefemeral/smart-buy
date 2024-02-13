import { Card, CardContent } from "@/components/ui/card";
import { getHoueStats } from "@/lib/dynamodb";

export type HouseStats = {
  viewCount: number;
  favoriteCount: number;
};

type HouseStatsProps = {
  houseId: string;
};

export async function HouseStats({ houseId }: HouseStatsProps) {
  const house = (await getHoueStats(houseId)) as HouseStats;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex w-1/2 flex-col items-center">
            <h3 className="font-semibold">Views</h3>
            <p className="text-xl font-semibold">{house.viewCount}</p>
          </div>
          <div className="flex w-1/2 flex-col items-center">
            <h3 className="font-semibold">Favorites</h3>
            <p className="text-xl font-semibold">{house.favoriteCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
