require("dotenv").config()
const express = require("express")
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require("./graphql");
const connectDB = require("./database/db");
const authMiddleware = require("./middleware/authMiddleware");

const app = express()
connectDB()

app.use("/graphql", authMiddleware)
app.use("/graphql", (req, res) => {
    return createHandler({ schema, context: () => req })(req, res)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})