import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(5, { message: "title is required" }),
  description: z.string().min(5, { message: "description is required" }),
  category: z.string().min(2, { message: "category is required" }),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  image: z.string(),
});
