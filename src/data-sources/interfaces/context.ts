import UserSource from '../user-source';
import CategorySource from '../category-source';

interface DataSourcesInterface {
  category: CategorySource
  user: UserSource
}

export interface ContextInterface {
  dataSources: DataSourcesInterface;
}
