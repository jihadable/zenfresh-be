const { Schema, model } = require("mongoose")

const laundrySchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        payment_method: {
            type: String,
            required: true
        },
        start_date: {
            type: String,
            required: true
        },
        end_date: {
            type: String,
            required: false
        },
        is_paid: {
            type: Boolean,
            required: true
        },
        is_finish: {
            type: Boolean,
            required: true
        }
    },
    {
        collection: "laundries"
    }
)

module.exports = { Laundry: model("Laundry", laundrySchema) }