import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const main = async () => {
    const user = await prisma.user.create({
        data: {
            email: 'test@example.com',
            password: await bcrypt.hash('password', 11)
        }
    })

    console.log('user created! : ', user)
}

main().then(async res => {
    console.log(res)

    await prisma.$disconnect()
}).catch(async err => {
    console.log(err)

    await prisma.$disconnect()
    process.exit(1)
})