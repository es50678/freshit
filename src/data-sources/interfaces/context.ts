import UserSource from '../user-source';
import CategorySource from '../category-source';
import DurationSource from '../duration-source';

interface DataSourcesInterface {
  category: CategorySource
  duration: DurationSource
  user: UserSource
}

export interface ContextInterface {
  dataSources: DataSourcesInterface;
}
