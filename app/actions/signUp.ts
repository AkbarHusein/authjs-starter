'use server'

import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/data/user'
import { prisma } from '@/lib/prisma'
import { signUpSchema } from '@/schema/auth'
import { z } from 'zod'

const signUpAct = async (form: z.infer<typeof signUpSchema>) => {
    const validatedFields = signUpSchema.safeParse(form)

    if (!validatedFields.success) {
        return {
            type: 'error',
            message: 'Invalid input!',
        }
    }

    const { email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const isUserExist = await getUserByEmail(email)

        if (isUserExist) {
            return {
                type: 'error',
                message: 'Email already registered!',
            }
        }

        const user = await prisma.user.create({
            data: { email, password: hashedPassword }
        })

        if (user) {
            return {
                type: 'success',
                message: 'User created successfully!',
            }
        }

        return {
            type: 'error',
            message: 'Failed to create user!',
        }
    } catch (error) {
        console.log(error)
        return {
            type: 'error',
            message: 'Internal server error!',
        }
    }
}


export { signUpAct }