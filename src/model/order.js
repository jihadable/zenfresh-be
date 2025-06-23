const { Schema, model, Types } = require("mongoose");

const OrderSchema = new Schema(
    {
        status: {
            type: String,
            enum: [
                "Pending confirmation",
                "Pickup in progress",  
                "Processing",
                "Delivery in progress",
                "Awaiting payment",    
                "Cancelled",
                "Completed"
            ],
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        category: {
            type: Types.ObjectId,
            ref: "Category"
        },
        user: {
            type: Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
        collection: "orders"
    }
)

const Order = model("Order", OrderSchema)

module.exports = Order