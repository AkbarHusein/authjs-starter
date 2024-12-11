'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { signInSchema } from '@/schema/signIn'
import { z } from 'zod'

async function signInAct(values: z.infer<typeof signInSchema>) {
    const validatedFields = signInSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            type: 'error',
            message: 'Invalid input!'
        }
    }

    const { email, password } = validatedFields.data

    try {

        await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        return {
            type: 'success',
            message: 'Signed in successfully',
        }

    } catch (error) {
        console.log(error)

        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        type: 'error',
                        message: 'Invalid email or password'
                    }
                default:
                    return {
                        type: 'error',
                        message: 'Internal server error'
                    }
            }
        }
    }
}


export { signInAct }