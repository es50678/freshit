import Category from './category';
import Base from './base';
import UserPropertiesInterface from './interfaces/user-properties';
import CategoryPropertiesInterface from './interfaces/category-properties';

export default class User extends Base implements UserPropertiesInterface {
  name: string;
  email: string;
  #categories: [Category?] = [];

  constructor(userProperties: UserPropertiesInterface) {
    super();

    this.id = userProperties.id;
    this.name = userProperties.name;
    this.email = userProperties.email;
  }

  async categories(): Promise<[Category?]> {
    const query = 'MATCH (user:User {id: $id})-[:OWNS]-(categories:Category) \n RETURN categories';
    const result = await this.session.run(query, { id: this.id });
    const records = result.records;

    records.forEach((record) => {
      const properties: CategoryPropertiesInterface = record.get('categories').properties;
      this.#categories.push(new Category(properties));
    });

    return this.#categories;
  }
}
