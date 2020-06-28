import UserSource from '../user-source';
import CategorySource from '../category-source';
import DurationSource from '../duration-source';
import User from '../models/user';

interface DataSourcesInterface {
  category: CategorySource
  duration: DurationSource
  user: UserSource
}

export interface ContextInterface {
  loggedInUser: User | null;
  dataSources: DataSourcesInterface;
}
