import * as z from "zod";

export const loginSchema = z.object({

   email: z.email("Please enter a valid email"),

   password: z.string().min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])(?=.*[a-z]).{8,}$/,
         "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"),

})
