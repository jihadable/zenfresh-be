const { GraphQLObjectType } = require("graphql");
const userQuery = require("./userQuery");
const categoryQuery = require("./categoryQuery");
const orderQuery = require("./orderQuery");
const emailVerificationQuery = require("./emailVerificationQuery");

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        ...userQuery,
        ...categoryQuery,
        ...orderQuery,
        ...emailVerificationQuery
    }
})

module.exports = Query