const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        let mongoURI = process.env.MONGO_URI

        await mongoose.connect(mongoURI)
    } catch (error){
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB