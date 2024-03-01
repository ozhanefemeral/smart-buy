import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import placeHolderSVG from "@/public/placeholder.svg";
import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="flex w-[300px] flex-col">
      <CardHeader>
        <Image
          src={post.thumbnail ? getImageUrl(post.thumbnail) : placeHolderSVG}
          alt={post.title}
          width={350}
          height={200}
          className="aspect-3/2 rounded-md object-cover"
        />
        <CardTitle className="pt-2">{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex items-end justify-between space-x-4">
        <p>{post.price}</p>
        <Link
          className="font-semibold hover:underline"
          href={`/posts/${post.id}`}
        >
          Details
        </Link>
      </CardFooter>
    </Card>
  );
}
