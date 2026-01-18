const { GraphQLNonNull, GraphQLString } = require("graphql")
const UserType = require("../../type/userType")
const passwordResetService = require("../../../service/passwordResetService")

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

module.exports = passwordResetMutation