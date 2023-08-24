import { Handler } from 'express'
export const get: Handler = async (_req, res) => {
    return res.json({
        msg: 'Hello World'
    })
}