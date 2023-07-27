import express from "express"
import { router } from "express-file-routing"
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import 'dotenv/config'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
app.use("/", await router(
    {
        directory: __dirname + "/routes",
    }
))
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`)
})