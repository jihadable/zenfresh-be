const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "categories"
    }
)

const Category = model("Category", CategorySchema)

module.exports = Category