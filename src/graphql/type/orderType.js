import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import categoryService from "../../service/categoryService.js"
import userService from "../../service/userService.js"
import CategoryType from "./categoryType.js"
import UserType from "./userType.js"

const OrderType = new GraphQLObjectType({
    name: "OrderType",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID), resolve: parent => parent._id },
        status: { type: new GraphQLNonNull(GraphQLString) },
        total_price: { type: GraphQLInt },
        date: { type: new GraphQLNonNull(GraphQLString) },
        category: {
            type: new GraphQLNonNull(CategoryType),
            resolve: async(parent) => {
                const category = await categoryService.getCategoryById(parent.category)

                return category
            }
        },
        user: {
            type: new GraphQLNonNull(UserType),
            resolve: async(parent) => {
                const user = await userService.getUserById(parent.user)

                return user
            }
        }
    })
})

export default OrderType