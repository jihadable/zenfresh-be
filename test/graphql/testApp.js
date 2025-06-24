require("dotenv").config()
const express = require("express")
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require("../../src/graphql");
const connectDB = require("../../src/database/db");
const cors = require("cors")

const app = express()
app.use(express.json(), cors())

connectDB()

app.use("/graphql", (req, res) => {
    return createHandler({ schema, context: () => req })(req, res)
})

module.exports = app