const express = require('express');
const mongoose = require("mongoose")
const cors = require("cors")
const serverless = require('serverless-http');
const userRouter = require('../routes/userRoute');
const laundryRouter = require('../routes/laundryRoute');

require("dotenv").config()

const app = express();
const router = express.Router();

app.use(cors({ origin: process.env.FRONTEND_ENDPOINT }), express.json())

router.get("/", (req, res) => {
    res.send("Server is running...")
})

// user route
router.use("/api/users", userRouter)

// laundry route
router.use("/api/laundries", laundryRouter)

app.use('/', router);

mongoose.connect(process.env.MONGO_URI, { dbName: "zenfresh" })
    .then(() => {
        console.log("Server is running...")
    })
    .catch(error => {
        console.log(error)
    })

module.exports.handler = serverless(app);