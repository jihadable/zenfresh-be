const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const laundryRouter = require("./routes/laundryRoute")
const userRouter = require("./routes/userRoute")

require("dotenv").config()

const app = express()
const port = 8000

app.use(cors(), express.json())

app.get("/", (req, res) => {
    res.send("Hallo")
})

// user route
app.use("/api/users", userRouter)

// laundry route
app.use("/api/laundries", laundryRouter)

mongoose.connect("mongodb+srv://jihadable:Terserah1!@mern.eprwhpx.mongodb.net/?retryWrites=true&w=majority&appName=MERN", { dbName: "zenfresh" })
    .then(() => {
        app.listen(port, () => {
            console.log("Server is running on port: " + port)
        })
    })
    .catch(error => {
        console.log(error)
    })