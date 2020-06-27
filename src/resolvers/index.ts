const resolvers = {
  User: {
    categories(user, args, { dataSources }) {
      return user.getCategories();
    }
  },
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
    async user(parent, { id }, { dataSources }) {
      return await dataSources.user.findUserById({ id });
    }
  }
}

export default resolvers;
