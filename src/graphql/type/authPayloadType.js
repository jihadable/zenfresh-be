const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const UserType = require("./userType");

const AuthPayloadType = new GraphQLObjectType({
    name: "AuthPayloadType",
    fields: () => ({
        jwt: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(UserType) }
    })
})

module.exports = AuthPayloadType