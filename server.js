const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const laundryRouter = require("./routes/laundryRoute")
const userRouter = require("./routes/userRoute")

require("dotenv").config()

const app = express()
const port = 8000

app.use(cors({ origin: process.env.FRONTEND_ENDPOINT }), express.json())

// user route
app.use("/api/users", userRouter)

// laundry route
app.use("/api/laundries", laundryRouter)

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