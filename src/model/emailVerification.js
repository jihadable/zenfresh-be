const { Schema, model, Types } = require("mongoose");

const EmailVerificationSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        token: {
            type: String,
            required: true
        },
        expires_at: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "email_verifications"
    }
)

EmailVerificationSchema.index(
    { expires_at: 1 },
    { expireAfterSeconds: 0 }
)

const EmailVerification = model("EmailVerification", EmailVerificationSchema)

module.exports = EmailVerification