const serverErrorResponse = require("../utils/serverErrorResponse")
const defaultResponse = require("../utils/defaultResponse")
const Midtrans = require("midtrans-client")
const { Laundry } = require("../models/laundryModel")
const getEndDate = require("../utils/createEndDate")
const { Types } = require("mongoose")

// get payment token
const getPaymentToken = async (req, res) => {
    try {
        const snap = new Midtrans.Snap({
            isProduction: false,
            serverKey: process.env.SERVER_KEY,
            clientKey: process.env.CLIENT_KEY
        })

        const { laundry_id, total } = req.body

        const transactionId = new Types.ObjectId()

        const parameter = {
            transaction_details: {
                order_id: transactionId,
                gross_amount: total
            }
        }

        await Laundry.findByIdAndUpdate(laundry_id, { transaction_id: transactionId })

        const token = await snap.createTransactionToken(parameter)

        return res.status(200).json({
            ...defaultResponse(200, true, "Get payment token successfully"),
            token
        })
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

// update payment status
const updatePaymentStatus = async (req, res) => {
    try {
        const { order_id, transaction_status } = req.body

        if (transaction_status === "settlement" || transaction_status === "capture"){
            await Laundry.findOneAndUpdate({ transaction_id: order_id }, { is_paid: true, status: "Selesai", end_date: getEndDate() })
        }

        return res.status(200).json(defaultResponse(200, true, "Notification received and processed successfully"))
    } catch(error){
        return serverErrorResponse(error, res)
    }
}

module.exports = { getPaymentToken, updatePaymentStatus }