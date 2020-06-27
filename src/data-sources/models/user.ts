import Category from './category';
import Base from './base';

export default class User extends Base {
  name: string;
  email: string;
  #categories: [Category?] = [];

  constructor(user) {
    super();

    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }

  async categories(): Promise<[Category?]> {
    const query = 'MATCH (user:User {id: $id})-[:OWNS]-(categories:Category) \n RETURN categories'
    const result = await this.session.run(query, { id: this.id });
    const records = result.records;

    records.forEach((record) => {
      const properties = record.get('categories').properties
      this.#categories.push(new Category(properties));
    });

    return this.#categories;
  }
}
