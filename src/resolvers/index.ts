import moment from 'moment';
import { GraphQLScalarType, Kind } from 'graphql';

import Category from '../data-sources/models/category';
import User from '../data-sources/models/user';
import { UserCreationOptions as UserArgs} from '../data-sources/user-source';
import { ContextInterface as Context } from '../data-sources/interfaces/context';
import Duration from '../data-sources/models/duration';

const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Custom DateTime scalar type - A unix timestamp in seconds',
  serialize(value) { // gets invoked when serializing the result to send it back to a client
    return moment(value).unix();
  },
  parseValue(value) { // gets invoked to parse client input that was passed through variables
    return new Date(value);
  },
  parseLiteral(ast) { // gets invoked to parse client input that was passed inline in the query
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});

const timeDurationScalar = new GraphQLScalarType({
  name: 'TimeDuration',
  description: 'Custom TimeDuration scalar type - an ISO 8601 formatted duration string',
  serialize(value) { // gets invoked when serializing the result to send it back to a client
    return moment.duration(value).toISOString();
  },
  parseValue(value) { // gets invoked to parse client input that was passed through variables
    return moment.duration(value);
  },
  parseLiteral(ast) { // gets invoked to parse client input that was passed inline in the query
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});

const resolvers = {
  DateTime: dateTimeScalar,
  TimeDuration: timeDurationScalar,
  Category: {
    durations(category: Category): Promise<[Duration?]> {
      return category.durations();
    },
    user(category: Category): Promise<User> {
      return category.user();
    }
  },
  Duration: {
    category(duration: Duration): Promise<Category> {
      return duration.category();
    },
    user(duration: Duration): Promise<User> {
      return duration.user();
    }
  },
  User: {
    categories(user: User): Promise<[Category?]> {
      return user.categories();
    },
    durations(user: User): Promise<[Duration?]> {
      return user.durations();
    }
  },
  Mutation: {
    createUser(_: null, { name, email, passcode }: UserArgs, { dataSources }: Context): Promise<User> {
      return dataSources.user.createUser({ name, email, passcode });
    },
    async login(_: null, { email, passcode }: UserArgs, { dataSources }: Context): Promise<string> {
      const user = await dataSources.user.findUserByEmail({ email });

      if (user.passcode == passcode) {
        return Buffer.from(email).toString('base64');
      }

      return "UNAUTHORIZED";
    }
  },
  Query: {
    category(_: null, { id }: { id: string }, { dataSources }: Context): Promise<Category> {
      return dataSources.category.findCategoryById({ id });
    },
    duration(_: null, { id }: { id: string }, { dataSources }: Context): Promise<Duration> {
      return dataSources.duration.findDurationById({ id });
    },
    user(_: null, { id }: { id: string }, { dataSources }: Context): Promise<User> {
      return dataSources.user.findUserById({ id });
    },
    userByEmail(_: null, { email }: { email: string },  { dataSources }: Context): Promise<User> {
      return dataSources.user.findUserByEmail({ email });
    }
  }
}

export default resolvers;
