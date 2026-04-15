import { GraphQLNonNull, GraphQLString } from "graphql"
import authMiddleware from "../../../middleware/authMiddleware.js"
import emailVerificationService from "../../../service/emailVerificationService.js"
import UserType from "../../type/userType.js"

const emailVerificationMutation = {
    verify_email: {
        type: UserType,
        args: {
            token: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async(_, { token }) => {
            try {
                const user = await emailVerificationService.verifyEmail(token)

                return user
            } catch(error){
                throw error
            }
        }
    },
    send_email_verification: {
        type: UserType,
        resolve: async(_, __, { authorization }) => {
            try {
                const { id } = authMiddleware(authorization, "customer")

                const user = await emailVerificationService.sendEmailVerification(id)
                
                return user
            } catch(error){
                throw error
            }
        }
    }
}

export default emailVerificationMutation