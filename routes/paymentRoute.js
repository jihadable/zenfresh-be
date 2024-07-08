const { Router } = require("express")
const { updatePaymentStatus, createPaymentToken } = require("../controllers/paymentController")
const { verifyToken } = require("../middlewares/authMiddleware")

const paymentRouter = Router()

// generate midtrans token
paymentRouter.post("/token", verifyToken, createPaymentToken)

// update payment status
paymentRouter.post("/status", updatePaymentStatus)

module.exports = paymentRouter