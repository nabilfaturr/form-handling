import { z } from "zod";

export const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password is required." })
    .min(8, { message: "Confirm Password must be at least 8 characters." }),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
});

export type TFormSchema = z.infer<typeof FormSchema>;
