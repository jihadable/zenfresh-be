require("dotenv").config();
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./graphql");
const connectDB = require("./database/db");
const cors = require("cors");
const { auth } = require("./helper/auth");

const app = express()
app.use(express.json(), cors())

connectDB()

app.post("/pusher/auth", async(req, res) => {
    try {
        const authorization = req.header("Authorization")
        auth(authorization)
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