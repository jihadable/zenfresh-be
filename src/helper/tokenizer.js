const { randomBytes } = require("crypto")
const { sign } = require("jsonwebtoken")

const getToken = () => {
    return randomBytes(32).toString("hex")
}

const getJWT = (id, role) => {
    return sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = { getToken, getJWT }