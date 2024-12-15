import NextAuth, { NextAuthConfig } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signInSchema } from '@/schema/auth'
import { z } from 'zod'

const authOptions: NextAuthConfig = {
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const { email, password } = credentials as z.infer<typeof signInSchema>
                const user = await prisma.user.findUnique({ where: { email } })

                if (user) {
                    const isValidPassword = await bcrypt.compare(password, user.password as string)
                    if (isValidPassword) {
                        return user
                    }
                    return null
                }
                return null
            },
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        })
    ],
    callbacks: { authorized: async ({ auth }) => !!auth },
    session: { strategy: 'jwt' },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/signin'
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions)
