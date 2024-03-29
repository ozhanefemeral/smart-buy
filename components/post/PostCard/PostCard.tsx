"use client";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPostDate, getImageUrl } from "@/lib/utils";
import placeHolderSVG from "@/public/placeholder.svg";
import { Post } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FavoritePostButton } from "../FavoritePostButton";
interface PostCardProps {
  post: Post;
  /**
   * width of the card in pixels
   */
  width?: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post, width }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <Card
      className={`flex h-full flex-col hover:cursor-pointer ${
        width ? `w-[${width}px]` : "w-full"
      }`}
      onClick={handleClick}
    >
      <CardHeader className="p-4">
        <div className="-mx-4 -mt-4">
          <Image
            src={post.thumbnail ? getImageUrl(post.thumbnail) : placeHolderSVG}
            alt={post.title}
            width={350}
            height={200}
            className="aspect-3/2 rounded-t-xl object-cover"
          />
        </div>

        <CardTitle className="line-clamp-2 pt-2">{post.title}</CardTitle>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-between p-4">
        <div className="flex flex-col">
          <p className="font-bold">{post.price} zł</p>
          <p className="text-xs">{formatPostDate(post.createdAt)}</p>
        </div>
        <FavoritePostButton postId={post.id} />
      </CardFooter>
    </Card>
  );
};
