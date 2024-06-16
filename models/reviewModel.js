const { Schema, model, Types } = require("mongoose")

// review schema
const reviewSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User"
        },
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
        content: this.content,
        date: this.date
    }
}

module.exports = { Review: model("Review", reviewSchema) }