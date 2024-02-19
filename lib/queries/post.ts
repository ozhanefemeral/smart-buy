import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { redirect } from "next/navigation";
import { getUserIdByEmail } from "./user";

export type PostCreateInput = {
  title: string;
  description: string;
  price: number;
  email: string;
  images: string[];
};

export const getPostById = async (id: Post["id"]) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    redirect("/404");
  }

  return post;
};

export const createPost = async (input: PostCreateInput) => {
  const ownerId = await getUserIdByEmail(input.email);

  if (!ownerId) {
    throw new Error("User not found");
  }

  const post = await prisma.post.create({
    data: {
      title: input.title,
      description: input.description,
      price: input.price,
      ownerId,
      images: input.images,
    },
  });

  return post;
};
