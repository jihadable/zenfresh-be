const { Schema, Types, model } = require("mongoose")

const laundrySchema = new Schema(
    {
        type: String,
        start_date: String,
        end_date: String,
        payment_method: String,
        is_paid: Boolean,
        is_finish: Boolean,
        user: {
            type: Types.ObjectId,
            ref: "User"
        }
    },
    {
        collection: "laundries"
    }
)

// response template
laundrySchema.methods.response = function() {
    return {
        type: this.type,
        start_date: this.start_date,
        end_date: this.end_date,
        payment_method: this.payment_method,
        is_paid: this.is_paid,
        is_finish: this.is_finish,
        user: this.user.response()
    }
}

module.exports = { Laundry: model("Laundry", laundrySchema) }