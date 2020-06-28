const resolvers = {
  User: {
    categories(user, args, context) {
      return user.categories();
    }
  },
  Mutation: {
    async createUser(parent, { name, email, passcode }, { dataSources }) {
      return await dataSources.user.createUser({ name, email, passcode });
    }
  },
  Query: {
    async user(parent, { id }, { dataSources }) {
      return await dataSources.user.findUserById({ id });
    }
  }
}

export default resolvers;
