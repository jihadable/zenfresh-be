import { GraphQLObjectType } from "graphql"
import categoryMutation from "./categoryMutation.js"
import emailVerificationMutation from "./emailVerificationMutation.js"
import orderMutation from "./orderMutation.js"
import passwordResetMutation from "./passwordResetMutation.js"
import userMutation from "./userMutation.js"

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...userMutation,
        ...categoryMutation,
        ...orderMutation,
        ...emailVerificationMutation,
        ...passwordResetMutation
    }
})

export default Mutation