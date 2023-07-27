import { Request, Response } from 'express'
export const get = async (_req: Request, res: Response) => {
    return res.json({
        msg: 'Hello World'
    })
}