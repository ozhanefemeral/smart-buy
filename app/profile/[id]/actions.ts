"use server";
import { updateUserPhone, verifyPhone } from "@/lib/queries/user";
import { z } from "zod";

const savePhoneSchema = z.object({
  email: z.string().email(),
  phone: z
    .string()
    .min(6, { message: "Phone number must be at least 6 characters" })
    .max(15, { message: "Phone number must be at most 15 characters" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
});

const verifyPhoneSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(8, { message: "OTP must be 8 characters long" }),
});

export const savePhoneNumber = async (prevState: any, formData: FormData) => {
  const validatedFields = savePhoneSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, phone } = validatedFields.data;

  const updatedUser = await updateUserPhone(email, phone);
  return updatedUser;
};

export const verifyPhoneNumber = async (prevState: any, formData: FormData) => {
  // TODO: Implement the function to verify the phone number
  // Right now we don't send the OTP to the user, so we just mark the phone as verified

  const validatedFields = verifyPhoneSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, otp } = validatedFields.data;

  const updatedUser = await verifyPhone(email, otp);
  return updatedUser;
};
