import authMiddleware from "../../../middleware/authMiddleware.js"
import userService from "../../../service/userService.js"
import UserType from "../../type/userType.js"

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

export default userQuery