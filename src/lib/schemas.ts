import * as z from "zod";

export const RegisterFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});
