import main from "./server.js"

(async () => {
    (await main()).listen(process.env.PORT || 3000, () => {
        console.log(`Server started on port ${process.env.PORT || 3000}`)
    })
})()