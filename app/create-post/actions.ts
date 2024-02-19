"use server";
import { createPost } from "@/lib/queries/post";
import { redirect } from "next/navigation";
import { z } from "zod";

const createPostSchema = z.object({
  email: z.string().email(),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(40, { message: "Title must be at most 40 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .max(1000, { message: "Description must be at most 1000 characters" }),
  price: z.coerce.number().int().min(0, { message: "Price must be positive" }),
});

export async function createPostAction(prevState: any, formData: FormData) {
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

  redirect(`/posts/${post.id}`);
}
