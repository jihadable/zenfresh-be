const express = require('express');
const mongoose = require("mongoose")
const cors = require("cors")
const serverless = require('serverless-http');
const userRouter = require('../routes/userRoute');
const laundryRouter = require('../routes/laundryRoute');

const app = express();
const router = express.Router();

require("dotenv").config()

app.use(cors({ origin: process.env.FRONTEND_ENDPOINT }), express.json())

router.get("/", (req, res) => {
    res.send("Hello")
})

// user route
router.use("/api/users", userRouter)

// laundry route
router.use("/api/laundries", laundryRouter)

app.use('/', router);

mongoose.connect(process.env.MONGO_URI, { dbName: "zenfresh" })
    .then(() => {
        console.log("connect to mongodb")
        // app.listen(port, () => {
        //     console.log("server is running on port: " + port)
        // })
    })
    .catch(error => {
        console.log(error)
    })

module.exports.handler = serverless(app);