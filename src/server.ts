import express from "express"
import { router } from "express-file-routing"
import path from 'path'
import 'dotenv/config'
async function main() {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use("/", await router(
        {
            directory: path.join(process.cwd(), "/src/routes"),
        }
    ))
    return app
}
export default main