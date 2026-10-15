import * as z from "zod";

export const registerSchema = z.object({
   name: z.string().trim()
      .min(1, "Please enter your full name")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must not exceed 20 characters"),

   username: z.string().trim().min(1, "username is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must not exceed 20 characters"),

   email: z.email("Please enter a valid email"),

   gender: z.string().refine((value) => value === "male" || value === "female", "choose a gender"),

   dateOfBirth: z.string().refine((value) => { return new Date().getFullYear() - new Date(value).getFullYear() >= 16 }
      , "age must be greater than 16"),

   password: z.string().min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])(?=.*[a-z]).{8,}$/,
         "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"),

   rePassword: z.string().min(1, "repassword is required"),
}).refine(({ password, rePassword }) => { return password === rePassword },
   {
      error: "passwords doesn't match",
      path: ["rePassword"]
   })

