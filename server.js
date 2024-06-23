const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const laundryRouter = require("./routes/laundryRoute")
const userRouter = require("./routes/userRoute")
const path = require("path")
const categoryRouter = require("./routes/categoryRoute")
const reviewRouter = require("./routes/reviewRoute")
const paymentRouter = require("./routes/paymentRoute")
const { User } = require("./models/userModel")
const userMigration = require("./database/userMigration")

require("dotenv").config()

const app = express()
const port = process.env.PORT

// middlewares
app.use(cors(), express.json(), express.static("views"))
app.use("/styles", express.static(path.join(__dirname, "styles")))
app.use("/images", express.static(path.join(__dirname, "images")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

// app.use("/api", )

// category route
app.use("/api/categories", categoryRouter)

// user route
app.use("/api/users", userRouter)

// laundry route
app.use("/api/laundries", laundryRouter)

// review route
app.use("/api/reviews", reviewRouter)

// payment route
app.use("/api/payment", paymentRouter)

// route not found
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "views", "not-found.html"))
})

mongoose.connect(process.env.MONGO_URI, { dbName: "zenfresh" })
    .then(() => {
        app.listen(port, () => {
            console.log("Server is running")
        })
    })
    .catch(error => {
        console.log(error)
    })