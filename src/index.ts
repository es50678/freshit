import { ApolloServer } from 'apollo-server';

import typeDefs from './scheme';
import resolvers from './resolvers';

const server = new ApolloServer({
  resolvers,
  typeDefs
});

server.listen().then((settings) => {
  console.log(`Server  Ready AT: ${settings.url}`);
});
