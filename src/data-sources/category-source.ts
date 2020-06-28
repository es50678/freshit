import Category from './models/category';
import CategoryPropertiesInterface from './models/interfaces/category-properties';
import BaseSource from './base-source';
import Result from 'neo4j-driver/types/result';
import {v4 as uuidv4} from 'uuid';
import {UserCreationOptions} from './user-source';
import UserPropertiesInterface from './models/interfaces/user-properties';
import User from './models/user';

export default class CategorySource extends BaseSource {

  constructor() {
    super();
  }

  async createCategory({ name }: { name: string }): Promise<Category> {
    const user = this.context?.loggedInUser;
    if (!user) {
      throw "NOT LOGGED IN";
    }

  }

  async findCategoryById({ id }: { id: string }): Promise<Category> {
    const result = await this.session.run('MATCH (category:Category {id: $id}) RETURN category', { id });
    const record = result.records[0];
    const category: CategoryPropertiesInterface = record.get('category').properties;

    return new Category(category);
  }
}
