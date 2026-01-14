const { GraphQLNonNull, GraphQLString } = require("graphql")
const UserType = require("../../type/userType")
const emailVerificationService = require("../../../service/emailVerificationService")
const authMiddleware = require("../../../middleware/authMiddleware")

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

module.exports = emailVerificationMutation