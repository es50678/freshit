import { ApolloServer } from 'apollo-server';

import typeDefs from './scheme';
import resolvers from './resolvers';
import Category from './data-sources/category';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources() {
    return { category: new Category() }
  }
});

server.listen().then((settings) => {
  console.log(`Server  Ready AT: ${settings.url}`);
});
