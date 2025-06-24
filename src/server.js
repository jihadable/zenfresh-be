require("dotenv").config()
const express = require("express")
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require("./graphql");
const connectDB = require("./database/db");
const cors = require("cors")

const app = express()
app.use(express.json(), cors())

connectDB()

app.use("/graphql", (req, res) => {
    return createHandler({ schema, context: () => req })(req, res)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})