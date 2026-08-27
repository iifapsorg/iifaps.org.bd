// 8/blog.validation

import { z } from "zod";

/* ---------------------------
 * BLOG VALIDATION
----------------------------*/
export const blogSchemaZ = z.object({
  title: z.string().min(3),
  content: z.string().min(10),

  summary: z.string().optional(),

  thumbnail: z.string().url().optional().or(z.literal("")),

  category: z.string().min(1),

  tags: z.array(z.string()).optional(),

  status: z.enum(["draft", "published"]),

  featured: z.boolean().optional().default(false),

  metaTitle: z.string().optional(),

  metaDescription: z.string().optional(),
});
