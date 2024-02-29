import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { redirect } from "next/navigation";
import { getUserIdByEmail } from "./user";
import {
  addPost,
  decrementFavouriteCount,
  incrementFavouriteCount,
} from "../aws";

export type PostCreateInput = {
  title: string;
  description: string;
  price: number;
  email: string;
  images?: string[];
  thumbnailIndex?: number;
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

  // declare const thumbnail
  // if input.images is not undefined and input.thumbnailIndex is not undefined set thumbnail to input.images[input.thumbnailIndex]

  const thumbnail =
    input.images && input.thumbnailIndex
      ? input.images[input.thumbnailIndex]
      : undefined;

  const post = await prisma.post.create({
    data: {
      title: input.title,
      description: input.description,
      price: input.price,
      ownerId,
      images: input.images,
      thumbnail,
    },
  });

  addPost(post.id);
  return post;
};

export const addPostToUserFavourites = async (
  postId: Post["id"],
  email: string,
) => {
  const userId = await getUserIdByEmail(email);

  if (!userId) {
    throw new Error("User not found");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      favourites: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isFavorite = user.favourites.some((fav) => fav.id === postId);

  if (isFavorite) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        favourites: {
          disconnect: {
            id: postId,
          },
        },
      },
    });
    decrementFavouriteCount(postId);
    return false;
  }

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      favourites: {
        connect: {
          id: postId,
        },
      },
    },
  });

  incrementFavouriteCount(postId);
  return true;
};

export const getMostRecentPosts = async () => {
  return prisma.post.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
};
