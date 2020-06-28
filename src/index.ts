import { ApolloServer } from 'apollo-server';

import typeDefs from './scheme';
import resolvers from './resolvers';
import UserSource from './data-sources/user-source';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  async context(params) {
    const authToken = (params.req.headers && params.req.headers.authorization) || '';
    const email = Buffer.from(authToken, 'base64').toString();

    const user = await new UserSource().findUserByEmail({ email }).catch(() => {
      return null;
    });

    return { loggedInUser: user }
  },
  dataSources() {
    return {
      user: new UserSource()
    }
  }
});

server.listen().then((settings) => {
  console.log(`Server  Ready AT: ${settings.url}`);
});
