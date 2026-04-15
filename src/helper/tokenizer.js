import { randomBytes } from "crypto"
import { sign } from "jsonwebtoken"

const getToken = () => {
    return randomBytes(32).toString("hex")
}

const getJWT = ({ id, role, is_email_verified }) => {
    return sign({ id, role, is_email_verified }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

export { getJWT, getToken }
