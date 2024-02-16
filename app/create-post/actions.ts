"use server";
import { createPost } from "@/lib/queries/post";
import { redirect } from "next/navigation";
import { z } from "zod";

const createPostSchema = z.object({
  email: z.string().email(),
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
  price: z.coerce.number().int().min(0),
});

export async function createPostAction(formData: FormData) {
  console.log("Creating post");

  const validatedFields = createPostSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const post = await createPost(validatedFields.data);
  console.log(post);

  redirect(`/posts/${post.id}`);
}
