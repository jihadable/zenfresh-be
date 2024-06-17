const { Schema, model, Types } = require("mongoose")

// review schema
const reviewSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User"
        },
        rate: Number,
        content: String,
        date: String
    },
    {
        timestamps: true,
        collection: "reviews"
    }
)

// review response
reviewSchema.methods.response = function(){
    return {
        user: this.user.response(),
        rate: this.rate,
        content: this.content,
        date: this.date
    }
}

module.exports = { Review: model("Review", reviewSchema) }