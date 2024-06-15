const { Schema, Types, model } = require("mongoose")

const laundrySchema = new Schema(
    {
        transaction_id: {
            type: String,
            default: null
        },
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
        status: String,
        payment_method: {
            type: String,
            default: "Cash"
        },
        weight: {
            type: Number,
            default: null
        },
        rate: {
            type: Number,
            default: null
        },
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

// menunggu konfirmasi
// kurir menjemput pakaian pelanggan
// menunggu proses pencucian
// kurir mengantar pakaian pelanggan
// menunggu pembayaran
// selesai

// response template
laundrySchema.methods.response = function(){
    return {
        id: this._id,
        category: this.category.response(),
        start_date: this.start_date,
        end_date: this.end_date,
        is_paid: this.is_paid,
        status: this.status,
        payment_method: this.payment_method,
        weight: this.weight,
        rate: this.rate,
        transaction_id: this.transaction_id,
        user: this.user.response()
    }
}

module.exports = { Laundry: model("Laundry", laundrySchema) }