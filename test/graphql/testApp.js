import cors from "cors"
import express from "express"
import { createHandler } from 'graphql-http/lib/use/express'
import connectDB from "../../src/config/database/db.js"
import schema from "../../src/graphql/index.js"

const app = express()
app.use(express.json(), cors())

connectDB()

app.use("/graphql", (req, res) => {
    return createHandler({ schema, context: () => ({ authorization: req.header("Authorization") }) })(req, res)
})

export default app