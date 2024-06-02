const { Schema, model, Types } = require("mongoose")

const reviewSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User"
        },
        comment: String,
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
        user: this.user.reponse(),
        comment: this.comment,
        date: this.date
    }
}

module.exports = { Review: model("Review", reviewSchema) }