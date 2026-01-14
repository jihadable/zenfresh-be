const Pusher = require("pusher");

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER
})

const orderTrigger = async(event, data) => {
    await pusher.trigger("order_channel", event, data)   
}

const emailVerificationTrigger = async(event, data) => {
    await pusher.trigger("email_verification_channel", event, data)
}

module.exports = { orderTrigger, emailVerificationTrigger }