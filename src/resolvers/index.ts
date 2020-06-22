const resolvers = {
  Query: {
    async category(parent, { id }, { dataSources }) {
      const result = await dataSources.category.findCategoryById({ id });
      const category = result.get('category').properties;

      return {
        id: category.id,
        name: category.name
      }
    }
  }
}

export default resolvers;
