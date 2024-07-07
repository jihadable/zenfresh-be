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
        date: {
            type: Date,
            default: Date.now
        },
        is_paid: {
            type: Boolean,
            default: false
        },
        status: String,
        payment_method: {
            type: String,
            default: null
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

// status:
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
        date: this.date,
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