require("dotenv").config({
    path: ".env.local"
})
const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        let mongoURI = process.env.MONGO_URI

        await mongoose.connect(mongoURI)

        console.log("hai")
    } catch (error){
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB
