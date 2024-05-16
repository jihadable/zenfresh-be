const { Schema, Types, model } = require("mongoose")

const laundrySchema = new Schema(
    {
        category: {
            type: Types.ObjectId,
            ref: "Category"
        },
        start_date: String,
        end_date: {
            type: String,
            default: null
        },
        is_paid: {
            type: Boolean,
            default: false
        },
        is_finish: {
            type: Boolean,
            default: false
        },
        payment_method: String,
        weight: Number,
        user: {
            type: Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
        collection: "laundries"
    }
)

// response template
laundrySchema.methods.response = function(){
    return {
        id: this._id,
        category: this.category.response(),
        start_date: this.start_date,
        end_date: this.end_date,
        is_paid: this.is_paid,
        is_finish: this.is_finish,
        payment_method: this.payment_method,
        weight: this.weight,
        user: this.user.response()
    }
}

module.exports = { Laundry: model("Laundry", laundrySchema) }