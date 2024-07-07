const { Router } = require("express")
const { updatePaymentStatus, createPaymentToken } = require("../controllers/paymentController")

const paymentRouter = Router()

// generate midtrans token
paymentRouter.post("/token", createPaymentToken)

// update payment status
paymentRouter.post("/status", updatePaymentStatus)

module.exports = paymentRouter