import * as z from "zod";

export const changePasswordSchema = z.object({
    password: z.string().min(1, "Password is required"),

    newPassword: z.string().min(1, "newPassword is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])(?=.*[a-z]).{8,}$/,
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"),
})
