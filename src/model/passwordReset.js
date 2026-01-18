const { Schema, Types, model } = require("mongoose");

const PasswordResetSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        expires_at: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "password_resets"
    }
)

const PasswordReset = model("PasswordReset", PasswordResetSchema)

module.exports = PasswordReset