import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { redirect } from "next/navigation";

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
