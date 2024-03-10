import { Post, User } from "@prisma/client";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";

export interface UserWithPosts extends User {
  owns: Post[];
}

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

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const getUserIdByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user?.id;
};

export const getUserFavouritesByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      favourites: true,
    },
  });

  if (!user) {
    return [];
  }

  return user.favourites;
};

export const updateUserPhone = async (email: User["email"], phone: string) => {
  if (!email) return;

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      phone,
    },
  });

  return user;
};

export const verifyPhone = async (email: User["email"], otp: string) => {
  if (!email) return;

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      phoneVerified: new Date(),
    },
  });

  return user;
};

export const getUserWithPosts = async (
  id: User["id"],
  session: Session | null,
) => {
  const user: UserWithPosts | null = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      owns: true,
    },
  });

  if (!user) {
    return null;
  }

  if (!session) {
    user.phone = "***-***-****";
    user.email = "****@****.com";
  }

  return user;
};
