require("dotenv").config()
const express = require("express")
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require("../../src/graphql");
const connectDB = require("../../src/database/db");
const authMiddleware = require("../../src/middleware/authMiddleware");

const app = express()
connectDB()

app.use("/graphql", authMiddleware)
app.use("/graphql", (req, res) => {
    return createHandler({ schema, context: () => res.locals })(req, res)
})

module.exports = app