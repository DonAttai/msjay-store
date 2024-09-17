import { z } from "zod";

export const updateProductSchema = z.object({
  title: z.string().min(5, { message: "title is required" }).optional(),
  description: z
    .string()
    .min(5, { message: "description is required" })
    .optional(),
  category: z.string().min(2, { message: "category is required" }).optional(),
  price: z.coerce.number().optional(),
  stock: z.coerce.number().optional(),
  image: z.string().optional(),
});
