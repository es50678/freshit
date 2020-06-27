import { ApolloServer } from 'apollo-server';

import typeDefs from './scheme';
import resolvers from './resolvers';
import UserSource from './data-sources/user-source';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources() {
    return {
      user: new UserSource()
    }
  }
});

server.listen().then((settings) => {
  console.log(`Server  Ready AT: ${settings.url}`);
});
