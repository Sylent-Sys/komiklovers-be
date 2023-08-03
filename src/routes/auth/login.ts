import { Request, Response } from 'express'
import * as argon2 from "argon2"
import * as jose from 'jose'
import { PrismaClient } from '@prisma/client'
export const post = async (req: Request, res: Response) => {
    const { key, password } = req.body
    const prisma = new PrismaClient()
    if (!key || !password) return res.status(400).json({ error: "Missing key or password" })
    let user = await prisma.user.findFirst({
        where: {
            name: key
        }
    })
    if (!user) {
        user = await prisma.user.findFirst({
            where: {
                email: key
            }
        })
        if (!user) return res.status(400).json({ error: "User not found" })
    }
    if (!await argon2.verify(user.password, password)) return res.status(400).json({ error: "Incorrect password" })
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const jwt = await new jose.SignJWT({ id: user.id.toString() })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
        .sign(secret)
    return res.json({
        jwt
    })
}