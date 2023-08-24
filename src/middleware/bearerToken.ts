import * as jose from 'jose'
import { Handler } from 'express'
import { prisma } from '../prisma'
export default (): Handler => async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        if (!bearerToken) return res.status(400).json({ error: "Missing bearer token" })
        if (!bearerToken.startsWith("Bearer ")) return res.status(400).json({ error: "Invalid bearer token" })
        const token = bearerToken.split(" ")[1]
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const jwt = await jose.jwtVerify(token, secret, { algorithms: ['HS256'] })
        const user = await prisma.user.findFirst({
            where: {
                id: parseInt(jwt.payload.id as string)
            }
        })
        if (!user) return res.status(400).json({ error: "User not found" })
        req.user = user
        req.token = token
        req.isAuth = true
        await prisma.$disconnect()
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Something went wrong" })
    }
    next()
}