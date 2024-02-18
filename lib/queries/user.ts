import { User } from "@prisma/client";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";

export const getUserById = async (id: User["id"], session: Session | null) => {
  let postOwner = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!postOwner) {
    return null;
  }

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
