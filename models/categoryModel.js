const { Schema, model } = require("mongoose")

// category schema
const categorySchema = new Schema(
    {
        name: String,
        price: Number,
        duration: String
    },
    {
        timestamps: true,
        collection: "categories"
    }
)

// response template
categorySchema.methods.response = function(){
    return {
        id: this._id,
        name: this.name,
        price: this.price,
        duration: this.duration
    }
}

module.exports = { Category: model("Category", categorySchema) }