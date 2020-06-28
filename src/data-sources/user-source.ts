import { v4 as uuidv4 } from 'uuid';

import User from './models/user';
import UserPropertiesInterface from './models/interfaces/user-properties';
import Result from 'neo4j-driver/types/result';
import BaseSource from './base-source';

export interface UserCreationOptions {
  id?: string,
  name: string,
  email: string,
  passcode: string
}

export default class UserSource extends BaseSource {

  constructor() {
    super();
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
