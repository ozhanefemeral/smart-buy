"use server";

import { addPostToUserFavourites } from "@/lib/queries/post";
import { getUserFavouritesByEmail } from "@/lib/queries/user";

export async function addPostToFavourites(postId: string, userEmail: string) {
  return addPostToUserFavourites(postId, userEmail);
}

export async function getUserFavourites(email: string) {
  return getUserFavouritesByEmail(email);
}
