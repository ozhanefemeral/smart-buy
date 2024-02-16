import { User } from "@prisma/client";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";

export const getUserById = async (id: User["id"], session: Session | null) => {
  let postOwner: User = {
    id: id, // "1" is a placeholder for the actual user id
    name: "Özhan Efe Meral",
    phone: "5414636693",
    email: "me@ozhanefemeral.com",
    avatar: "/avatar.png",
    createdAt: new Date("2023-01-17"),
    updatedAt: new Date("2023-01-17"),
    lastOnline: new Date(),
  };

  if (!session) {
    postOwner = {
      ...postOwner,
      phone: "***-***-****",
      email: "****@****.com",
    };
  }

  return postOwner;
};

export const getUserIdByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user?.id;
};
