const authMiddleware = require("../../../middleware/authMiddleware");
const userService = require("../../../service/userService");
const UserType = require("../../type/userType");

const userQuery = {
    user: {
        type: UserType,
        resolve: async(_, __, { authorization }) => {
            try {
                const { id } = authMiddleware(authorization)
    
                const user = await userService.getUserById(id)
    
                return user
            } catch(error){
                throw error
            }
        }
    }
}

module.exports = userQuery