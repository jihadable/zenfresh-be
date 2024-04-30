const { Schema, model } = require("mongoose")
const { sign } = require("jsonwebtoken")

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

userSchema.methods.generateJWT = async () => {
    return await sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = { User: model("User", userSchema) }