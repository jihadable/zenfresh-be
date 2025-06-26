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
        total_price: Number,
        date: {
            type: Date,
            default: () => new Date(),
            required: true
        },
        category: {
            type: Types.ObjectId,
            ref: "Category",
            required: true,
        },
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
        collection: "orders"
    }
)

const Order = model("Order", OrderSchema)

module.exports = Order