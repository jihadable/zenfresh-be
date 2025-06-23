const { Schema, model } = require("mongoose")

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: String,
        address: String,
        role: {
            type: String,
            enum: ["customer", "admin"],
            required: true
        }
    }, 
    { 
        timestamps: true,
        collection: "users"
    }
)

const User = model("User", UserSchema)

module.exports = User