import Base from './base';
import DurationPropertiesInterface from './interfaces/duration-properties';
import User from './user';
import UserPropertiesInterface from './interfaces/user-properties';
import Category from './category';
import CategoryPropertiesInterface from './interfaces/category-properties';
import {DateTime, Duration as DurationType} from 'neo4j-driver';

export default class Duration extends Base implements DurationPropertiesInterface{
  end: DateTime;
  length: DurationType;
  start: DateTime;
  #user: User | null = null;
  #category: Category | null = null;

  constructor(durationProperties: DurationPropertiesInterface) {
    super(durationProperties);

    this.end = durationProperties.end;
    this.length = durationProperties.length;
    this.start = durationProperties.start;
  }

  async category(): Promise<Category> {
    const query = 'MATCH (duration:Duration {id: $id})-[:CONTAINS]-(category:Category) \n RETURN category';
    const result = await this.session.run(query, { id: this.id });
    const record = result.records[0];

    const properties: CategoryPropertiesInterface = record.get('category').properties;

    this.#category = new Category(properties);

    return this.#category;
  }

  async user(): Promise<User> {
    const query = 'MATCH (duration:Duration {id: $id})-[:RECORDS]-(user:User) \n RETURN user';
    const result = await this.session.run(query, { id: this.id });
    const record = result.records[0];

    const properties: UserPropertiesInterface = record.get('user').properties;

    this.#user = new User(properties);

    return this.#user;
  }
}
