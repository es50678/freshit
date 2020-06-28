import Category from './models/category';
import CategoryPropertiesInterface from './models/interfaces/category-properties';
import BaseSource from './base-source';

export default class CategorySource extends BaseSource {

  constructor() {
    super();
  }

  async findCategoryById({ id }: { id: string }): Promise<Category> {
    const result = await this.session.run('MATCH (category:Category {id: $id}) RETURN category', { id });
    const record = result.records[0];
    const category: CategoryPropertiesInterface = record.get('category').properties;

    return new Category(category);
  }
}
