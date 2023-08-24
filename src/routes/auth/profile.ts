import { Handler } from 'express'
import bearerToken from '../../middleware/bearerToken'
export const post: Handler[] = [
    bearerToken()
    , async (req, res) => {
        try {
            return res.json({
                code: 200,
                data: {
                    name: req.user.name,
                    email: req.user.email,
                    profile: req.user.profile
                }
            })
        } catch (error) {
            return res.status(400).json({ error: "Something went wrong" })
        }
    }
]