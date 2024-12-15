"use server"

import { prisma } from "@/lib/prisma"

const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } })
    return user ? user : null
}

export { getUserByEmail }