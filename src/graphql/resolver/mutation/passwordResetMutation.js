import { GraphQLNonNull, GraphQLString } from "graphql"
import passwordResetService from "../../../service/passwordResetService.js"
import UserType from "../../type/userType.js"

const passwordResetMutation = {
    reset_password: {
        type: UserType,
        args: {
            token: { type: new GraphQLNonNull(GraphQLString) },
            new_password: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async(_, { token, new_password }) => {
            try {
                const user = await passwordResetService.resetPassword(token, new_password)

                return user
            } catch(error){
                throw error
            }
        }
    },
    send_password_reset_email: {
        type: UserType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async(_, { email }) => {
            try {
                const user = await passwordResetService.sendPasswordResetEmail(email)

                return user
            } catch(error){
                throw error
            }
        }
    }
}

export default passwordResetMutation