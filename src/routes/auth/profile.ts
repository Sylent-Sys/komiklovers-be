import { Request, Response } from 'express'
import * as jose from 'jose'
import { PrismaClient } from '@prisma/client'
export const post = async (req: Request, res: Response) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken) return res.status(400).json({ error: "Missing bearer token" })
    const token = bearerToken.split(" ")[1]
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const jwt = await jose.jwtVerify(token, secret, { algorithms: ['HS256'] })
    const prisma = new PrismaClient()
    const user = await prisma.user.findFirst({
        where: {
            id: parseInt(jwt.payload.id as string)
        }
    })
    if (!user) return res.status(400).json({ error: "User not found" })
    return res.json({
        name: user.name,
        email: user.email,
    })
}