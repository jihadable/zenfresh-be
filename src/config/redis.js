const { createClient } = require("redis")

const redis = createClient({
    url: process.env.REDIS_URL
})

redis.on("error", (err) => console.log("Redis error:", err))

redis.connect()

module.exports = redis