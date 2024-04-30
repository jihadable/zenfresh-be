const express = require("express")

require("dotenv").config()

const app = express()
const port = 8000
const mongoose = require("mongoose")

const { userRouter } = require("./routes/userRoute")

app.use(express.json())

// register middleware
app.use("/api/register/", userRouter.register)

// login middleware
app.use("/api/login/", userRouter.login)

// logout middleware
app.use("/api/logout/", userRouter.logout)

mongoose.connect(process.env.MONGO_URI, { dbName: "zenfresh" })
    .then(() => {
        app.listen(port, () => {
            console.log("starting on port: " + port)
        })
    })
    .catch(error => {
        console.log(error)
    })