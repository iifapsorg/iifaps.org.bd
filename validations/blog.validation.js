import { z } from "zod";

export const blogSchemaZ = z.object({
  title: z.string().min(3),
  content: z.string().min(10),

  excerpt: z.string().optional(),

  thumbnail: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  category: z.string().min(1),

  tags: z.array(z.string()).optional(),

  status: z.enum([
    "draft",
    "published",
  ]),

  metaTitle: z.string().optional(),

  metaDescription: z
    .string()
    .optional(),
});