const { GraphQLObjectType } = require("graphql");
const userMutation = require("./userMutation");
const categoryMutation = require("./categoryMutation");
const orderMutation = require("./orderMutation");
const emailVerificationMutation = require("./emailVerificationMutation");

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...userMutation,
        ...categoryMutation,
        ...orderMutation,
        ...emailVerificationMutation
    }
})

module.exports = Mutation