import { z } from "zod";

//schema validation
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Emial is required")
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
})

//z.object()?
//Used schema-based validation with Zod to centralize validation logic and improve scalability, consistency, and maintainability across forms.