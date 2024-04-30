const mongoose = require("mongoose")

const Schema = mongoose.Schema

// user schema
const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        alamat: {
            type: String,
            required: false
        },
        role: {
            type: String,
            required: true
        }
    }, 
    { 
        timestamps: true,
        collection: "users"
    }
)

module.exports = { User: mongoose.model("User", userSchema) }