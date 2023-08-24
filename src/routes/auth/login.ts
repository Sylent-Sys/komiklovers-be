import { Handler } from 'express'
import * as argon2 from "argon2"
import * as jose from 'jose'
import { prisma } from '../../prisma'
export const post: Handler = async (req, res) => {
    try {
        const { key, password } = req.body
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
        await prisma.$disconnect()
        return res.json({
            code: 200,
            token: jwt
        })
    } catch (error) {
        return res.status(400).json({ error: "Something went wrong" })
    }
}