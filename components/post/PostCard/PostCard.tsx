"use client";
import * as React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";

export function PostCard({ post }: { post: Post }) {
  const route = useRouter();

  const goToPost = () => {
    route.push(`/post/${post.id}`);
  };

  return (
    <Card className="flex w-[350px] flex-col">
      <CardHeader>
        <Image
          src="placeholder.svg"
          alt={post.title}
          width={350}
          height={200}
          className="rounded-md"
        />
        <CardTitle className="pt-2">{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex items-end justify-between space-x-4">
        <p>{post.price}</p>
        <Button onClick={goToPost}>See Details</Button>
      </CardFooter>
    </Card>
  );
}
