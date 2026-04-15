import { GraphQLSchema } from "graphql"
import Mutation from "./resolver/mutation.js"
import Query from "./resolver/query.js"

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

export default schema