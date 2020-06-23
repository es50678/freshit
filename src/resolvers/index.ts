const resolvers = {
  Mutation: {
    async createUser(parent, { name, email, passcode }, { dataSources }) {
      const result = await dataSources.user.createUser({ name, email, passcode });
      const user = result.get('user').properties;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        categories: [],
        durations: []
      }
    }
  },
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
