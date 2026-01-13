const { GraphQLString, GraphQLNonNull } = require("graphql");
const AuthPayloadType = require("../../type/authPayloadType");
const UserType = require("../../type/userType");
const userService = require("../../../service/userService");
const authMiddleware = require("../../../middleware/authMiddleware");
const { getJWT } = require("../../../helper/tokenizer");

const userMutation = {
    register: {
        type: AuthPayloadType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            phone: { type: new GraphQLNonNull(GraphQLString) },
            address: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async(_, { name, email, password, phone, address }) => {
            try {
                const user = await userService.addUser({ name, email, password, phone, address, role: "customer", is_email_verified: false })
                const jwt = getJWT(user._id, user.role)
    
                return { jwt, user }
            } catch(error){
                throw error
            }
        }
    },
    login: {
        type: AuthPayloadType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async(_, { email, password }) => {
            try {
                const user = await userService.verifyUser(email, password)
                const jwt = getJWT(user._id, user.role)
    
                return { jwt, user }
            } catch(error){
                throw error
            }
        }
    },
    update_user: {
        type: UserType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            phone: { type: new GraphQLNonNull(GraphQLString) },
            address: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async(_, { name, phone, address }, { authorization }) => {
            try {
                const { id } = authMiddleware(authorization, "customer")

                const user = await userService.updateUserById(id, { name, phone, address })
    
                return user
            } catch(error){
                throw error
            }
        }
    }
}

module.exports = userMutation