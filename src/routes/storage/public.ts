import { Request, Response } from 'express'
export const get = async (req: Request, res: Response,) => {
    try {
        const { name } = req.query
        if (!name) return res.status(400).json({ error: "Missing name file" })
        return res.sendFile(name as string, { root: `./storage/public/` }, (err) => {
            if (err) return res.status(400).json({ error: "File not found" })
        })
    } catch (error) {
        return res.status(400).json({ error: "Something went wrong" })
    }
}