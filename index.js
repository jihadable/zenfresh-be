const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const laundryRouter = require("./routes/laundryRoute")
const userRouter = require("./routes/userRoute")
const path = require("path")

require("dotenv").config()

const app = express()
const router = express.Router()
const port = 8000

// middlewares
app.use(cors(), express.json(), express.static("views"), express.static("styles"))

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

router.post("/", (req, res) => {
    res.json(req.body)
})

// user route
router.use("/api/users", userRouter)

// laundry route
router.use("/api/laundries", laundryRouter)

app.use("/", router)

// route not found
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"))
})

mongoose.connect("mongodb+srv://jihadable:Terserah1!@mern.eprwhpx.mongodb.net/?retryWrites=true&w=majority&appName=MERN", { dbName: "zenfresh" })
    .then(() => {
        app.listen(port, () => {
            console.log("Server is running on port: " + port)
        })
    })
    .catch(error => {
        console.log(error)
    })