const { User } = require("../models/userModel")
const bcrypt = require("bcrypt")

// register method
const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })

        // user have already registered
        if (user){
            return res.status(400).json({
                status: 400,
                message: "User have already registered"
            })
        }

        // encrypt password
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)

        user = await User.create({ ...req.body, password: encryptedPassword })
    
        return res.status(201).json({
            status: 201,
            message: "User registered",
            user: {
                fullname: user.fullname,
                email: user.email,
                alamat: user.alamat,
                role: user.role
            }
        })

    } catch (error){
        console.log(error.message)

        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

// login method
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        // there is no such user
        if (!user){
            return res.status(404).json({
                status: 404,
                message: "Resource not found"
            })
        }

        // wrong password
        if (!bcrypt.compareSync(password, user.password)){
            return res.status(401).json({
                status: 401,
                message: "Email or password is incorrect"
            })
        }

        return res.status(202).json({
            status: 202,
            message: "Login successfully"
        })
    } catch (error){
        console.log(error.message)

        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

// logout method
const logout = async (req, res) => {

}

module.exports = { register, login, logout }