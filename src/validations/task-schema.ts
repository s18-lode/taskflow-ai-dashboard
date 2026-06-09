import { z } from "zod";

export const taskSchema = z.object({
    title: z
    .string()
    .min(3, "Task must be at least 3 characters")
    .max(100, "Task cannot exceed 100 characters")
});

export type TaskFormData =
  z.infer<typeof taskSchema>;