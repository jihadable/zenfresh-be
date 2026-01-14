const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLNonNull } = require("graphql");

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID), resolve: parent => parent._id },
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) }
    })
})

module.exports = CategoryType