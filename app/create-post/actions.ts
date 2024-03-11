"use server";
import { createPost } from "@/lib/queries/post";
import { uploadPostImagesToS3 } from "@/lib/aws";
import { redirect } from "next/navigation";
import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2mb

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

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
  images: z
    .custom<File>()
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
    .refine((file) => {
      console.log(file.type);
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, ".jpg, .jpeg, .png and .webp files are accepted."),
  thumbnailIndex: z.coerce.number().int().optional(),
  isPublished: z.union([z.literal("on"), z.null()]),
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

  const hasImages = formData.getAll("images").length > 0;
  let imageUrls: string[] | undefined;
  let thumbnail: string | undefined;

  if (hasImages) {
    const images = formData.getAll("images") as File[];
    const thumbnailIndex = validatedFields.data.thumbnailIndex || 0;
    let result = await uploadPostImagesToS3(
      images,
      validatedFields.data.title,
      thumbnailIndex,
    );
    imageUrls = result.imageUrls;
    thumbnail = result.thumbnail;
  }

  const post = await createPost({
    ...validatedFields.data,
    thumbnail,
    isPublished: validatedFields.data.isPublished === "on",
    images: imageUrls,
  });

  redirect(`/posts/${post.id}`);
}
