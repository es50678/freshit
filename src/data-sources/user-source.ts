import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { v4 as uuidv4 } from 'uuid';

import driver from '../lib/neo4j-driver';
import User from './models/user';

export default class UserSource extends DataSource {
  context: any;
  session: any;

  constructor() {
    super();
    this.session = driver.session();
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config: DataSourceConfig<any>): void | Promise<void> {
    this.context = config.context
  }

  async createUser({ name, email, passcode }) {
    const result = await this.create({ name, email, passcode });
    return result.records[0];
  }

  async findUserById({ id }) {
    const result = await this.session.run('MATCH (user:User {id: $id}) RETURN user', { id });
    const record = result.records[0];
    const user = record.get('user').properties;

    return new User(user);
  }

  async create(params) {
    params.id = uuidv4();

    return await this.session.run('CREATE (user:User $params) RETURN user', {params});
  }
}
