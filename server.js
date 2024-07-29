const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const laundryRouter = require("./routes/laundryRoute")
const userRouter = require("./routes/userRoute")
const path = require("path")
const rateLimit = require('express-rate-limit');
const categoryRouter = require("./routes/categoryRoute")
const paymentRouter = require("./routes/paymentRoute")

require("dotenv").config()

const app = express()
const port = process.env.PORT

// middlewares
app.use(cors({ origin: ["https://zenfresh.netlify.app", "http://localhost:5173"] }), express.json(), express.static("views"))
app.use("/styles", express.static(path.join(__dirname, "styles")))
app.use("/images", express.static(path.join(__dirname, "images")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

// rate limit
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        ok: false,
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    statusCode: 429
})

app.use("/api", apiLimiter)

// category route
app.use("/api/categories", categoryRouter)

// user route
app.use("/api/users", userRouter)

// laundry route
app.use("/api/laundries", laundryRouter)

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