const express = require("express")
const mongoose = require("mongoose")
const serverless = require("serverless-http")
const cors = require("cors")
const userRoute = require("./routes/userRoute")
const laundryRouter = require("./routes/laundryRoute")

require("dotenv").config()

const app = express()
const router = express.Router()
const port = 8000

app.use(cors({ origin: process.env.FRONTEND_ENDPOINT }), express.json())

router.get("/", (req, res) => {
    res.send("Hello")
})

// user route
router.use("/api/users", userRoute)

// laundry route
router.use("/api/laundries", laundryRouter)

app.use("/", router)

mongoose.connect(process.env.MONGO_URI, { dbName: "zenfresh" })
    .then(() => {
        console.log("connect to mongodb")
        app.listen(port, () => {
            console.log("server is running on port: " + port)
        })
    })
    .catch(error => {
        console.log(error)
    })

module.exports.handler = serverless(api)