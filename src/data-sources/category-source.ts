import Category from './models/category';
import CategoryPropertiesInterface from './models/interfaces/category-properties';
import BaseSource from './base-source';
import {v4 as uuidv4} from 'uuid';

export interface CategoryCreationOptions {
  name: string
}

export default class CategorySource extends BaseSource {

  constructor() {
    super();
  }

  async createCategory({ name }: CategoryCreationOptions): Promise<Category> {
    const user = this.context?.loggedInUser;
    if (!user) {
      throw "NOT LOGGED IN";
    }

    const query = `
      MATCH (user:User {id: $userId})
      CREATE (user)-[:OWNS]->(category:Category {id: $id, name: $name}) 
      RETURN category
    `;
    const result = await this.session.run(query, { userId: user.id, id: uuidv4(), name});
    const record = result.records[0];
    const category: CategoryPropertiesInterface = record.get('category').properties;

    return new Category(category);
  }

  async findCategoryById({ id }: { id: string }): Promise<Category> {
    const result = await this.session.run('MATCH (category:Category {id: $id}) RETURN category', { id });
    const record = result.records[0];
    const category: CategoryPropertiesInterface = record.get('category').properties;

    return new Category(category);
  }
}
