const { auth } = require("../../../helper/auth");
const userService = require("../../service/userService");
const UserType = require("../../type/userType");

const userQuery = {
    user: {
        type: UserType,
        resolve: async(_, __, context) => {
            try {
                const { id } = auth(context)
    
                const user = await userService.getUserById(id)
    
                return user
            } catch(error){
                throw error
            }
        }
    }
}

module.exports = userQuery