import { DataSource, DataSourceConfig } from 'apollo-datasource';
import {ContextInterface} from './interfaces/context';
import UniqueSessions from './unique-sessions';

export default abstract class BaseSource extends UniqueSessions implements DataSource {
  context: ContextInterface | null = null;

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config: DataSourceConfig<ContextInterface>): void | Promise<void> {
    this.context = config.context;
  }
}
