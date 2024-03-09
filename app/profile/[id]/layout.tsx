import { authOptions } from "@/lib/auth";
import { getUserById } from "@/lib/queries/user";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { UserNotifications } from "./Notifications";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: User["id"] };
}) {
  const { id } = params;

  const session = await getServerSession(authOptions);
  const user = await getUserById(id, session);
  const isSelf = session?.user?.email === user?.email;

  if (!user) {
    redirect("/404");
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="col-span-2">{children}</div>
      {isSelf && <UserNotifications user={user} />}
    </div>
  );
}
