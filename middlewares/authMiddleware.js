const { hash } = require("bcrypt")

const encryptPassword = async (req, res, next) => {
    try {
        // encrypt password
        const hashedPassword = await hash(req.body.password, 10);
        
        req.body.password = hashedPassword;

        next();
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            status: 500,
            message: "Failed to encrypt password"
        });
    }
}

module.exports = {
    encryptPassword
}