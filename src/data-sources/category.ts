import { DataSource, DataSourceConfig } from 'apollo-datasource';

import driver from '../lib/neo4j-driver';

export default class Category extends DataSource {
  context: any;
  session: any;

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
  initialize(config: DataSourceConfig<any>): void | Promise<void> {
    this.context = config.context
  }

  async createCategory({ name }) {
    const result = await this.create({ name });
    return result;
  }

  async findCategoryById({ id }) {
    const result = await this.session.run('MATCH (category:Category {id: $id}) RETURN category', { id });

    return result.records[0];
  }

  async create(params) {
    const idBuildCommand = 'randomUUID()';
    params.id = idBuildCommand;
    return await this.session.run('CREATE (category:Category $params) RETURN category', {params});
  }
}
