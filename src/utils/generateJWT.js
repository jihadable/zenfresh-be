const { sign } = require("jsonwebtoken")

const generateJWT = (id, role) => {
    return sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = generateJWT