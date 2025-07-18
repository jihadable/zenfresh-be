const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "2024160",
    key: "8df6d4d768d779f1f8b3",
    secret: "33631569a1cdd682a4b4",
    cluster: "ap1"
})

const orderTrigger = async(event, data) => {
    await pusher.trigger("order_channel", event, data)   
}

module.exports = { pusher, orderTrigger }