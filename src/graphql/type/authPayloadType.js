const { GraphQLObjectType, GraphQLString } = require("graphql");
const UserType = require("./userType");

const AuthPayloadType = new GraphQLObjectType({
    name: "AuthPayloadType",
    fields: () => ({
        jwt: { type: GraphQLString },
        user: { type: UserType }
    })
})

module.exports = AuthPayloadType