import {Session} from 'neo4j-driver';
import driver from '../lib/neo4j-driver';

export default abstract class UniqueSessions {
  protected get session(): Session {
    return driver.session();
  }
}
