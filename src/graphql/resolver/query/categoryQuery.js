const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
const CategoryType = require("../../type/categoryType");
const categoryService = require("../../service/categoryService");

const categoryQuery = {
    category: {
        type: CategoryType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async(_, { id }) => {
            try {
                const category = await categoryService.getCategoryById(id)
    
                return category
            } catch(error){
                throw error
            }
        }
    },
    categories: {
        type: new GraphQLList(CategoryType),
        resolve: async() => {
            try {
                const categories = await categoryService.getCategories()
    
                return categories
            } catch(error){
                throw error
            }
        }
    }
}

module.exports = categoryQuery