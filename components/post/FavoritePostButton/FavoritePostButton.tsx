"use client";
import {
  addPostToFavourites,
  getUserFavourites,
} from "@/components/post/actions";
import { Button } from "@/components/ui/button";
import { HeartIcon, HeartOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type FavoritePostButtonProps = {
  postId: string;
};

export function FavoritePostButton({ postId }: FavoritePostButtonProps) {
  const session = useSession();
  const userEmail = session?.data?.user?.email;
  const [isFavorite, setIsFavorite] = useState(false);
  const [inProgress, setInProgress] = useState(true);

  useEffect(() => {
    if (!userEmail || !postId) return;
    getUserFavourites(userEmail).then((favourites) => {
      setIsFavorite(favourites!.some((fav) => fav.id === postId));
      setInProgress(false);
    });
  }, [userEmail, postId]);

  const handleClick = async () => {
    if (!userEmail) return;

    setInProgress(true);
    const result = await addPostToFavourites(postId, userEmail);
    setIsFavorite(result);

    // updates the favorite count in the post stats, manually
    const postFavouriteCount = document.getElementsByClassName(
      "post-favourite-count",
    )[0];
    if (postFavouriteCount) {
      const count = parseInt(postFavouriteCount.textContent!);
      postFavouriteCount.textContent = result ? `${count + 1}` : `${count - 1}`;
    }

    setInProgress(false);
  };

  const canClick = !inProgress && userEmail;

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleClick}
      disabled={!canClick}
    >
      {isFavorite ? (
        <HeartOff fill="#ff0000" color="#ff0000" />
      ) : (
        <HeartIcon fill="#ff0000" color="#ff0000" />
      )}
    </Button>
  );
}
