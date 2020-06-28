import Base from './base';
import CategoryPropertiesInterface from './interfaces/category-properties';
import Duration from './duration';
import DurationPropertiesInterface from './interfaces/duration-properties';
import User from './user';
import UserPropertiesInterface from './interfaces/user-properties';

export default class Category extends Base implements CategoryPropertiesInterface{
  name: string;
  #durations: [Duration?] = [];
  #user: User | null = null;

  constructor(categoryProperties: CategoryPropertiesInterface) {
    super(categoryProperties);

    this.name = categoryProperties.name;
  }

  async durations(): Promise<[Duration?]> {
    const query = 'MATCH (category:Category {id: $id})-[:CONTAINS]-(durations:Duration) \n RETURN durations';
    const result = await this.session.run(query, { id: this.id });
    const records = result.records;

    records.forEach((record) => {
      const properties: DurationPropertiesInterface = record.get('durations').properties;
      this.#durations.push(new Duration(properties));
    });

    return this.#durations;
  }

  async user(): Promise<User> {
    const query = 'MATCH (category:Category {id: $id})-[:OWNS]-(user:User) \n RETURN user';
    const result = await this.session.run(query, { id: this.id });
    const record = result.records[0];

    const properties: UserPropertiesInterface = record.get('user').properties;

    this.#user = new User(properties);

    return this.#user;
  }
}
