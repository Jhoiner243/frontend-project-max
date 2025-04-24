import z from "zod";

export const registerSchema = z.object({
  user_name: z.string().min(1, { message: "Name is required" }),
  user_username: z.string().min(1, { message: "Username is required" }),
  user_lastname: z.string().min(1, { message: "Lastname is required" }),
  user_email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  user_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const loginSchema = z.object({
  user_email: z.string().min(1, { message: "Email is required" }),
  user_password: z.string().min(8, { message: "Password is required" }),
});
