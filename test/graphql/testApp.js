require("dotenv").config()
const express = require("express")
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require("../../src/graphql");
const cors = require("cors");
const connectDB = require("../../src/config/database/db");

const app = express()
app.use(express.json(), cors())

connectDB()

app.use("/graphql", (req, res) => {
    return createHandler({ schema, context: () => ({ authorization: req.header("Authorization") }) })(req, res)
})

module.exports = app