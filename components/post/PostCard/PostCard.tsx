import * as React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Post } from "@prisma/client";
import Link from "next/link";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="flex w-[300px] flex-col">
      <CardHeader>
        <Image
          src={post.thumbnail}
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
