import { GraphQLSchema } from "graphql"
import Mutation from "./resolver/mutation/index.js"
import Query from "./resolver/query/index.js"

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

export default schema