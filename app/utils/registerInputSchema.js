import { z } from "zod";

export const registerInputSchema = z.object({
  name: z
    .string()
    .min(3, "Name is too short, minimum of 3 characters.")
    .max(32, "Name is too long, maximum of 32 characters.")
    .regex(/^[a-zA-Z0-9]+$/, "Name cannot have pecial characters and spaces. Please use a single name."),
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password must be at most 32 characters.")
    .regex(/[0-9]/, "Password must contain at least 1 number.")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
    .regex(/[!-\/:-@[-`{-~]/, "Password must contain at least 1 special character."),
});
