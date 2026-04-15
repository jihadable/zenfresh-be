import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import connectDB from "./config/database/db.js";
import schema from "./graphql/index.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config({
    path: ".env"
})

const app = express()
app.use(express.json(), cors())

connectDB()

app.use("/asset", express.static(new URL("./asset", import.meta.url).pathname))

app.post("/pusher/auth", async(req, res) => {
    try {
        const authorization = req.header("Authorization")
        authMiddleware(authorization)
    } catch(error){
        res.status(401).json({
            status: "fail",
            message: error.message
        })
    }
})

app.use("/graphql", (req, res) => {
    return createHandler({ schema, context: () => ({ authorization: req.header("Authorization") }) })(req, res)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`)
})