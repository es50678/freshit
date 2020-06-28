import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { v4 as uuidv4 } from 'uuid';
import Session from 'neo4j-driver/types/session';

import driver from '../lib/neo4j-driver';
import User from './models/user';
import UserPropertiesInterface from './models/interfaces/user-properties';
import Result from 'neo4j-driver/types/result';

interface DataSourcesInterface {
  user: UserSource
}

export interface ContextInterface {
  dataSources: DataSourcesInterface;
}

export interface UserCreationOptions {
  id?: string,
  name: string,
  email: string,
  passcode: string
}

export default class UserSource extends DataSource {
  context: ContextInterface | undefined;
  session: Session;

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
  initialize(config: DataSourceConfig<ContextInterface>): void | Promise<void> {
    this.context = config.context
  }

  async createUser({ name, email, passcode }: UserCreationOptions): Promise<User> {
    const result = await this.create({ name, email, passcode });
    const record = result.records[0];

    const user: UserPropertiesInterface = record.get('user').properties;
    return new User(user);
  }

  async findUserByEmail({ email }: { email: string }): Promise<User> {
    const result = await this.session.run('MATCH (user:User {email: $email}) RETURN user', { email });
    const record = result.records[0];
    const user: UserPropertiesInterface = record.get('user').properties;

    return new User(user);
  }

  async findUserById({ id }: { id: string }): Promise<User> {
    const result = await this.session.run('MATCH (user:User {id: $id}) RETURN user', { id });
    const record = result.records[0];
    const user: UserPropertiesInterface = record.get('user').properties;

    return new User(user);
  }

  async create(params: UserCreationOptions): Promise<Result> {
    params.id = uuidv4();

    return this.session.run('CREATE (user:User $params) RETURN user', {params});
  }
}
