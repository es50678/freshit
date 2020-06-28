import { DataSource, DataSourceConfig } from 'apollo-datasource';
import Session from 'neo4j-driver/types/session';

import driver from '../lib/neo4j-driver';
import Category from './models/category';
import CategoryPropertiesInterface from './models/interfaces/category-properties';
import { ContextInterface } from './interfaces/context';

export default class CategorySource extends DataSource {
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

  async findCategoryById({ id }: { id: string }): Promise<Category> {
    const result = await this.session.run('MATCH (category:Category {id: $id}) RETURN category', { id });
    const record = result.records[0];
    const category: CategoryPropertiesInterface = record.get('category').properties;

    return new Category(category);
  }
}
