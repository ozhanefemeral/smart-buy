import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LoginCTACard } from "@/components/cta/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getHouseOwnerById } from "@/lib/queries/house-owner";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { PhoneButton } from "./PhoneButton";

type Props = {
  id: number;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

export const HouseOwnerInfo: React.FC<Props> = async ({ id }) => {
  const session = await getServerSession(authOptions);
  const houseOwner = await getHouseOwnerById(1, session);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-x-4">
        <Image
          src={houseOwner.avatar}
          alt="House Owner Avatar"
          width={80}
          height={60}
        />
        <div className="flex w-full flex-col overflow-hidden">
          <CardTitle>
            <div className="scroll-m-20 text-xl font-semibold">
              {houseOwner.name}
            </div>
          </CardTitle>
          <CardDescription>
            Member since{" "}
            <span className="font-bold">
              {formatDate(houseOwner.memberSince)}
            </span>
            <br />
            Last online {formatDate(houseOwner.lastOnline)}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {!session?.user && <LoginCTACard />}
        <PhoneButton phone={houseOwner.phone} isLogged={!!session?.user} />
      </CardContent>
    </Card>
  );
};
