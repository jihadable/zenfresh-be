const { GraphQLString, GraphQLID, GraphQLNonNull } = require("graphql");
const AuthPayloadType = require("../../type/authPayloadType");
const UserType = require("../../type/userType");
const userService = require("../../service/userService");
const { authorizeRole } = require("../../../helper/auth");
const generateJWT = require("../../../utils/generateJWT");

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
                const user = await userService.addUser({ name, email, password, phone, address })
                const token = generateJWT(user._id, user.role)
    
                return { token, user }
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
                const token = generateJWT(user._id, user.role)
    
                return { token, user }
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
        resolve: async(_, { name, phone, address }, context) => {
            try {
                const { id } = authorizeRole(context, "customer")

                const user = await userService.updateUserById(id, { name, phone, address })
    
                return user
            } catch(error){
                throw error
            }
        }
    }
}

module.exports = userMutation