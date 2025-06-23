const { GraphQLObjectType, GraphQLString } = require("graphql");
const UserType = require("./userType");

const AuthPayloadType = new GraphQLObjectType({
    name: "AuthPayloadType",
    fields: () => ({
        token: { type: GraphQLString },
        user: { type: UserType }
    })
})

module.exports = AuthPayloadType