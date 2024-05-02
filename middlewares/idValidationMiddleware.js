const { Types } = require("mongoose");
const serverErrorResponse = require("../utils/serverErrorResponse");
const defaultResponse = require("../utils/defaultResponse");

const idValidation = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!id || !Types.ObjectId.isValid(id)) {
            return res.status(400).json(defaultResponse(400, false, "Invalid ID"))
        }

        next()
    } catch (error){
        serverErrorResponse(error, res)
    }
}

module.exports = idValidation