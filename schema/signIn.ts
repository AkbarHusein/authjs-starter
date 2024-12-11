import { z } from 'zod'

const signInSchema = z.object({
    email: z.string().email("Email not valid!"),
    password: z.string().min(1, 'Password not valid!')
})

export { signInSchema }