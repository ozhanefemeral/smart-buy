"use client";

import { PostStats } from "@/components/post";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPostDate } from "@/lib/utils";
import { Post } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

interface PostWithStats extends Post, PostStats {}

export const columns: ColumnDef<PostWithStats>[] = [
  {
    header: "Status",
    accessorKey: "isPublished",
    cell: (row) =>
      row.isPublished ? (
        <Badge variant="success">Published</Badge>
      ) : (
        <Badge variant="destructive">Draft</Badge>
      ),
  },
  {
    header: "Post",
    accessorKey: "title",
  },
  {
    header: "Likes",
    accessorKey: "favouriteCount",
  },
  {
    header: "Views",
    accessorKey: "viewCount",
  },
  {
    header: "Added on",
    accessorKey: "createdAt",
    cell: (row) => formatPostDate(row.createdAt),
  },
  {
    header: "Potential Earnings",
    accessorKey: "price",
  },
];
