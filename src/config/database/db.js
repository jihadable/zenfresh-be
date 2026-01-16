require("dotenv").config()
const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const phase = process.env.APP_PHASE || "test"
        let mongoURI
        if (phase == "test"){
            mongoURI = process.env.MONGO_URI_TEST
        } else if (phase == "dev"){
            mongoURI = process.env.MONGO_URI_DEV
        }

        await mongoose.connect(mongoURI)
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDB
