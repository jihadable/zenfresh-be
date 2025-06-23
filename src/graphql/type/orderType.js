const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = require("graphql");
const CategoryType = require("./categoryType");
const UserType = require("./userType");
const categoryService = require("../service/categoryService");
const userService = require("../service/userService");

const OrderType = new GraphQLObjectType({
    name: "OrderType",
    fields: () => ({
        id: { type: GraphQLID, resolve: parent => parent._id },
        status: { type: GraphQLString },
        date: { type: GraphQLString },
        rate: { type: GraphQLInt },
        category: {
            type: CategoryType,
            resolve: async(parent) => {
                const category = await categoryService.getCategoryById(parent.category)

                return category
            }
        },
        user: {
            type: UserType,
            resolve: async(parent) => {
                const user = await userService.getUserById(parent.user)

                return user
            }
        }
    })
})

module.exports = OrderType