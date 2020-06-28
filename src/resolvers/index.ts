import Category from '../data-sources/models/category';
import User from '../data-sources/models/user';
import { ContextInterface, UserCreationOptions as UserArgs} from '../data-sources/user-source';
import Duration from '../data-sources/models/duration';

const resolvers = {
  User: {
    categories(user: User): Promise<[Category?]> {
      return user.categories();
    },
    async durations(user: User): Promise<[Duration?]> {
      const duartions = await user.durations();
      return duartions;
    }
  },
  Mutation: {
    createUser(_: undefined, { name, email, passcode }: UserArgs, { dataSources }: ContextInterface): Promise<User> {
      return dataSources.user.createUser({ name, email, passcode });
    }
  },
  Query: {
    user(_: undefined, { id }: { id: string }, { dataSources }: ContextInterface): Promise<User> {
      return dataSources.user.findUserById({ id });
    }
  }
}

export default resolvers;
