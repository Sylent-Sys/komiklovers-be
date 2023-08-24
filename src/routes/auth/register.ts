import { Handler } from 'express'
import multer from 'multer'
import fs from 'fs'
import * as argon2 from "argon2"
import { prisma } from '../../prisma'
export const post: Handler[] = [
    multer().single('profile')
    , async (req, res) => {
        try {
            const { email, password, name, address } = req.body
            const photo = req.file
            if (photo) {
                const photoExt = photo.mimetype.split('/')[1]
                const user = await prisma.user.create({
                    data: {
                        email,
                        password: await argon2.hash(password),
                        name,
                        profile: ''
                    }
                })
                const photoFilename = `${Date.now()}${user.id}.${photoExt}`
                fs.writeFileSync(`./storage/public/${photoFilename}`, photo.buffer)
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        profile: photoFilename
                    }
                })
                await prisma.$disconnect()
                return res.status(200).json({
                    code: 200,
                    msg: "Berhasil"
                })
            } else {
                await prisma.user.create({
                    data: {
                        email,
                        password: await argon2.hash(password),
                        name,
                        profile: ''
                    }
                })
                await prisma.$disconnect();
                return res.status(200).json({
                    code: 200,
                    msg: "Berhasil"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: "Something went wrong" })
        }
    }
]