import { z } from "zod";

export const userSchemaZ = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(80, "Name cannot exceed 80 characters.")
      .optional(),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address.")
      .transform((value) => value.toLowerCase())
      .optional(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .optional(),

    role: z.enum(["moderator", "admin", "author"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  });
