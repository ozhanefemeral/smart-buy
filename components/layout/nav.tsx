import { authOptions } from "@/lib/auth";
import { getUserByEmail } from "@/lib/queries/user";
import { getServerSession } from "next-auth/next";
import Navbar from "./navbar";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  if (session && session.user?.email) {
    const user = await getUserByEmail(session.user?.email);
    return <Navbar user={user} />;
  }

  return <Navbar />;
}
