import { z } from "zod";

export const categorySchemaZ = z.object({
  name: z.string().min(2).max(100),
  parent: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});