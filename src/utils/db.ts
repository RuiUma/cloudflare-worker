import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'



const queryUser = async (userName: string, env: Env) => {
    const adapter = new PrismaD1(env.user)
    const prisma = new PrismaClient({ adapter })
    return await prisma.user.findUnique({
        where: {
            email: userName
        }
    })
}

// todo: 
const insertUser = async (email:string, password:string, env:Env, name?:string, ) => {
    const adapter = new PrismaD1(env.user)
    const prisma = new PrismaClient({ adapter })
    return await prisma.user.create({
        data: {
            email: email,
            password: password,
            name: name
        }
    })
}

export { queryUser, insertUser }