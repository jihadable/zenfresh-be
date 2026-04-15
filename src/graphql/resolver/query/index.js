import { GraphQLObjectType } from "graphql"
import categoryQuery from "./categoryQuery.js"
import orderQuery from "./orderQuery.js"
import userQuery from "./userQuery.js"

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        ...userQuery,
        ...categoryQuery,
        ...orderQuery
    }
})

export default Query