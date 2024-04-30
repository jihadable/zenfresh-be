const express = require("express")

require("dotenv").config()

const app = express()
const port = 8000
const mongoose = require("mongoose")

const userRoute = require("./routes/userRoute")

app.use(express.json())

// user route
app.use("/api/users", userRoute)

mongoose.connect(process.env.MONGO_URI, { dbName: "zenfresh" })
    .then(() => {
        app.listen(port, () => {
            console.log("starting on port: " + port)
        })
    })
    .catch(error => {
        console.log(error)
    })