import { getPostById } from "@/lib/queries/post";
import { handleError } from "@/lib/errors";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  if (!id) {
    return handleError("Invalid ID", 400);
  }

  try {
    const post = await getPostById(id);
    return NextResponse.json(post);
  } catch (error) {
    redirect("/404");
  }
}
