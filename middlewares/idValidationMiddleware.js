const { Types } = require("mongoose");
const errorResponse = require("../utils/errorResponse")

const idValidation = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!id || !Types.ObjectId.isValid(id)) {
            return res.status(400).json(
                { 
                    status: 400, 
                    message: 'Invalid ID' 
                }
            )
        }

        next()
    } catch (error){
        errorResponse(error, res)
    }
}

module.exports = idValidation