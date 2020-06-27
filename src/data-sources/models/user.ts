import Category from './category';
import neo4jModel from './neo4j-model';

export default class User extends neo4jModel{
  public name: string;
  public email: string;
  public categories: [Category?] = [];

  constructor(user) {
    super();

    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }

  async getCategories() {
    const query = 'MATCH (user:User {id: $id})-[:OWNS]-(categories:Category) \n RETURN categories'
    const result = await this.session.run(query, { id: this.id });
    const records = result.records;

    records.forEach((record) => {
      const properties = record.get('categories').properties
      this.categories.push(new Category(properties));
    });

    return this.categories;
  }
}
