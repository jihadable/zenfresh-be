import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID), resolve: parent => parent._id },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        role: { type: new GraphQLNonNull(GraphQLString) },
        is_email_verified: { type: GraphQLBoolean }
    })
})

export default UserType