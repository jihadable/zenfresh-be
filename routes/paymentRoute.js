const { Router } = require("express")
const { getPaymentToken, updatePaymentStatus } = require("../controllers/paymentController")

const paymentRouter = Router()

// generate midtrans token
paymentRouter.post("/token", getPaymentToken)

// update payment status
paymentRouter.post("/status", updatePaymentStatus)

module.exports = paymentRouter