const { Schema, model } = require("mongoose")
const { sign } = require("jsonwebtoken")

// user schema
const userSchema = new Schema(
    {
        fullname: String,
        email: {
            type: String,
            unique: true
        },
        password: String,
        address: {
            type: String,
            required: false,
            default: null
        },
        role: String
    }, 
    { 
        timestamps: true,
        collection: "users"
    }
)

// generate token
userSchema.methods.generateJWT = async function(){
    return await sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

// response template
userSchema.methods.response = function() {
    return {
        fullname: this.fullname,
        email: this.email,
        address: this.address,
        role: this.role
    }
}

module.exports = { User: model("User", userSchema) }