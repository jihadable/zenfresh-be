const { Router } = require("express")
const { getTransactionStatus, getPaymentToken } = require("../controllers/paymentController")

const paymentRouter = Router()

// get transaction status
paymentRouter.get("/status/:transactionId", getTransactionStatus)

// generate midtrans token
paymentRouter.post("/token", getPaymentToken)

module.exports = paymentRouter