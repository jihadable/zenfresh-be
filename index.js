const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const laundryRouter = require("./routes/laundryRoute")
const userRouter = require("./routes/userRoute")
const path = require("path")

require("dotenv").config()

const app = express()
const router = express.Router()
const port = process.env.PORT

// middlewares
app.use(cors(), express.json(), express.static("views"))

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

// user route
router.use("/api/users", userRouter)

// laundry route
router.use("/api/laundries", laundryRouter)

app.use("/", router)

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