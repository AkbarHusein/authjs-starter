import { z } from 'zod'

const signInSchema = z.object({
    email: z.string().email("Email not valid!"),
    password: z.string().min(1, 'Password not valid!')
})

const signUpSchema = z.object({
    email: z.string().email("Email not valid!"),
    password: z.string().min(1, 'Password not valid!'),
    confirmPassword: z.string().min(1, 'Confirm password not valid!'),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ['confirmPassword'], // Menargetkan kesalahan di field confirmPassword
});

export { signInSchema, signUpSchema }