import { authOptions } from "@/lib/auth";
import { LoginCTACard } from "@/components/cta/login";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { PhoneButton } from "./PhoneButton";
import { User } from "@prisma/client";
import { getUserById } from "@/lib/queries/user";

type Props = {
  id: User["id"];
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

export const PostOwnerInfo: React.FC<Props> = async ({ id }) => {
  const session = await getServerSession(authOptions);
  const postOwner = await getUserById(id, session);

  if (!postOwner) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-x-4">
        <Image
          src={postOwner.image || "/avatar.png"}
          alt="Post Owner Avatar"
          width={80}
          height={60}
        />
        <div className="flex w-full flex-col overflow-hidden">
          <CardTitle>
            <div className="scroll-m-20 text-xl font-semibold">
              {postOwner.name}
            </div>
          </CardTitle>
          <CardDescription>
            Member since{" "}
            <span className="font-bold">
              {formatDate(postOwner.createdAt.toDateString())}
            </span>
            <br />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {!session?.user && <LoginCTACard />}
        {postOwner.phone && (
          <PhoneButton phone={postOwner.phone} isLogged={!!session?.user} />
        )}
      </CardContent>
    </Card>
  );
};
