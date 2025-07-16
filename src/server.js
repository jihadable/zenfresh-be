require("dotenv").config();
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./graphql");
const connectDB = require("./database/db");
const cors = require("cors");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/use/ws");

const app = express()
app.use(express.json(), cors())

connectDB()

app.use("/graphql", (req, res) => {
    return createHandler({ schema, context: () => req })(req, res)
})

const server = createServer(app)
const wsServer = new WebSocketServer({
    server,
    path: "/graphql",
})

useServer({ schema }, wsServer)

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`)
    console.log(`📡 Subscriptions ready at ws://localhost:${PORT}/graphql`)
})