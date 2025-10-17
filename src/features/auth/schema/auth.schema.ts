import * as zod from "zod";

const EmailSchema = zod
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Invalid email format.");

const PasswordSchema = zod
    .string("Please enter your password.")
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(64, "Password must not exceed 64 characters.");

export const NewUserSchema = zod.object({
    name: zod
        .string("Please enter your name.")
        .trim()
        .min(1, "Please enter your name.")
        .max(40, "Name must not exceed 40 characters."),
    email: EmailSchema,
    password: PasswordSchema,
    password_confirmation: zod
        .string()
        .trim()
        .min(1, "Please confirm your password."),
}, "Invalid input data.").refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
});

export const LoginSchema = zod.object({
    email: EmailSchema,
    password: PasswordSchema
}, "Invalid input data.")


export type NewUserType = zod.infer<typeof NewUserSchema>;
export type LoginType = zod.infer<typeof LoginSchema>;