import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

export const getPostById = async (id: Post["id"]) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }

  return post;
};
