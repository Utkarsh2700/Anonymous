import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "Content must be of alteast 10 characters")
    .max(300, { message: "Content must be no longer than 300 characters" }),
});
