import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import UserType from "./userType.js"

const AuthPayloadType = new GraphQLObjectType({
    name: "AuthPayloadType",
    fields: () => ({
        jwt: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(UserType) }
    })
})

export default AuthPayloadType